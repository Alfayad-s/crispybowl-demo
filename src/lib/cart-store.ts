import { create } from "zustand";

import type { MenuProduct } from "@/components/home/home-menu-data";

export type CartLine = {
  id: string;
  title: string;
  includes: string;
  priceLabel: string;
  priceInr: number;
  imageSrc: string;
  alt: string;
  quantity: number;
};

function toLine(product: MenuProduct): Omit<CartLine, "quantity"> {
  return {
    id: product.id,
    title: product.title,
    includes: product.includes,
    priceLabel: product.price,
    priceInr: product.priceInr,
    imageSrc: product.src,
    alt: product.alt,
  };
}

type CartState = {
  open: boolean;
  items: CartLine[];
  setOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (product: MenuProduct) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  open: false,
  items: [],

  setOpen: (open) => set({ open }),

  openCart: () => set({ open: true }),

  closeCart: () => set({ open: false }),

  addProduct: (product) =>
    set((state) => {
      const base = toLine(product);
      const idx = state.items.findIndex((l) => l.id === base.id);
      if (idx === -1) {
        return {
          open: true,
          items: [...state.items, { ...base, quantity: 1 }],
        };
      }
      const next = state.items.map((l, i) =>
        i === idx ? { ...l, quantity: l.quantity + 1 } : l,
      );
      return { open: true, items: next };
    }),

  increment: (id) =>
    set((state) => ({
      items: state.items.map((l) =>
        l.id === id ? { ...l, quantity: l.quantity + 1 } : l,
      ),
    })),

  decrement: (id) =>
    set((state) => ({
      items: state.items
        .map((l) => (l.id === id ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0),
    })),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((l) => l.id !== id),
    })),

  clear: () => set({ items: [] }),
}));

export function formatInr(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN")}/-`;
}
