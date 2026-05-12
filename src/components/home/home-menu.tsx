import Image from "next/image";

import { GsapRevealGroup } from "@/components/animation/gsap-reveal-group";

import { HomeMenuCarousel } from "./home-menu-carousel";
import { MENU_PRODUCTS } from "./home-menu-data";

export function HomeMenu() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-neutral-50 px-6 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <GsapRevealGroup className="mx-auto max-w-[82rem]">
        <div className="max-w-4xl text-left">
          <p className="font-hero-display text-base font-bold tracking-[0.2em] text-[#cc2126] sm:text-lg md:text-xl">
            ORDER FAVORITES
          </p>
          <h2
            id="menu-heading"
            className="font-hero-display mt-3 text-6xl leading-[0.95] font-bold tracking-wide text-[#0c3d32] uppercase sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Menu
          </h2>
        </div>

        <div
          className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12"
          role="tablist"
          aria-label="Menu categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[#cc2126] bg-white/0 py-2 pr-6 pl-2 shadow-sm transition hover:shadow-md sm:gap-3.5 sm:py-2.5 sm:pr-8 sm:pl-2.5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-transparent p-1.5 sm:size-12 md:size-14 md:p-2">
              <Image
                src="/chicken/primary.png"
                alt="Bucket chicken"
                width={200}
                height={200}
                className="h-full w-full object-contain"
                sizes="56px"
              />
            </span>
            <span className="font-hero-display text-sm font-bold tracking-wide text-[#0c3d32] uppercase sm:text-base">
              Bucket Chicken
            </span>
          </button>
        </div>

        <HomeMenuCarousel products={MENU_PRODUCTS} />
      </GsapRevealGroup>
    </section>
  );
}
