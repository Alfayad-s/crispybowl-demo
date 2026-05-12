import Image from "next/image";
import Link from "next/link";

import { GsapRevealGroup } from "@/components/animation/gsap-reveal-group";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex h-[50vh] min-h-[50vh] flex-col overflow-y-auto border-t border-neutral-100 bg-white pt-0">
      <GsapRevealGroup
        className="flex min-h-0 flex-1 flex-col"
        start="top 90%"
        stagger={0.14}
      >
        <div className="mx-2 mt-0 flex shrink-0 justify-center rounded-t-none rounded-b-[2.5rem] bg-[#0c3d34] px-6 py-5 sm:mx-4 sm:rounded-b-[3rem] sm:px-9 sm:py-6 md:mx-6 md:rounded-b-[3.5rem] md:px-11 md:py-7 lg:mx-auto lg:max-w-[90rem] lg:rounded-b-[4rem] lg:px-14 lg:py-9 xl:px-16 xl:py-10">
          <Image
            src="/footer.png"
            alt="Crispy Bowl Fried Chicken — excellence in every bite"
            width={1450}
            height={342}
            className="h-auto max-h-[min(30vh,260px)] w-full object-contain object-center sm:max-h-[min(34vh,320px)] md:max-h-[min(38vh,380px)] lg:max-h-[min(42vh,440px)] xl:max-h-[min(44vh,480px)]"
            sizes="(max-width: 1536px) 95vw, 1400px"
          />
        </div>

        <div className="mx-auto mt-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-end gap-8 px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 sm:py-8 lg:px-10">
          <div>
            <p className="font-hero-display text-lg font-bold tracking-wide text-[#0c3d32] sm:text-xl">
              CRISPYBOWL
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
              Golden, hand-breaded chicken—made to order.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold tracking-wide text-neutral-700"
            aria-label="Footer"
          >
            <Link
              href="/#about"
              className="transition-colors hover:text-[#0c3d32]"
            >
              About
            </Link>
            <Link
              href="/#menu"
              className="transition-colors hover:text-[#0c3d32]"
            >
              Menu
            </Link>
            <Link
              href="/#try-bucket"
              className="transition-colors hover:text-[#0c3d32]"
            >
              Buckets
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-[#0c3d32]"
            >
              Blog
            </Link>
          </nav>

          <p className="text-xs text-neutral-400 sm:text-right">
            © {year} Crispybowl. All rights reserved.
          </p>
        </div>
      </GsapRevealGroup>
    </footer>
  );
}
