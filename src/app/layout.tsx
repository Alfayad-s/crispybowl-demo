import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteFooter } from "@/components/site-footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pogoniaBold = localFont({
  src: "../../public/font/pogonia-bold.ttf",
  variable: "--font-pogonia-bold",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const siteTitle = "Crispybowl";
const siteDescription =
  "Crispybowl is a fried chicken shop serving golden, hand-breaded chicken cooked to order—loud crunch, juicy meat, and bold flavor in every bucket, box, and bite.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteTitle,
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "Crispybowl",
    "fried chicken",
    "chicken restaurant",
    "hand-breaded chicken",
    "chicken buckets",
    "crispy chicken",
    "takeout chicken",
    "fast casual chicken",
  ],
  authors: [{ name: siteTitle }],
  creator: siteTitle,
  publisher: siteTitle,
  category: "food",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo-bg.jpg", type: "image/jpeg", sizes: "any" }],
    shortcut: "/logo-bg.jpg",
    apple: [{ url: "/logo-bg.jpg", type: "image/jpeg", sizes: "1080x1080" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteTitle,
    title: `${siteTitle} | Fried chicken, made fresh`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crispybowl — golden fried chicken, buckets, and order now",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | Fried chicken, made fresh`,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c3d32" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pogoniaBold.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AppProviders>
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
