import type { Metadata } from "next";

import { HomeAbout } from "@/components/home/home-about";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMenu } from "@/components/home/home-menu";
import { HomeTryBucket } from "@/components/home/home-try-bucket";
import { SplashScreen } from "@/components/splash/splash-screen";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <main>
        <HomeHero />
        <HomeAbout />
        <HomeMenu />
        <HomeTryBucket />
      </main>
      <SplashScreen />
    </>
  );
}
