"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Dialog } from "radix-ui";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatInr, useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const subtotal = items.reduce((sum, l) => sum + l.priceInr * l.quantity, 0);
  const totalQty = items.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-2xl outline-none",
            "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
            "transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <Dialog.Title className="font-hero-display text-xl font-bold tracking-wide text-[#0c3d32] uppercase sm:text-2xl">
                Your cart
              </Dialog.Title>
              <p className="mt-1 text-sm text-neutral-600">
                {totalQty === 0
                  ? "Add a combo from the menu."
                  : `${totalQty} item${totalQty === 1 ? "" : "s"} · ${formatInr(subtotal)}`}
              </p>
            </div>
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                  <ShoppingBag className="size-8" strokeWidth={1.5} />
                </div>
                <p className="max-w-[14rem] text-sm leading-relaxed text-neutral-600">
                  Nothing here yet. Tap + on a bucket combo to add it.
                </p>
                <Dialog.Close asChild>
                  <a
                    href="#menu"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "font-hero-display rounded-full border-[#0c3d32] font-bold tracking-wide text-[#0c3d32] uppercase",
                    })}
                  >
                    Browse menu
                  </a>
                </Dialog.Close>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((line) => (
                  <li
                    key={line.id}
                    className="flex gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-3 sm:p-4"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white sm:size-24">
                      <Image
                        src={line.imageSrc}
                        alt={line.alt}
                        fill
                        className="object-contain p-1.5"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-hero-display text-sm leading-tight font-bold text-neutral-950 uppercase sm:text-base">
                          {line.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          className="shrink-0 rounded-md p-1.5 text-neutral-400 transition hover:bg-white hover:text-[#cc2126]"
                          aria-label={`Remove ${line.title}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                        {line.includes}
                      </p>
                      <p className="font-hero-display mt-2 text-sm font-bold text-[#0c3d32] tabular-nums sm:text-base">
                        {line.priceLabel}
                        <span className="ml-1 text-xs font-semibold text-neutral-500">
                          each
                        </span>
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="sr-only">Quantity</span>
                        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-0.5">
                          <button
                            type="button"
                            onClick={() => decrement(line.id)}
                            className="flex size-8 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="font-hero-display min-w-8 text-center text-sm font-bold text-black tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(line.id)}
                            className="flex size-8 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <span className="font-hero-display ml-auto text-sm font-bold text-neutral-900 tabular-nums sm:text-base">
                          {formatInr(line.priceInr * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-neutral-100 bg-neutral-50/90 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-hero-display text-sm font-bold tracking-wide text-neutral-600 uppercase">
                  Subtotal
                </span>
                <span className="font-hero-display text-xl font-bold text-[#0c3d32] tabular-nums">
                  {formatInr(subtotal)}
                </span>
              </div>
              <Separator className="my-4 bg-neutral-200" />
              <Button
                type="button"
                className="font-hero-display h-11 w-full rounded-full border-0 bg-[#cc2126] text-sm font-bold tracking-wide text-white uppercase hover:bg-[#a61a1e]"
              >
                Proceed to checkout
              </Button>
              <button
                type="button"
                onClick={() => clear()}
                className="mt-3 w-full text-center text-xs font-medium text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline"
              >
                Clear cart
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
