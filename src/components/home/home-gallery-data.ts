const BASE = "/gallery";

/** Brand red (matches header / menu CTA). */
export const GALLERY_BRAND_RED = "#cc2126";

export type GalleryItem =
  | {
      id: string;
      kind: "image";
      src: string;
      alt: string;
    }
  | {
      id: string;
      kind: "video";
      src: string;
      alt: string;
    };

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: "g-1",
    kind: "image",
    src: `${BASE}/SnapInsta.to_683585298_18070377695429167_6218176975391151304_n.jpg`,
    alt: "Crispybowl in the kitchen",
  },
  {
    id: "g-2",
    kind: "video",
    src: `${BASE}/SnapInsta.to_AQMr1CyP86vbaTKR27fWZc4ST3Ka1DelUDQ4gDTELPN3QpBKPaQJVu7GN_oZvbZWJNPNR-TIaUIwtSg8tNzm0q2RQVrPbBxejpAiDnY.mp4`,
    alt: "Fresh fried chicken being prepared",
  },
  {
    id: "g-3",
    kind: "video",
    src: `${BASE}/SnapInsta.to_AQOgsvdV7mGV-GSla0WzzpOAE3MntM3pzUDt-A4KCYfZraeMutelpQ7ydXLNAkOX5UKA2PLwLLhhHnrH4yn_ySjpaU1pqBfTv5t5lfk.mp4`,
    alt: "Behind the scenes at Crispybowl",
  },
  {
    id: "g-4",
    kind: "image",
    src: `${BASE}/SnapInsta.to_689177067_18071961539429167_2475257570666137475_n.jpg`,
    alt: "Golden fried chicken platter",
  },
  {
    id: "g-5",
    kind: "video",
    src: `${BASE}/SnapInsta.to_AQNWdrm5zisWxeCaUooQpM93gJgC0qvc8z4YL-TesUKc5YrYm_0UjZSxj2gozeRi7GwvqiRpK5ihc_si91Lrb3nos9d7gZWoah7uzyg.mp4`,
    alt: "Cooking crispy chicken",
  },
  {
    id: "g-6",
    kind: "video",
    src: `${BASE}/SnapInsta.to_AQPi485mX_vNwGkQOwMdsA5EhB1WplqesGNDTCFUNN5pPmMtnksNs6lVgwy3F-zXvEAhaW7cSkGvCPWmxWe2A72w15xz102mr-rU0Ko.mp4`,
    alt: "Crispybowl food prep",
  },
  {
    id: "g-7",
    kind: "video",
    src: `${BASE}/SnapInsta.to_AQM1LBPJvAb6nMm_Y0nzdvIDkZ7ELmaMvOQWUCaeSO94w8HN5YYmjRbnrdfZ4aGmQmVbY9npqCLc4lc4NqKUy1XQBU9XwiE-02fkqpc.mp4`,
    alt: "Crispybowl highlights",
  },
] as const;
