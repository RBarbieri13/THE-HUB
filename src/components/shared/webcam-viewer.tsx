/* eslint-disable @next/next/no-img-element */
import { Camera, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WebcamViewerProps {
  src?: string;
  mode?: "iframe" | "image-refresh";
}

export function WebcamViewer({ src, mode = "iframe" }: WebcamViewerProps) {
  if (src && mode === "iframe") {
    return (
      <iframe
        src={src}
        className="w-full aspect-video rounded-[3px]"
        title="Live closet webcam feed"
        allowFullScreen
      />
    );
  }

  if (src && mode === "image-refresh") {
    return (
      <img
        src={src}
        alt="Live closet webcam snapshot"
        className="w-full aspect-video object-cover rounded-[3px]"
      />
    );
  }

  return (
    <div className="aspect-video bg-gradient-to-br from-dark to-dark/90 flex flex-col items-center justify-center text-center p-8 rounded-[3px]">
      <div className="bg-white/10 rounded-full p-5 mb-4 animate-pulse">
        <Camera className="h-12 w-12 text-white/40" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">Camera Currently Offline</h3>
      <div className="flex items-center gap-2 text-white/60 text-sm max-w-xs mb-2 justify-center">
        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p>Available Mon–Fri, 9:00 AM – 4:00 PM CT</p>
      </div>
      <p className="text-white/40 text-xs mb-6">Check back during business hours for a live view.</p>
      <Link href="/inventory">
        <Button variant="primary" size="sm">
          View Inventory Instead
        </Button>
      </Link>
    </div>
  );
}
