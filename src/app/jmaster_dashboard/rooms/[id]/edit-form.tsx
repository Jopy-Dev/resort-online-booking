"use client";

import { useState } from "react";
import { updateRoom } from "@/app/actions/rooms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database } from "@/types/supabase";

type Room = Database['public']['Tables']['rooms']['Row'];

export function EditRoomForm({ room }: { room: Room }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await updateRoom(room.id, formData);
    
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    } // redirect happens in action on success
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-700">Suite Name</Label>
        <Input id="name" name="name" defaultValue={room.name} required className="rounded-none border-gray-200 focus-visible:ring-primary h-12" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs uppercase tracking-widest text-gray-700">Description</Label>
        <Textarea id="description" name="description" defaultValue={room.description || ''} required className="rounded-none border-gray-200 focus-visible:ring-primary min-h-[120px]" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-xs uppercase tracking-widest text-gray-700">Price per Night (CHF)</Label>
          <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue={room.price} required className="rounded-none border-gray-200 focus-visible:ring-primary h-12" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="capacity" className="text-xs uppercase tracking-widest text-gray-700">Max Guests</Label>
          <Input id="capacity" name="capacity" type="number" min="1" defaultValue={room.capacity} required className="rounded-none border-gray-200 focus-visible:ring-primary h-12" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
              <Label htmlFor="status" className="text-xs uppercase tracking-widest text-gray-700">Listing Status</Label>
              <Select name="status" defaultValue={room.status || 'Draft'}>
                <SelectTrigger className="rounded-none border-gray-200 h-12">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available Publicly</SelectItem>
                  <SelectItem value="Draft">Draft / Hidden</SelectItem>
                  <SelectItem value="Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="text-xs uppercase tracking-widest text-gray-700">Suite Images (Max 3)</Label>
              <Input id="images" name="images" type="file" accept="image/*" multiple className="rounded-none border-gray-200 focus-visible:ring-primary h-12 px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
              <p className="text-[10px] text-gray-400 mt-1">Uploading new images completely replaces the existing gallery.</p>
              
              <input type="hidden" name="existing_images" value={JSON.stringify(room.image_urls || [])} />
              
              {(room.image_urls && room.image_urls.length > 0) && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {room.image_urls.map((url: string, i: number) => (
                    <img key={i} src={url} alt={`Room Image ${i+1}`} className="h-16 w-24 object-cover border border-gray-200" />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-14 tracking-widest uppercase text-sm font-semibold"
        >
          {isLoading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
