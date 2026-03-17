import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { RoomDeleteButton } from "./room-delete-button";

export default async function RoomsPage() {
  const supabase = await createClient();
  const { data: rooms } = await supabase.from("rooms").select("*").order("name");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl text-gray-900 mb-2">Room Management</h1>
          <p className="text-gray-500 text-sm tracking-wide">Manage the collection of luxury suites and pricing.</p>
        </div>
        <Link 
          href="/jmaster_dashboard/rooms/new" 
          className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors"
        >
          + Add New Room
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room Details</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      {room.image_urls && room.image_urls.length > 0 ? (
                        <img src={room.image_urls[0]} alt={room.name} className="w-16 h-12 object-cover rounded shadow-sm" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center border border-dashed border-gray-300 text-[10px] text-gray-400 uppercase">No Img</div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{room.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-xs">{room.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-900 font-medium">CHF {room.price}</td>
                  <td className="p-4 text-sm text-gray-600">{room.capacity} Guests</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded ${
                      room.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {room.status || 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link 
                      href={`/jmaster_dashboard/rooms/${room.id}`}
                      className="text-xs font-semibold text-primary hover:text-primary/80 uppercase tracking-wider"
                    >
                      Edit
                    </Link>
                    <RoomDeleteButton id={room.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 text-sm">
                  No rooms have been added to the collection yet.
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
