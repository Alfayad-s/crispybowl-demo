"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/chicken-hero.png", alt: "Hand-breaded fried chicken" },
  { src: "/image.png", alt: "Golden fried chicken on a plate" },
  { src: "/plate.png", alt: "Golden fried chicken on a plate" },
] as const;

const ROTATE_MS = 5500;

// ─── reduced-motion hook (unchanged) ────────────────────────────────────────
function subscribeReducedMotion(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnap = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getSrvSnap = () => false;
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getSnap, getSrvSnap);
}

// ─── public export ───────────────────────────────────────────────────────────
export function HeroChickenCarousel() {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative aspect-[3/4] w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]">
        <Image
          src={SLIDES[0].src}
          alt={SLIDES[0].alt}
          fill
          className="object-contain object-center"
          sizes="(max-width:640px) 92vw,(max-width:768px) 90vw,(max-width:1024px) 54vw,48rem"
          priority
        />
      </div>
    );
  }

  return <HeroChickenCarouselAnimated />;
}

// ─── 3-state machine ─────────────────────────────────────────────────────────
//
//  active   → translateX(0)     scale(1)    opacity-100   z-10
//  incoming → translateX(+68%)  scale(0.74) opacity-60    z-5   ← ALWAYS VISIBLE
//  outgoing → translateX(-38%)  scale(0.82) opacity-0     z-0
//
// The CRITICAL insight: the incoming slide is never opacity-0, so every
// transition shows the full arc: small + right → large + center.
// ─────────────────────────────────────────────────────────────────────────────

type SlideState = "active" | "incoming" | "outgoing";

function getState(idx: number, active: number, total: number): SlideState {
  if (idx === active) return "active";
  if (idx === (active + 1) % total) return "incoming";
  return "outgoing";
}

const STATE_CLASSES: Record<SlideState, string> = {
  active: "z-10 translate-x-0 scale-100 opacity-100",
  incoming: "z-5  translate-x-[68%] scale-[0.74] opacity-60",
  outgoing:
    "z-0  -translate-x-[38%] scale-[0.82] opacity-0 pointer-events-none",
};

function HeroChickenCarouselAnimated() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[3/4] w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]">
      {SLIDES.map((slide, i) => {
        const state = getState(i, active, SLIDES.length);
        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 will-change-[transform,opacity]",
              // easing: cubic-bezier(0.22,1,0.36,1) is a spring-like overshoot-free
              // curve — fast out, soft landing. Duration 900ms feels cinematic.
              "transition-[transform,opacity,box-shadow]",
              "duration-[900ms]",
              "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
              "motion-reduce:transition-none",
              STATE_CLASSES[state],
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-contain object-center"
              sizes="(max-width:640px) 92vw,(max-width:768px) 90vw,(max-width:1024px) 54vw,48rem"
              priority={i === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
