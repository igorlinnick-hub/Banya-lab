import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { UtmCapture } from "@/components/UtmCapture";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banyalab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Banya Lab · Oʻahu Ocean Banya & Retreats",
    template: "%s · Banya Lab",
  },
  description:
    "Traditional Ukrainian banya, ocean cruises, ice bath, and healing retreats on Oʻahu, Hawaiʻi.",
  openGraph: {
    title: "Banya Lab · Oʻahu Ocean Banya & Retreats",
    description:
      "Ukrainian venik rituals, ice baths, sunset cruises, and Friday fireworks — the old world banya, reborn in the Pacific.",
    url: siteUrl,
    siteName: "Banya Lab",
    images: [{ url: "/media/hero.jpg", width: 1600, height: 900 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banya Lab · Oʻahu Ocean Banya & Retreats",
    description:
      "Ukrainian venik rituals, ice baths, sunset cruises on Oʻahu.",
    images: ["/media/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-amber-50">
        <Analytics />
        <UtmCapture />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
