export const MENU_PRODUCTS = [
  {
    id: "combo-7",
    src: "/chicken/7pc.png",
    alt: "7 piece chicken combo with buns and dips",
    title: "7 Pc Combo",
    includes: "4 Bun, 4 Mayo, Ketchup",
    price: "₹ 449/-",
    priceInr: 449,
  },
  {
    id: "combo-12",
    src: "/chicken/12.png",
    alt: "12 piece chicken combo with buns and dips",
    title: "12 Pc Combo",
    includes: "4 Bun, 4 Mayo, Ketchup",
    price: "₹ 699/-",
    priceInr: 699,
  },
  {
    id: "combo-18",
    src: "/chicken/18pc.png",
    alt: "18 piece chicken combo with buns and dips",
    title: "18 Pc Combo",
    includes: "6 Bun, 6 Mayo, Ketchup",
    price: "₹ 1099/-",
    priceInr: 1099,
  },
  {
    id: "combo-24",
    src: "/chicken/24.png",
    alt: "24 piece chicken combo with buns and dips",
    title: "24 Pc Combo",
    includes: "6 Bun, 6 Mayo, Ketchup",
    price: "₹ 1450/-",
    priceInr: 1450,
  },
] as const;

export type MenuProduct = (typeof MENU_PRODUCTS)[number];

/** 7 pc bucket — used for “Try your first Bucket” CTA */
export const BUCKET_7PC_OFFER = MENU_PRODUCTS[0];
