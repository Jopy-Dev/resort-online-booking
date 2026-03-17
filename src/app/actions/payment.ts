'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export async function createPaymentRequest(formData: FormData) {
  const roomId = formData.get('roomId') as string
  const checkIn = formData.get('checkIn') as string
  const checkOut = formData.get('checkOut') as string
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  
  if (!roomId || !checkIn || !checkOut || !fullName || !email) {
    throw new Error('Missing required booking details.')
  }

  // Hardcode base mock values for demonstration routing purposes
  const totalAmount = 1500.00; 

  const supabase = await createClient()

  // 1. Generate unique reservation ID (RES-YYYY-XXXX)
  const date = new Date()
  const year = date.getFullYear()
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  const reservationId = `RES-${year}-${randomNum}`

  // 2. The 15-Minute Booking Lock algorithm
  const expiresAt = new Date(date.getTime() + 15 * 60000).toISOString()

  // 3. Create Pending Booking Lock in Supabase
  const { data: booking, error } = await supabase.from('bookings').insert({
    room_id: roomId,
    guest_name: fullName,
    email: email,
    check_in: checkIn,
    check_out: checkOut,
    total_price: totalAmount,
    reservation_id: reservationId,
    booking_status: 'Pending', // Actively locked state
    payment_status: 'Unpaid',
    expires_at: expiresAt
  }).select('id').single()

  if (error || !booking) {
    console.error('Booking Lock Error:', error);
    throw new Error('Failed to create booking lock.')
  }

  // 4. Call HitPay API to generate Checkout URL
  const hitpayApiKey = process.env.HITPAY_API_KEY
  if (!hitpayApiKey) {
    console.warn("HitPay API Key is not configured. Redirecting to mock success.");
    redirect(`/booking/success?res=${reservationId}`);
  }

  const hitpayRes = await fetch('https://api.sandbox.hit-pay.com/v1/payment-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-BUSINESS-API-KEY': hitpayApiKey,
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      amount: totalAmount,
      currency: 'USD',
      reference_number: reservationId, // Crucial for Webhook Idempotency mapping
      redirect_url: `https://your-domain.com/booking/success?res=${reservationId}`,
      webhook: `https://your-domain.com/api/webhooks/hitpay`,
      name: fullName,
      email: email
    })
  })

  const hitpayData = await hitpayRes.json()

  if (!hitpayRes.ok || !hitpayData.url) {
    // Graceful degrading: Release the lock immediately if payment generation fails
    await supabase.from('bookings').delete().eq('id', booking.id)
    console.error("HitPay API Error:", hitpayData)
    throw new Error('Secure payment initialization failed.')
  }

  // Redirect the user to real HitPay checkout
  redirect(hitpayData.url)
}
