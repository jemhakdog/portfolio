import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * design.md: Haas Grotesk / Haas Groot Disp is licensed, so Inter Display is the
 * documented open-source substitute for both. Inter's variable wght axis covers
 * the pricing sub-system's 475 / 575 mid-weights.
 *
 * The woff2 files live in ./fonts and are never fetched from fonts.googleapis.com
 * — `next/font/google` downloads at build time, which breaks a build with no
 * network. Two faces because the browser walks the `--font-sans` stack per glyph:
 * latin-ext holds the peso sign (₱, U+20B1) the copy uses, and it stays off the
 * preload list so the initial document is one font fetch.
 */
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const interExt = localFont({
  src: "./fonts/inter-latin-ext.woff2",
  variable: "--font-inter-ext",
  weight: "100 900",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Jem Carlo G. Austria — Junior Developer",
  description:
    "Junior developer in Pangasinan, PH. I build small software that works offline, on cheap hardware — Python, React, Supabase.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-palette="bold"
      className={`${inter.variable} ${interExt.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
