import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/*
 * design.md: Haas Grotesk / Haas Groot Disp is licensed, so Inter Display is the
 * documented open-source substitute for both. Inter's variable wght axis covers
 * the pricing sub-system's 475 / 575 mid-weights.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
