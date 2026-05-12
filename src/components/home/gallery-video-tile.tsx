"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type GalleryVideoTileProps = {
  src: string;
  alt: string;
  className?: string;
};

export function GalleryVideoTile({
  src,
  alt,
  className,
}: GalleryVideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const syncMuted = useCallback((next: boolean) => {
    setMuted(next);
    const el = videoRef.current;
    if (el) {
      el.muted = next;
    }
  }, []);

  const toggleSound = useCallback(() => {
    syncMuted(!muted);
  }, [muted, syncMuted]);

  return (
    <div
      className={cn("group/tile relative w-full overflow-hidden", className)}
      onMouseLeave={() => {
        syncMuted(true);
      }}
    >
      <video
        ref={videoRef}
        className="block h-auto w-full max-w-full align-middle"
        src={src}
        aria-label={alt}
        title={alt}
        muted={muted}
        playsInline
        autoPlay
        loop
        preload="metadata"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover/tile:opacity-100 max-sm:opacity-90"
        aria-hidden
      />

      <div
        className={cn(
          "absolute right-2 bottom-2 z-10 flex transition-all duration-200 sm:right-3 sm:bottom-3",
          "max-sm:pointer-events-auto max-sm:translate-y-0 max-sm:opacity-100",
          "pointer-events-none translate-y-1 opacity-0 sm:group-hover/tile:pointer-events-auto sm:group-hover/tile:translate-y-0 sm:group-hover/tile:opacity-100",
        )}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          className="flex size-10 items-center justify-center rounded-full border border-white/40 bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:size-11"
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
        >
          {muted ? (
            <VolumeX className="size-5 sm:size-[1.35rem]" strokeWidth={2} />
          ) : (
            <Volume2 className="size-5 sm:size-[1.35rem]" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
