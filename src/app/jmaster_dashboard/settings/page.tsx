"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client"; // Need client-side supabase for this

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdatePassword(formData: FormData) {
    setIsLoading(true);
    const newPassword = formData.get("password") as string;
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      (document.getElementById("passwordForm") as HTMLFormElement).reset();
    }
    setIsLoading(false);
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-gray-500 text-sm tracking-wide">Manage your security credentials.</p>
      </div>

      <div className="bg-white p-6 border border-gray-100 shadow-sm">
        <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-6 font-semibold">Change Password</h3>
        
        <form id="passwordForm" action={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-700">New Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="rounded-none border-gray-200 focus-visible:ring-primary h-12 max-w-md"
            />
            <p className="text-xs text-gray-400 mt-2">Make it strong and secure.</p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary text-white hover:bg-primary/90 rounded-none h-10 px-8 tracking-widest uppercase text-xs font-semibold"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
