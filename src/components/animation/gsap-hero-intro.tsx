"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, type ReactNode } from "react";

import { registerGsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

type GsapHeroIntroProps = {
  children: ReactNode;
  className?: string;
};

export function GsapHeroIntro({ children, className }: GsapHeroIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const leftBits = root.querySelectorAll(".hero-left-inner > *");
      const yellow = root.querySelector(".hero-yellow");
      const chicken = root.querySelector(".hero-chicken");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (leftBits.length) {
        tl.fromTo(
          leftBits,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.1 },
          0,
        );
      }
      if (yellow) {
        tl.fromTo(
          yellow,
          { autoAlpha: 0, x: 48 },
          { autoAlpha: 1, x: 0, duration: 0.62 },
          0.12,
        );
      }
      if (chicken) {
        tl.fromTo(
          chicken,
          { autoAlpha: 0, scale: 0.94, y: 28 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.78, ease: "power2.out" },
          0.08,
        );
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
}
