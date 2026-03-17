import { createClient } from "@/lib/supabase";
import { format } from "date-fns";

export default async function BookingsPage() {
  const supabase = await createClient();
  
  // Fetch all bookings with room details
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      id, 
      guest_name, 
      email,
      phone,
      check_in_date, 
      check_out_date, 
      status, 
      total_amount,
      reservation_id,
      created_at,
      rooms ( name )
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl text-gray-900 mb-2">Booking Management</h1>
          <p className="text-gray-500 text-sm tracking-wide">View and manage all guest reservations.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Res ID / Date</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest Info</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stay Dates</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{booking.reservation_id}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Booked: {format(new Date(booking.created_at), "MMM d, yyyy")}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900">{booking.guest_name}</div>
                      <div className="text-xs text-gray-500">{booking.email}</div>
                      {booking.phone && <div className="text-xs text-gray-500">{booking.phone}</div>}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {(booking.rooms as any)?.name || 'Unknown Room'}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {booking.check_in_date ? format(new Date(booking.check_in_date), "MMM d") : ''} - 
                      {booking.check_out_date ? format(new Date(booking.check_out_date), "MMM d, yyyy") : ''}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-900 font-medium text-right">
                      CHF {booking.total_amount?.toLocaleString() || '0'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 text-sm">
                    No bookings found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
