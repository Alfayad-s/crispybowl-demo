import Image from "next/image";

import { GsapRevealGroup } from "@/components/animation/gsap-reveal-group";
import { TryBucketAddToCartButton } from "@/components/cart/try-bucket-add-to-cart-button";

import { BUCKET_7PC_OFFER } from "./home-menu-data";

export function HomeTryBucket() {
  const combo = BUCKET_7PC_OFFER;

  return (
    <section
      id="try-bucket"
      aria-labelledby="try-bucket-heading"
      className="bg-neutral-50 px-6 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <GsapRevealGroup className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <h2
            id="try-bucket-heading"
            className="font-hero-display max-w-xl text-5xl leading-[0.95] font-bold tracking-wide text-[#cc2126] uppercase sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Try your first Bucket
          </h2>

          <p className="font-hero-display mt-8 text-2xl font-bold tracking-wide text-neutral-950 uppercase sm:text-3xl md:text-4xl">
            {combo.title}
          </p>
          <p className="mt-3 max-w-md text-lg leading-relaxed text-neutral-600 sm:text-xl">
            {combo.includes}
          </p>

          <div className="mt-6 flex flex-col items-center self-center rounded-xl bg-[#FDB913] px-6 py-3 text-center shadow-sm sm:mt-8 sm:px-8 sm:py-4 lg:self-start">
            <span className="text-xs font-bold tracking-wide text-neutral-900 uppercase sm:text-sm">
              NOW@
            </span>
            <span className="font-hero-display mt-1 text-3xl font-bold text-neutral-950 tabular-nums sm:text-4xl md:text-5xl">
              {combo.price}
            </span>
          </div>

          <TryBucketAddToCartButton product={BUCKET_7PC_OFFER} />
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative w-full max-w-[min(100%,28rem)] sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,40rem)] lg:w-[min(100%,44rem)] lg:max-w-none xl:w-[min(100%,52rem)]">
            <Image
              src="/chicken/primary.png"
              alt="Crispybowl bucket with fried chicken, dips, and buns"
              width={900}
              height={900}
              className="h-auto w-full object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
          </div>
        </div>
      </GsapRevealGroup>
    </section>
  );
}
