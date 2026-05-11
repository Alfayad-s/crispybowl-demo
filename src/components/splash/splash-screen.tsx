"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SPLASH_LOGO = "/logo.png";

const SPLASH_MS = 2000;

/**
 * Full-screen splash on first paint; fades away so the page underneath is usable.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const delay = reduceMotion ? Math.min(SPLASH_MS, 400) : SPLASH_MS;
    const id = window.setTimeout(() => setVisible(false), delay);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex min-h-dvh w-full flex-col items-center justify-center bg-[#0c3d32] px-6 transition-opacity duration-500 ease-out motion-reduce:duration-0",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="relative aspect-square w-[min(18rem,72vmin)] max-w-[min(90vw,22rem)] shrink-0">
        <Image
          src={SPLASH_LOGO}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 72vw, 22rem"
          priority
        />
      </div>
    </div>
  );
}
