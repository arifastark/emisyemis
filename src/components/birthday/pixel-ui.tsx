"use client";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import type { ReactNode } from "react";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── Big rounded pixel button (ARE YOU READY? etc.) ──
export function PixelButton({
  children,
  onClick,
  color = "#FF6B9D",
  small = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  small?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => {
        birthdayAudio.click();
        onClick?.();
      }}
      className={`pixel-font pixel-btn ${small ? "px-5 py-3 text-xs md:text-sm" : "px-8 py-4 text-sm md:px-12 md:py-5 md:text-xl"}`}
      style={{ background: color }}
    >
      {children}
    </motion.button>
  );
}

// ── Pixel panel / dialog box ──
export function PixelPanel({
  children,
  className = "",
  color = "#FFF6E9",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`pixel-panel ${className}`} style={{ background: color }}>
      {children}
    </div>
  );
}

// ── Stage wrapper: centers content, pink bg, floating pixels ──
export function StageShell({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center px-4 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <span className="pixel-font inline-block -rotate-2 rounded-lg border-4 border-[#3A2B2B] bg-[#FFD93D] px-4 py-1.5 text-[10px] tracking-widest text-[#3A2B2B] md:text-xs">
          {kicker}
        </span>
        <h2 className="pixel-font mt-4 text-xl leading-tight text-[#3A2B2B] md:text-4xl" style={{ textShadow: "3px 3px 0 #fff" }}>
          {title}
        </h2>
        {subtitle && <p className="pixel-soft mx-auto mt-3 max-w-xl text-base md:text-lg">{subtitle}</p>}
      </motion.div>
      {children}
    </div>
  );
}

// ── Progress dots for 8 stages ──
export function StageProgress({ stage, total }: { stage: number; total: number }) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-3 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border-[3px] border-[#3A2B2B] bg-[#FFF6E9]/95 px-3 py-2 shadow-[3px_3px_0_#3A2B2B]">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="block h-2.5 w-2.5 rounded-[3px] border border-[#3A2B2B] transition-all md:h-3 md:w-3"
          style={{ background: i <= stage ? "#FF6B9D" : "#FFD8D8", transform: i === stage ? "scale(1.35)" : "none" }}
        />
      ))}
    </div>
  );
}

// ── tiny pixel burst via canvas-confetti ──
export function pixelBurst(big = false) {
  birthdayAudio.pop();
  confetti({
    particleCount: big ? 220 : 70,
    spread: big ? 120 : 75,
    origin: { y: 0.6 },
    scalar: 1.1,
    ticks: 220,
    colors: ["#FF6B9D", "#FFD93D", "#6BCB77", "#4D96FF", "#9B5DE5", "#ffffff"],
    shapes: ["square"],
  });
}

// ── floating pixel decorations (hearts, stars…) ──
export function FloatingPixels({ items = ["💖", "⭐", "🎈", "✨", "🍰", "💛"] }: { items?: string[] }) {
  const dots = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    delay: (i % 7) * 0.7,
    dur: 3.5 + (i % 5),
    emoji: items[i % items.length],
    size: 16 + ((i * 7) % 18),
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: `${d.left}%`, top: `${20 + ((i * 53) % 70)}%`, fontSize: d.size }}
          animate={{ y: [0, -18, 0], rotate: [0, 12, -8, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  );
}
