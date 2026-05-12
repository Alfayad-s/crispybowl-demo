"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/** Matches `HERO_NAV_LINKS` section targets (excluding Home). */
export type HomeNavSectionId = "home" | "about" | "menu" | "gallery";

const SECTION_DOM_IDS: Array<Exclude<HomeNavSectionId, "home">> = [
  "about",
  "menu",
  "gallery",
];

/** Scroll position past which a section counts as “passed” the header band. */
const HEADER_BAND_PX = 96;

function sectionTopDocumentY(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY;
}

function computeActiveSection(): HomeNavSectionId {
  if (typeof document === "undefined") return "home";
  const y = window.scrollY + HEADER_BAND_PX;
  let current: HomeNavSectionId = "home";
  for (const id of SECTION_DOM_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (sectionTopDocumentY(el) <= y) current = id;
  }
  return current;
}

export function useHomeScrollSpy() {
  const pathname = usePathname();
  const [active, setActive] = useState<HomeNavSectionId>("home");
  const raf = useRef<number | null>(null);

  const tick = useCallback(() => {
    if (pathname !== "/") return;
    const next = computeActiveSection();
    setActive((prev) => (prev === next ? prev : next));
  }, [pathname]);

  const scheduleTick = useCallback(() => {
    if (pathname !== "/") return;
    if (raf.current != null) return;
    raf.current = window.requestAnimationFrame(() => {
      raf.current = null;
      tick();
    });
  }, [pathname, tick]);

  useEffect(() => {
    if (pathname !== "/") {
      const t = window.setTimeout(() => setActive("home"), 0);
      return () => clearTimeout(t);
    }

    window.requestAnimationFrame(() => tick());

    const delayedSync = window.setTimeout(() => scheduleTick(), 400);

    window.addEventListener("scroll", scheduleTick, { passive: true });
    window.addEventListener("resize", scheduleTick);
    window.addEventListener("hashchange", scheduleTick);
    const onLoad = () => scheduleTick();
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(delayedSync);
      window.removeEventListener("scroll", scheduleTick);
      window.removeEventListener("resize", scheduleTick);
      window.removeEventListener("hashchange", scheduleTick);
      window.removeEventListener("load", onLoad);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [pathname, scheduleTick, tick]);

  return active;
}
