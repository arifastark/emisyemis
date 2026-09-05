"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import type { ReactNode } from "react";
import { birthdayAudio } from "@/lib/birthday-audio";
import { CoquetteBackground, type DecoPreset } from "./CoquetteBackground";

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
      className={`pixel-font pixel-btn ${small ? "px-4 py-2.5 text-[11px] md:text-xs" : "px-6 py-3 text-xs md:px-8 md:py-3.5 md:text-sm"}`}
      style={{ background: color }}
    >
      {children}
    </motion.button>
  );
}

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

export function LogoBadge({ size = 120 }: { size?: number }) {
  return (
    <motion.span
      className="floaty inline-block overflow-hidden rounded-full border-4 border-[#3A2B2B] bg-[#FFF6E9] shadow-[5px_5px_0_#3A2B2B]"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.06, rotate: -2 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpg"
        alt="birthday logo"
        draggable={false}
        className="h-full w-full select-none object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </motion.span>
  );
}

export function StageShell({
  kicker,
  title,
  subtitle,
  children,
  deco = "generic",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  deco?: DecoPreset;
}) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 pb-10 pt-20 md:pb-12 md:pt-20">
      <CoquetteBackground preset={deco} />
      {/* m-auto = safe vertical centering: boşlukta ortalar, içerik uzunsa kesmeden scroll'a izin verir */}
      <div className="m-auto flex w-full flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-4 w-full text-center"
        >
          <span className="pixel-font inline-block -rotate-2 rounded-lg border-4 border-[#3A2B2B] bg-[#FFD93D] px-3 py-1 text-[9px] tracking-widest text-[#3A2B2B] md:text-[10px]">
            {kicker}
          </span>
          <h2 className="pixel-font mx-auto mt-3 max-w-2xl text-balance text-base leading-tight text-[#3A2B2B] md:text-2xl" style={{ textShadow: "2px 2px 0 #fff" }}>
            {title}
          </h2>
          {subtitle && <p className="pixel-soft mx-auto mt-2 max-w-xl text-balance text-base leading-snug md:text-lg">{subtitle}</p>}
        </motion.div>
        <div className="flex w-full flex-col items-center">{children}</div>
      </div>
    </div>
  );
}

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

export function InteractivePixels({
  items = ["💌", "🌸", "💖", "✨", "🎂", "💕", "🎉", "🍰"],
  count = 22,
}: {
  items?: string[];
  count?: number;
}) {
  const [spots] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: (i * 41 + 13) % 100,
      top: 10 + ((i * 53 + 7) % 78),
      delay: (i % 9) * 0.5,
      dur: 3 + (i % 6) * 0.6,
      size: 18 + ((i * 11) % 22),
    })),
  );
  const [popped, setPopped] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pop = (i: number, e: { clientX: number; clientY: number }) => {
    birthdayAudio.pop();
    confetti({
      particleCount: 25,
      spread: 65,
      startVelocity: 22,
      scalar: 0.7,
      ticks: 120,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      shapes: ["square"],
      colors: ["#FF6B9D", "#FFD93D", "#ffffff", "#FFD8D8"],
    });
    setPopped(i);
    timers.current.push(setTimeout(() => setPopped(null), 450));
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {spots.map((s, i) => (
        <motion.button
          key={i}
          type="button"
          onClick={pop.bind(null, i)}
          onPointerDown={(e) => {
            if (e.pointerType === "touch") pop(i, e);
          }}
          className="pointer-events-auto absolute cursor-pointer select-none"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size, background: "none", border: "none" }}
          animate={
            popped === i
              ? { y: [0, -26], scale: [1, 1.8, 0.4], opacity: [1, 1, 0.4], rotate: [0, 20] }
              : { y: [0, -16, 0], rotate: [0, 10, -8, 0], scale: 1, opacity: 1 }
          }
          transition={
            popped === i
              ? { duration: 0.45, ease: "easeOut" }
              : { duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }
          }
          whileTap={{ scale: 1.4 }}
          aria-label="pop emoji"
        >
          {items[i % items.length]}
        </motion.button>
      ))}
    </div>
  );
}

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
