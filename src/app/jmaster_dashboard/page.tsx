import { createClient } from "@/lib/supabase";
import { format } from "date-fns";

export default async function DashboardOverview() {
  const supabase = await createClient();
  
  // Fetch some stats (example implementation assuming tables exist)
  // Let's just fetch recent bookings to show the dashboard works
  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('id, guest_name, check_in_date, check_out_date, status, total_amount')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm tracking-wide">Welcome to the central management console.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-light text-gray-900">CHF 0.00</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Active Bookings</h3>
          <p className="text-3xl font-light text-gray-900">
            {recentBookings?.length || 0}
          </p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Pending Inquiries</h3>
          <p className="text-3xl font-light text-gray-900">0</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-heading text-xl text-gray-900">Recent Bookings</h3>
        </div>
        <div className="p-0">
          {recentBookings && recentBookings.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 text-sm text-gray-900">{booking.guest_name || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {booking.check_in_date ? format(new Date(booking.check_in_date), "MMM d") : ''} - 
                      {booking.check_out_date ? format(new Date(booking.check_out_date), "MMM d, yyyy") : ''}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-900 font-medium">CHF {booking.total_amount?.toLocaleString() || '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              No recent bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
