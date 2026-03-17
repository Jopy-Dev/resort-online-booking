"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRoom(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const capacity = parseInt(formData.get("capacity") as string, 10);
  const status = formData.get("status") as string;

  const imageFiles = formData.getAll("images") as File[];
  const image_urls: string[] = [];

  for (const file of imageFiles) {
    if (file.size > 0) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from("rooms")
        .upload(fileName, file);

      if (!uploadError) {
        const { data } = supabase.storage.from("rooms").getPublicUrl(fileName);
        image_urls.push(data.publicUrl);
      }
    }
  }

  const { error } = await supabase.from("rooms").insert({
    name,
    description,
    price,
    capacity,
    status,
    image_urls,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/jmaster_dashboard/rooms");
  revalidatePath("/");
  revalidatePath("/rooms");
  redirect("/jmaster_dashboard/rooms");
}

export async function updateRoom(roomId: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const capacity = parseInt(formData.get("capacity") as string, 10);
  const status = formData.get("status") as string;

  const existingImagesJson = formData.get("existing_images") as string;
  let image_urls: string[] = existingImagesJson ? JSON.parse(existingImagesJson) : [];

  const imageFiles = formData.getAll("images") as File[];
  const newUploadedUrls: string[] = [];

  for (const file of imageFiles) {
    if (file.size > 0) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from("rooms")
        .upload(fileName, file);

      if (!uploadError) {
        const { data } = supabase.storage.from("rooms").getPublicUrl(fileName);
        newUploadedUrls.push(data.publicUrl);
      }
    }
  }

  // If new images were explicitly uploaded, replace the old ones entirely.
  // Otherwise, keep the existing images.
  if (newUploadedUrls.length > 0) {
    image_urls = newUploadedUrls;
  }

  const { error } = await supabase.from("rooms").update({
    name,
    description,
    price,
    capacity,
    status,
    image_urls,
  }).eq("id", roomId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/jmaster_dashboard/rooms");
  revalidatePath("/");
  revalidatePath("/rooms");
  redirect("/jmaster_dashboard/rooms");
}

export async function deleteRoom(roomId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/jmaster_dashboard/rooms");
  revalidatePath("/");
  revalidatePath("/rooms");
}
