"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

import type { MenuProduct } from "./home-menu-data";

/** Pale gold ring + icon on product “Add” */
const ADD_BUTTON_ACCENT = "#c9a14a";

const GAP_PX = 24;

function MenuProductCard({ product }: { product: MenuProduct }) {
  const addProduct = useCartStore((s) => s.addProduct);

  return (
    <article className="relative flex min-h-0 w-full flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200/90 bg-white p-6 shadow-[0_16px_44px_-16px_rgba(15,23,42,0.11)] sm:rounded-[2.25rem] sm:p-7 md:rounded-[2.5rem] md:p-8 lg:p-8">
      {/* Top capsule (matches footer pill: squared top corners, rounded bottom) */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-[1] flex h-12 w-[11rem] -translate-x-1/2 items-center justify-center rounded-t-none rounded-b-[1.5rem] bg-[#0c3d34] sm:w-[13.5rem] md:w-[15.5rem]">
        <div className="relative h-9 w-full">
          <Image
            src="/footer.png"
            alt=""
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 11.5rem, 15.5rem"
            priority={false}
          />
        </div>
      </div>

      <button
        type="button"
        aria-label={`Add ${product.title} to cart`}
        onClick={() => addProduct(product)}
        className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border-2 border-transparent bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-white active:scale-95 md:top-6 md:right-6 md:size-12"
        style={{ borderColor: ADD_BUTTON_ACCENT, color: ADD_BUTTON_ACCENT }}
      >
        <Plus className="size-[1.15rem] md:size-5" strokeWidth={2.5} />
      </button>

      <div className="relative flex min-h-[11rem] w-full items-center justify-center pt-10 sm:min-h-[12.5rem] md:min-h-[14.5rem] lg:min-h-[17rem] xl:min-h-[18.5rem]">
        <Image
          src={product.src}
          alt={product.alt}
          width={480}
          height={480}
          className="h-auto max-h-[9.5rem] w-full max-w-[min(100%,15.5rem)] object-contain sm:max-h-[11rem] sm:max-w-[17rem] md:max-h-[12.5rem] md:max-w-[19rem] lg:max-h-[14.5rem] lg:max-w-[21rem] xl:max-h-[16rem]"
          sizes="(max-width: 768px) 78vw, (max-width: 1200px) 40vw, 28vw"
        />
      </div>

      <div className="mt-5 flex flex-col items-center text-center sm:mt-6 md:mt-8">
        <h3 className="font-hero-display text-xl font-bold tracking-wide text-neutral-950 uppercase sm:text-2xl md:text-[1.35rem]">
          {product.title}
        </h3>
        <p className="mt-2 max-w-[20rem] text-sm leading-relaxed text-neutral-600 sm:text-base">
          {product.includes}
        </p>
        <div className="mt-4 flex min-w-[7.5rem] flex-col items-center rounded-lg bg-[#FDB913] px-4 py-2.5 text-center shadow-sm sm:mt-5 sm:min-w-[8.5rem] sm:rounded-xl sm:px-5 sm:py-3">
          <span className="text-[0.65rem] leading-none font-bold tracking-wide text-neutral-900 uppercase sm:text-xs">
            NOW@
          </span>
          <span className="font-hero-display mt-1 text-2xl leading-none font-bold text-neutral-950 tabular-nums sm:text-3xl md:text-[2rem]">
            {product.price}
          </span>
        </div>
      </div>
    </article>
  );
}

const AUTOPLAY_MS = 4500;

export function HomeMenuCarousel({
  products,
}: {
  products: readonly MenuProduct[];
}) {
  const [active, setActive] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const len = products.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => {
        if (dir === 1) return (i + 1) % len;
        return (i - 1 + len) % len;
      });
    },
    [len],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const updateTranslate = useCallback(() => {
    const container = containerRef.current;
    const slot = slotRef.current;
    if (!container || !slot) return;
    const cw = container.offsetWidth;
    const iw = slot.offsetWidth;
    const t = cw / 2 - iw / 2 - active * (iw + GAP_PX);
    setTranslateX(t);
  }, [active]);

  useLayoutEffect(() => {
    updateTranslate();
    const container = containerRef.current;
    const slot = slotRef.current;
    if (!container || !slot) return;
    const ro = new ResizeObserver(() => updateTranslate());
    ro.observe(container);
    ro.observe(slot);
    return () => ro.disconnect();
  }, [updateTranslate]);

  useEffect(() => {
    const onResize = () => updateTranslate();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateTranslate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (reduceMotion || len <= 1 || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % len);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, len, paused]);

  return (
    <div
      className="relative mt-5 sm:mt-6 lg:mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        aria-label="Previous item"
        onClick={() => go(-1)}
        className="absolute top-1/2 left-1 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md transition hover:bg-neutral-50 sm:left-2 sm:size-11 lg:left-4 lg:size-12"
      >
        <ChevronLeft className="size-5 sm:size-6" />
      </button>
      <button
        type="button"
        aria-label="Next item"
        onClick={() => go(1)}
        className="absolute top-1/2 right-1 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md transition hover:bg-neutral-50 sm:right-2 sm:size-11 lg:right-4 lg:size-12"
      >
        <ChevronRight className="size-5 sm:size-6" />
      </button>

      <div
        ref={containerRef}
        className="overflow-hidden py-8 md:py-12"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const x = e.changedTouches[0].clientX;
          const dx = x - touchStartX.current;
          if (dx < -48) go(1);
          if (dx > 48) go(-1);
        }}
      >
        <div
          className={cn(
            "flex gap-6 will-change-transform",
            !reduceMotion && "transition-transform duration-500 ease-out",
          )}
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={i === 0 ? slotRef : undefined}
              className="w-[min(78vw,21rem)] shrink-0 sm:w-[min(76vw,22rem)] md:w-[min(72vw,24rem)] lg:w-[min(56vw,26rem)]"
            >
              <div
                className={cn(
                  "origin-center transition-[transform,opacity] duration-500 ease-out",
                  active === i
                    ? "scale-[1.06] opacity-100 md:scale-[1.08]"
                    : "scale-[0.82] opacity-[0.72] md:scale-[0.86] md:opacity-[0.78]",
                  reduceMotion && "duration-0",
                )}
              >
                <MenuProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 flex justify-center gap-2 md:mt-6"
        role="group"
        aria-label="Choose menu item"
      >
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-current={active === i ? "true" : undefined}
            aria-label={`Show ${p.title}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              active === i
                ? "w-9 bg-[#0c3d32]"
                : "w-2.5 bg-neutral-300 hover:bg-neutral-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}
