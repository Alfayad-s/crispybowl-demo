"use client";

import Image from "next/image";

import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function CartFab() {
  const cartOpen = useCartStore((s) => s.open);
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) =>
    s.items.reduce((n, line) => n + line.quantity, 0),
  );

  if (count === 0 || cartOpen) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={count > 1 ? `Open cart, ${count} items` : "Open cart, 1 item"}
      className={cn(
        "fixed z-30 flex size-14 items-center justify-center rounded-full bg-[#cc2126] text-white shadow-lg ring-2 ring-white/25 transition hover:bg-[#a61a1e] hover:shadow-xl active:scale-[0.97]",
        "right-[max(1.25rem,env(safe-area-inset-right,0px))] bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:right-8 sm:bottom-8 sm:size-[3.75rem]",
      )}
    >
      <Image
        src="/shopping_cart_2_line.svg"
        alt=""
        width={28}
        height={28}
        className="size-7 shrink-0 brightness-0 invert"
        aria-hidden
      />
      <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[0.65rem] leading-none font-bold text-[#cc2126] ring-2 ring-[#cc2126]">
        {count > 99 ? "99+" : count}
      </span>
    </button>
  );
}
