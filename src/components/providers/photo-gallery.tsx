"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getAvatarColor, getInitials, cn } from "@/lib/utils";

interface PhotoGalleryProps {
  companyName: string;
  photoUrls: string[];
  closeLabel: string;
}

export function PhotoGallery({
  companyName,
  photoUrls,
  closeLabel,
}: PhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const initials = getInitials(companyName);
  const avatar = getAvatarColor(companyName);
  const count = photoUrls.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative mx-4 mb-3.5 flex h-[180px] cursor-pointer items-center justify-center rounded-2xl md:mx-0"
        aria-label={companyName}
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-2xl text-5xl font-medium",
            avatar.bg,
            avatar.text,
          )}
        >
          {initials}
        </div>
        {count > 0 && (
          <span className="absolute bottom-2.5 right-2.5 rounded-md bg-white/90 px-2 py-0.5 text-[11px] text-text-accent">
            1/{count}
          </span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-w-sm flex-col items-center gap-4 p-6">
          <DialogTitle className="sr-only">{companyName}</DialogTitle>
          <div
            className={cn(
              "flex h-48 w-full items-center justify-center rounded-2xl text-6xl font-medium",
              avatar.bg,
              avatar.text,
            )}
          >
            {initials}
          </div>
          <p className="text-sm text-text-secondary">{companyName}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
