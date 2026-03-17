"use client";

import { useState } from "react";
import { updateRoomIcalUrl } from "@/app/actions/ical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check, RefreshCw } from "lucide-react";

export function ImportUrlForm({ roomId, defaultUrl }: { roomId: string, defaultUrl: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(defaultUrl);

  async function handleSave() {
    setIsLoading(true);
    const result = await updateRoomIcalUrl(roomId, url);
    
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("iCal Import URL saved successfully.");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex space-x-2">
      <Input 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.airbnb.com/calendar/ical/..."
        className="rounded-none border-gray-200 focus-visible:ring-primary h-10 w-full text-xs"
      />
      <Button 
        onClick={handleSave} 
        disabled={isLoading || url === defaultUrl}
        variant="outline"
        className="rounded-none h-10 px-4 flex-shrink-0"
      >
        {isLoading ? <RefreshCw className="h-4 w-4 animate-spin text-gray-500" /> : <Check className="h-4 w-4 text-green-600" />}
      </Button>
    </div>
  );
}
