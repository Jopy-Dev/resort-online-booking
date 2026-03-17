import { createClient } from "./supabase";

/**
 * Checks if a specific room is available for the given date range.
 * Required per PRD: Incorporates the 15-Minute Booking Lock (Pending + expires_at handling)
 * Evaluates both internal 'bookings' and 'external_bookings' (iCal sync points).
 * 
 * @param roomId UUID string of the room to check
 * @param checkIn YYYY-MM-DD string
 * @param checkOut YYYY-MM-DD string
 * @returns boolean true if the room is fully available, false if overlapping locks or bookings exist
 */
export async function checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<boolean> {
  const supabase = await createClient();

  // 1. Check Internal Bookings Overlaps
  // Overlap Math: existing_start < request_end AND existing_end > request_start
  const { data: overlappingBookings, error: bookingError } = await supabase
    .from("bookings")
    .select("id, booking_status, expires_at")
    .eq("room_id", roomId)
    .neq("booking_status", "Cancelled")
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (bookingError) {
    console.error("Internal Availability Check Error:", bookingError);
    return false; // Fail-secure: Block booking if database query fails
  }

  // The 15-Minute Lock Evaluation
  const now = new Date();
  
  const activeConflicts = overlappingBookings.filter((b) => {
    if (b.booking_status === "Confirmed") return true;
    
    // If Pending, check if the 15-minute lock has expired inherently bypassing background timeouts
    if (b.booking_status === "Pending" && b.expires_at) {
      const expiresAt = new Date(b.expires_at);
      return expiresAt > now; // Still actively locked
    }
    
    return false; // It's an expired pending transaction, thus abandoned and available
  });

  if (activeConflicts.length > 0) {
    return false; // Blocked by an internal booking or active checkout session
  }

  // 2. Check External Bookings (iCal Synced Overrides)
  const { data: externalBookings, error: extError } = await supabase
    .from("external_bookings")
    .select("id")
    .eq("room_id", roomId)
    .lt("start_date", checkOut)
    .gt("end_date", checkIn);

  if (extError) {
    console.error("External Availability Check Error:", extError);
    return false; // Fail-secure
  }

  if (externalBookings && externalBookings.length > 0) {
    return false; // Blocked by an external schedule (e.g., Airbnb, Booking.com via iCal)
  }

  // 3. Made it through the gauntlet, room is available!
  return true;
}
