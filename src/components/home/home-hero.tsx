import { HeroChickenCarousel } from "./hero-chicken-carousel";
import { HomeHeader } from "./home-header";

const ACCENT_YELLOW = "#FDB913";

export function HomeHero() {
  return (
    <section className="relative flex h-screen max-h-screen min-h-0 flex-col overflow-x-hidden overflow-y-hidden bg-white text-neutral-900">
      <HomeHeader />

      {/* Matches mobile header height: py-4 (16) + capsule h-12 (48) + py-4 (16) ~= 80px */}
      <div aria-hidden className="h-[5rem] shrink-0 sm:h-[5.5rem]" />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        {/* Left: white ~60% */}
        <div className="relative z-10 flex min-h-0 flex-[3] flex-col justify-center bg-white px-6 py-10 md:w-[60%] md:flex-none md:py-16 md:pr-16 md:pl-8 lg:pr-22 lg:pl-12 xl:pr-28 xl:pl-16">
          <div className="mx-auto w-full max-w-xl space-y-8 pt-0 md:pt-16 lg:pt-14">
            <div className="font-hero-display inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 font-bold backdrop-blur-md">
              <span className="text-amber-600" aria-hidden>
                🔥
              </span>
              <span className="text-sm tracking-widest">NOW IN STORES</span>
            </div>

            <h1 className="font-hero-display text-5xl leading-[1.1] font-bold tracking-tighter text-neutral-950 sm:text-6xl md:text-7xl">
              Crispy Outside.
              <br />
              <span className="text-amber-600">Juicy Inside.</span>
            </h1>

            <p className="max-w-lg text-lg text-gray-600 md:text-2xl">
              Golden, hand-breaded, perfectly seasoned fried chicken that hits
              different. Made fresh daily with love and secret spices.
            </p>

            <div className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible sm:pb-0">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-3 rounded-full bg-black px-6 py-3 text-base font-semibold whitespace-nowrap text-white transition-all hover:scale-[1.03] hover:bg-amber-600 sm:px-8 sm:py-4 sm:text-lg"
              >
                Order Now
                <span aria-hidden>→</span>
              </button>

              <button
                type="button"
                className="cursor-pointer rounded-full border-2 border-black px-6 py-3 text-base font-semibold whitespace-nowrap text-neutral-900 transition-colors duration-300 ease-out hover:border-[#cc2126] hover:bg-[#cc2126] hover:text-white active:border-[#a61a1e] active:bg-[#a61a1e] sm:px-8 sm:py-4 sm:text-lg"
              >
                See the Menu
              </button>
            </div>
          </div>
        </div>

        {/* Right: yellow ~40% */}
        <div
          className="relative z-0 min-h-0 flex-[2] overflow-hidden rounded-t-[3rem] md:w-[40%] md:flex-none md:rounded-none"
          style={{ backgroundColor: ACCENT_YELLOW }}
        ></div>

        {/* Chicken: centered on the 60% / 40% seam */}
        <div className="pointer-events-none absolute top-[72%] left-1/2 z-20 w-[min(86vw,22rem)] max-w-[30rem] -translate-x-1/2 -translate-y-[40%] sm:w-[min(84vw,26rem)] sm:max-w-[34rem] md:top-1/2 md:left-[60%] md:w-[min(54vw,34rem)] md:max-w-[42rem] md:-translate-y-1/2 lg:w-[min(50vw,38rem)] lg:max-w-[48rem] xl:max-w-[52rem]">
          <HeroChickenCarousel />
        </div>
      </div>

      {/* Mobile bottom nav removed (user request) */}
    </section>
  );
}
