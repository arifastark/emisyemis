import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({ variable: "--font-pixel", subsets: ["latin"], weight: ["400"] });
const soft = VT323({ variable: "--font-soft", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Happy 20 🎂 — a tiny pixel birthday game",
  description: "A custom-made interactive pixel-art birthday game: cake, 20 wishes, runner game, quiz, memories and a final letter.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5ACBC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${soft.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
