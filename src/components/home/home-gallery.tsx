import { GsapRevealGroup } from "@/components/animation/gsap-reveal-group";
import { cn } from "@/lib/utils";

import { GalleryVideoTile } from "./gallery-video-tile";
import { GALLERY_BRAND_RED, GALLERY_ITEMS } from "./home-gallery-data";

const TILE_SHELL =
  "overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:rounded-3xl";

export function HomeGallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-28 border-t border-white/10 px-6 py-20 text-white sm:scroll-mt-32 sm:px-8 lg:px-10 lg:py-28"
      style={{ backgroundColor: GALLERY_BRAND_RED }}
    >
      <GsapRevealGroup className="mx-auto max-w-[82rem]">
        <p className="font-hero-display text-base font-bold tracking-[0.2em] text-white/90 sm:text-lg md:text-xl">
          GALLERY
        </p>
        <h2
          id="gallery-heading"
          className="font-hero-display mt-3 text-4xl leading-[0.95] font-bold tracking-wide uppercase sm:text-5xl md:text-6xl lg:text-7xl"
        >
          From the kitchen
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Photos and reels from our fryers, counters, and daily rush—each at its
          natural aspect ratio.
        </p>

        <GsapRevealGroup
          as="ul"
          className="mt-12 list-none max-md:grid max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-4 sm:max-md:gap-x-4 sm:max-md:gap-y-5 md:block md:columns-2 md:gap-0 md:[column-gap:1.25rem] lg:[column-gap:1.5rem] xl:columns-3"
          start="top 88%"
          stagger={0.06}
          y={24}
          duration={0.55}
        >
          {GALLERY_ITEMS.map((item) => (
            <li
              key={item.id}
              className={cn(
                TILE_SHELL,
                "relative min-h-0 max-md:flex max-md:flex-col md:mb-5 md:break-inside-avoid md:last:mb-0",
                item.id === "g-7" && "max-md:col-span-2",
              )}
            >
              {item.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element -- intrinsic dimensions; avoids crop from fill/object-cover
                <img
                  src={item.src}
                  alt={item.alt}
                  className="block h-auto w-full max-w-full align-middle"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <GalleryVideoTile src={item.src} alt={item.alt} />
              )}
            </li>
          ))}
        </GsapRevealGroup>
      </GsapRevealGroup>
    </section>
  );
}
