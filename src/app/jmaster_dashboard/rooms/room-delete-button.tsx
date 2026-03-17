"use client";

import { deleteRoom } from "@/app/actions/rooms";
import { useState } from "react";
import { toast } from "sonner";

export function RoomDeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (confirm("Are you sure you want to permanently delete this room from the collection?")) {
      setIsDeleting(true);
      const result = await deleteRoom(id);
      
      if (result?.error) {
        toast.error(result.error);
        setIsDeleting(false);
      } else {
        toast.success("Room deleted successfully.");
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-xs font-semibold uppercase tracking-wider ${isDeleting ? 'text-gray-400' : 'text-red-600 hover:text-red-800'}`}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
