"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";

import { Button } from "@/components/ui/button";
import { useHomeScrollSpy } from "@/hooks/use-home-scroll-spy";
import { isNavLinkActive, scrollToHomeNavTarget } from "@/lib/nav-scroll";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

import { HERO_NAV_LINKS } from "./constants";

function navBrushBackground(active: boolean): CSSProperties | undefined {
  if (!active) return undefined;
  return {
    backgroundImage: "url('/red-brush.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 52%",
    backgroundSize: "100% 100%",
  };
}

function desktopNavLinkClass(active: boolean) {
  return cn(
    "relative inline-block shrink-0 rounded-sm px-3 py-1.5 font-sans text-sm font-semibold tracking-wide transition xl:px-3.5 xl:py-2 xl:text-base",
    active
      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
      : "text-neutral-800 hover:text-black",
  );
}

function mobileNavLinkClass(active: boolean) {
  return cn(
    "block w-fit font-sans text-3xl font-semibold tracking-wide transition sm:text-4xl",
    active
      ? "px-5 py-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
      : "text-[#0c3d32] hover:text-[#cc2126]",
  );
}

const SCROLL_THRESHOLD_PX = 8;
/** Ignore tiny scroll jitter (px). */
const SCROLL_DELTA_PX = 6;
/** Always show the bar when this close to the top. */
const SHOW_NEAR_TOP_PX = 48;

export function HomeHeader() {
  const pathname = usePathname();
  const activeSection = useHomeScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const lastScrollY = useRef(0);
  const cartCount = useCartStore((s) =>
    s.items.reduce((n, line) => n + line.quantity, 0),
  );
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD_PX);

      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (y <= SHOW_NEAR_TOP_PX) {
        setHeaderHidden(false);
        return;
      }
      if (delta > SCROLL_DELTA_PX) {
        setHeaderHidden(true);
      } else if (delta < -SCROLL_DELTA_PX) {
        setHeaderHidden(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 flex items-center justify-between gap-4 py-4 pr-4 pl-0 will-change-transform sm:pr-6 lg:pr-10 [&_a]:cursor-pointer [&_button]:cursor-pointer",
          "[transition:transform_750ms_cubic-bezier(0.16,1,0.3,1),opacity_750ms_cubic-bezier(0.16,1,0.3,1),background-color_300ms_ease-out,border-color_300ms_ease-out,backdrop-filter_300ms_ease-out]",
          headerHidden
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
          scrolled
            ? "border-b border-neutral-100 bg-white/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {/* Left capsule with header banner */}
          <div className="flex h-12 w-[9rem] items-center justify-start overflow-hidden rounded-l-none rounded-r-[2rem] bg-[#0c3d34] sm:h-14 sm:w-[10.5rem] md:h-[4.5rem] md:w-[12.25rem] lg:h-16 lg:w-[13.5rem]">
            <div className="flex h-full w-full items-center pr-2 pl-3">
              <Image
                src="/footer.png"
                alt="Crispy Bowl Fried Chicken — excellence in every bite"
                width={1450}
                height={342}
                className="h-full w-full object-contain object-left"
                priority
              />
            </div>
          </div>
        </div>

        <nav
          className="absolute left-1/2 hidden max-w-[calc(100%-11rem)] -translate-x-1/2 items-center gap-5 lg:flex lg:gap-6 xl:gap-8"
          aria-label="Primary"
        >
          {HERO_NAV_LINKS.map(({ label, href }) => {
            const active = isNavLinkActive(href, pathname, activeSection);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                style={navBrushBackground(active)}
                className={desktopNavLinkClass(active)}
                onClick={(e) => {
                  if (scrollToHomeNavTarget(href, pathname)) {
                    e.preventDefault();
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={openCart}
            aria-label={
              cartCount > 0 ? `Open cart, ${cartCount} items` : "Open cart"
            }
            className="relative shrink-0 border-0 bg-transparent shadow-none backdrop-blur-none hover:bg-transparent hover:opacity-80 active:opacity-70"
          >
            <Image
              src="/shopping_cart_2_line.svg"
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0"
              aria-hidden
            />
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#cc2126] px-1 text-[0.65rem] leading-none font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </Button>

          {/* Mobile navbar sidebar */}
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            className="border-0 bg-transparent shadow-none backdrop-blur-none hover:bg-transparent hover:opacity-80 active:opacity-70 lg:hidden"
          >
            <Image
              src="/hamburger_line.svg"
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0"
              aria-hidden
            />
          </Button>
        </div>
      </header>

      <Dialog.Root open={navOpen} onOpenChange={setNavOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              "fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            )}
          />
          <Dialog.Content
            className={cn(
              "fixed top-0 left-0 z-50 flex h-full w-full max-w-sm flex-col border-r border-neutral-200 bg-white shadow-2xl outline-none",
              "data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
              "transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
            )}
          >
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <div className="flex items-center justify-between gap-4 border-b border-neutral-100 py-4 pr-4 pl-0">
              <div className="flex h-12 w-[10rem] items-center justify-start overflow-hidden rounded-l-none rounded-r-[2rem] bg-[#0c3d34] sm:h-14 sm:w-[10.5rem]">
                <div className="relative h-full w-full pr-2 pl-3">
                  <Image
                    src="/footer.png"
                    alt="Crispy Bowl Fried Chicken — excellence in every bite"
                    fill
                    className="object-contain object-left"
                    sizes="180px"
                    priority={false}
                  />
                </div>
              </div>

              <Dialog.Close asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Close navigation"
                >
                  <X className="size-5" />
                </Button>
              </Dialog.Close>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-6 py-8"
              aria-label="Mobile"
            >
              <ul className="space-y-6">
                {HERO_NAV_LINKS.map(({ label, href }) => {
                  const active = isNavLinkActive(href, pathname, activeSection);
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        style={navBrushBackground(active)}
                        onClick={(e) => {
                          if (scrollToHomeNavTarget(href, pathname)) {
                            e.preventDefault();
                          }
                          setNavOpen(false);
                        }}
                        className={mobileNavLinkClass(active)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-neutral-100 px-6 py-5">
              <p className="text-sm leading-relaxed text-neutral-600">
                Golden, hand-breaded chicken—made to order.
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
