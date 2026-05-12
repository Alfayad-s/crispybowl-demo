import Image from "next/image";
import Link from "next/link";

import { GsapRevealGroup } from "@/components/animation/gsap-reveal-group";

export function HomeAbout() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="rounded-t-xl bg-[#0c3d32] px-6 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <GsapRevealGroup className="mx-auto grid max-w-7xl items-center gap-12 text-left lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-x-16 xl:gap-x-24">
        <div className="min-w-0 lg:max-w-xl lg:justify-self-start">
          <p className="font-hero-display text-sm font-bold tracking-[0.2em] text-[#FDB913]">
            OUR STORY
          </p>
          <h2
            id="about-heading"
            className="font-hero-display mt-3 text-5xl leading-[0.95] font-bold tracking-wide uppercase sm:text-6xl md:text-7xl lg:text-8xl"
          >
            About us
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/90 md:text-xl">
            <p>
              Crispybowl started with one idea: fried chicken that sounds as
              good as it tastes—loud crunch, tender meat, and seasoning you
              notice on the first bite.
            </p>
            <p>
              We bread by hand, cook to order, and keep the menu focused on what
              we do best. Whether you are grabbing a quick box or feeding the
              table, we aim for the same thing every time: hot, fresh, and
              unforgettable.
            </p>
          </div>

          <Link
            href="/blog"
            className="font-hero-display mt-10 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FDB913] bg-transparent px-8 py-3.5 text-base font-bold tracking-widest text-[#FDB913] uppercase transition-colors duration-300 ease-out hover:bg-[#FDB913] hover:text-[#0c3d32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDB913]"
          >
            Our Blog
          </Link>
        </div>

        <div className="flex w-full min-w-0 justify-center lg:justify-end">
          <Image
            src="/logo.png"
            alt="Crispybowl"
            width={500}
            height={500}
            className="aspect-square w-[min(100%,15rem)] shrink-0 object-contain sm:w-[min(100%,17.5rem)] lg:w-[min(100%,22rem)] xl:w-[min(100%,24rem)]"
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, (max-width: 1280px) 352px, 384px"
          />
        </div>
      </GsapRevealGroup>
    </section>
  );
}
