"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

import { registerGsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

const DEFAULT_TAG = "div";

type GsapRevealGroupProps<T extends ElementType = typeof DEFAULT_TAG> = {
  children: ReactNode;
  className?: string;
  as?: T;
  /** ScrollTrigger `start` */
  start?: string;
  stagger?: number;
  y?: number;
  duration?: number;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "as"> &
  Omit<ComponentPropsWithoutRef<"ul">, "children" | "as">;

export function GsapRevealGroup<T extends ElementType = typeof DEFAULT_TAG>({
  children,
  className,
  as,
  start = "top 86%",
  stagger = 0.11,
  y = 44,
  duration = 0.72,
  ...rest
}: GsapRevealGroupProps<T>) {
  const Root = (as ?? DEFAULT_TAG) as ElementType;
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const kids = Array.from(root.children) as HTMLElement[];
    if (kids.length === 0) return;

    const st = ScrollTrigger.create({
      trigger: root,
      start,
      once: true,
      onEnter: () => {
        gsap.fromTo(
          kids,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            stagger,
            ease: "power3.out",
          },
        );
      },
    });

    queueMicrotask(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      st.kill();
    };
  }, [start, stagger, y, duration]);

  return (
    <Root ref={rootRef} className={cn(className)} {...rest}>
      {children}
    </Root>
  );
}
