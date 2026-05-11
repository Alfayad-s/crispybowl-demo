"use client";

import { useCartStore } from "@/lib/cart-store";
import type { MenuProduct } from "@/components/home/home-menu-data";

type TryBucketAddToCartButtonProps = {
  product: MenuProduct;
};

export function TryBucketAddToCartButton({
  product,
}: TryBucketAddToCartButtonProps) {
  const addProduct = useCartStore((s) => s.addProduct);

  return (
    <button
      type="button"
      onClick={() => addProduct(product)}
      className="font-hero-display mt-10 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#cc2126] px-10 py-4 text-lg font-bold tracking-wide text-white uppercase shadow-md transition-colors duration-300 hover:bg-[#a61a1e] sm:mt-12 sm:px-12 sm:py-5 sm:text-xl"
    >
      Order now
      <span aria-hidden className="text-2xl leading-none">
        →
      </span>
    </button>
  );
}
