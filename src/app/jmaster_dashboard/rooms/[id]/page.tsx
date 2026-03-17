import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EditRoomForm } from "./edit-form";

export default async function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const roomId = resolvedParams.id;
  const supabase = await createClient();

  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error || !room) {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl text-gray-900 mb-2">Edit Suite</h1>
          <p className="text-gray-500 text-sm tracking-wide">Update details for {room.name}</p>
        </div>
        <Link 
          href="/jmaster_dashboard/rooms" 
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 uppercase tracking-wider transition-colors"
        >
          Cancel & Return
        </Link>
      </div>

      <div className="bg-white p-8 border border-gray-100 shadow-sm">
        <EditRoomForm room={room} />
      </div>
    </div>
  );
}
