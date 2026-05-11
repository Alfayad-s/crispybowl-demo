import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, recipes, and updates from Crispybowl.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-neutral-900 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="font-hero-display text-sm font-bold tracking-[0.2em] text-[#0c3d32]">
          CRISPYBOWL
        </p>
        <h1 className="font-hero-display mt-3 text-4xl font-bold tracking-wide uppercase sm:text-5xl">
          Blog
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          Stories, kitchen notes, and specials will land here soon.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm font-semibold text-[#cc2126] underline-offset-4 transition-colors hover:text-[#a61a1e]"
        >
          ← Home
        </Link>
      </div>
    </main>
  );
}
