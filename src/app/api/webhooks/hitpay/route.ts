import { NextResponse } from "next/server";
import { verifyHitPaySignature } from "@/lib/hitpay";
import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = await headers();
    
    // HitPay commonly uses either of these keys depending on API version
    const signature = headersList.get("x-plugin-signature") || headersList.get("hitpay-signature");
    
    if (!signature || !verifyHitPaySignature(rawBody, signature)) {
      console.warn("Unauthorized webhook attempt blocked.");
      return NextResponse.json({ error: "Unauthorized: Invalid Signature" }, { status: 401 });
    }
    
    // Parse form data from x-www-form-urlencoded
    const params = new URLSearchParams(rawBody);
    const paymentId = params.get("payment_id");
    const referenceNumber = params.get("reference_number"); // This is our reservation_id (e.g. RES-2026-0001)
    const status = params.get("status");
    const amount = params.get("amount");
    
    if (!paymentId || !referenceNumber) {
      return NextResponse.json({ error: "Malformed payload: Missing payment data" }, { status: 400 });
    }
    
    const supabase = await createClient();
    
    if (status === "completed") {
      // 1. Get the booking ID accurately based on the exact reservation_id sent to HitPay during checkout
      const { data: booking, error: fetchError } = await supabase
        .from("bookings")
        .select("id, booking_status")
        .eq("reservation_id", referenceNumber)
        .single();
        
      if (fetchError || !booking) {
        return NextResponse.json({ error: "Booking not found in database" }, { status: 404 });
      }
      
      // Idempotency check: Guard against duplicate webhooks for the exact same transaction
      if (booking.booking_status === "Confirmed") {
        return NextResponse.json({ message: "Transaction already processed successfully" }, { status: 200 });
      }
      
      // 2. Insert Payment Record (Audit Trail)
      await supabase.from("payments").insert({
        booking_id: booking.id,
        hitpay_payment_id: paymentId,
        amount: parseFloat(amount || "0"),
        webhook_verified: true,
        status: "Completed"
      });
      
      // 3. Update Booking Status (Locking in the reservation permanently)
      await supabase.from("bookings").update({
        booking_status: "Confirmed",
        payment_status: "Paid",
        expires_at: null // Clear the 15-minute lock expiration timestamp since it is paid
      }).eq("id", booking.id);
      
      // FUTURE TODO: Trigger confirmation email dispatch via Resend/NodeMailer here
    }
    
    return NextResponse.json({ message: "Webhook processed successfully" });
    
  } catch (error) {
    console.error("Fatal Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
