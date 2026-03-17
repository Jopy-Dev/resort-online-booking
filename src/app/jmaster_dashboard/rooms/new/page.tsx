"use client";

import { useState } from "react";
import { createRoom } from "@/app/actions/rooms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewRoomPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await createRoom(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    } // redirect happens in action on success
  }

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl text-gray-900 mb-2">Add New Suite</h1>
          <p className="text-gray-500 text-sm tracking-wide">Introduce a new luxury accommodation to the collection.</p>
        </div>
        <Link 
          href="/jmaster_dashboard/rooms" 
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 uppercase tracking-wider transition-colors"
        >
          Cancel & Return
        </Link>
      </div>

      <div className="bg-white p-8 border border-gray-100 shadow-sm">
        <form action={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-700">Suite Name</Label>
            <Input id="name" name="name" required className="rounded-none border-gray-200 focus-visible:ring-primary h-12" placeholder="e.g. Signature Presidential Suite" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs uppercase tracking-widest text-gray-700">Description</Label>
            <Textarea id="description" name="description" required className="rounded-none border-gray-200 focus-visible:ring-primary min-h-[120px]" placeholder="Detailed description of the suite's luxury amenities..." />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs uppercase tracking-widest text-gray-700">Price per Night (CHF)</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" required className="rounded-none border-gray-200 focus-visible:ring-primary h-12" placeholder="1500" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-xs uppercase tracking-widest text-gray-700">Max Guests</Label>
              <Input id="capacity" name="capacity" type="number" min="1" required className="rounded-none border-gray-200 focus-visible:ring-primary h-12" placeholder="2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs uppercase tracking-widest text-gray-700">Listing Status</Label>
              <Select name="status" defaultValue="Available">
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
              <Label htmlFor="images" className="text-xs uppercase tracking-widest text-gray-700">Upload Suite Images (Max 3)</Label>
              <Input id="images" name="images" type="file" accept="image/*" multiple className="rounded-none border-gray-200 focus-visible:ring-primary h-12 px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
              <p className="text-[10px] text-gray-400 mt-1">Select up to 3 high-resolution images.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-14 tracking-widest uppercase text-sm font-semibold"
            >
              {isLoading ? "Saving Suite..." : "Save New Suite"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
