import type { Metadata } from "next";

import { HomeAbout } from "@/components/home/home-about";
import { HomeGallery } from "@/components/home/home-gallery";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMenu } from "@/components/home/home-menu";
import { HomeTryBucket } from "@/components/home/home-try-bucket";
import { SplashScreen } from "@/components/splash/splash-screen";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Order Crispybowl’s hand-breaded fried chicken—buckets, combos, and sides made fresh. Crispy outside, juicy inside.",
  openGraph: {
    title: "Crispybowl | Hand-breaded fried chicken",
    description:
      "Order Crispybowl’s hand-breaded fried chicken—buckets, combos, and sides made fresh. Crispy outside, juicy inside.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <main>
        <HomeHero />
        <HomeAbout />
        <HomeMenu />
        <HomeTryBucket />
        <HomeGallery />
      </main>
      <SplashScreen />
    </>
  );
}
