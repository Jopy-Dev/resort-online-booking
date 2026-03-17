"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateRoomIcalUrl(roomId: string, url: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("rooms")
    .update({ ical_import_url: url })
    .eq("id", roomId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/jmaster_dashboard/ical");
}
