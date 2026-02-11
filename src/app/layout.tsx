import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stablecoin Precision Tracker | USDT Watcher",
  description:
    "Track real-time stablecoin volatility with per-mille (‰) precision. Monitor USDT/USD pegs and detect micro-fluctuations instantly.",
  keywords: [
    "stablecoin",
    "usdt",
    "tether",
    "volatility",
    "tracker",
    "crypto",
    "precision",
    "peg monitor",
    "arbitrage",
  ],
  openGraph: {
    title: "Stablecoin Precision Tracker | USDT Watcher",
    description:
      "Don't miss a micro-move. Track stablecoin volatility with high precision (0.0001).",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stablecoin Precision Tracker",
    description: "High-precision stablecoin volatility tracking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
