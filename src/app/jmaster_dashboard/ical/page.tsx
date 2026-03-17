import { createClient } from "@/lib/supabase";
import { ImportUrlForm } from "./import-url-form";

export default async function ICalSettingsPage() {
  const supabase = await createClient();
  const { data: rooms } = await supabase.from("rooms").select("id, name, ical_import_url").order("name");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl text-gray-900 mb-2">iCal Synchronization</h1>
          <p className="text-gray-500 text-sm tracking-wide">Manage external calendar feeds (Airbnb, Booking.com) to prevent double-bookings.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Room Integrations</h2>
          <p className="text-xs text-gray-500 mt-1">Export your availability to external platforms, or import blocking dates from them.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Suite</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Export Feed (Read-Only)</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/4">Import External Calendar (.ics)</th>
            </tr>
          </thead>
          <tbody>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => {
                const exportUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/rooms/${room.id}/calendar.ics`;
                
                return (
                  <tr key={room.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{room.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          readOnly 
                          value={exportUrl} 
                          className="w-full text-[10px] p-2 bg-gray-100 border border-transparent rounded text-gray-600 focus:outline-none"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <ImportUrlForm roomId={room.id} defaultUrl={room.ical_import_url || ''} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500 text-sm">
                  No rooms available for iCal sync. Add rooms first.
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
