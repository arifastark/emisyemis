"use client";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/data/birthday";
import { PixelButton, FloatingPixels, LogoBadge } from "./pixel-ui";
import { CoquetteBackground } from "./CoquetteBackground";
import { birthdayAudio } from "@/lib/birthday-audio";

export function StageIntro({ onStart }: { onStart: () => void }) {
  const cfg = birthdayConfig.intro;
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <CoquetteBackground preset="intro" />
      <FloatingPixels />
      {/* twinkling star layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 26 }, (_, i) => (
          <span
            key={i}
            className="twinkle absolute text-lg"
            style={{
              left: `${(i * 41 + 7) % 100}%`,
              top: `${(i * 29 + 5) % 100}%`,
              animationDelay: `${(i % 8) * 0.3}s`,
            }}
          >
            {["✦", "✧", "★", "⋆"][i % 4]}
          </span>
        ))}
      </div>

      {/* scattered 20 badges */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {[
          { l: "4%", t: "12%", r: "-12deg", e: "20 🎈" },
          { l: "88%", t: "14%", r: "10deg", e: "🎂 20" },
          { l: "8%", t: "72%", r: "8deg", e: "20 ⭐" },
          { l: "86%", t: "70%", r: "-8deg", e: "💖 20" },
        ].map((b, i) => (
          <motion.span
            key={i}
            className="pixel-font absolute rounded-xl border-4 border-[#3A2B2B] bg-[#FFF6E9] px-3 py-2 text-xs text-[#3A2B2B] shadow-[4px_4px_0_#3A2B2B]"
            style={{ left: b.l, top: b.t, rotate: b.r }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {b.e}
          </motion.span>
        ))}
      </div>

      {/* balloon row */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-6 flex justify-center gap-3 text-3xl md:gap-6 md:text-5xl">
        {["🎈", "🎀", "🎈", "⭐", "🎈", "💖", "🎈"].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.4 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.2 }}
            className="floaty"
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative z-10 mt-10 flex max-w-2xl flex-col items-center"
      >
        <LogoBadge size={124} />
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="pixel-font mt-5 rounded-2xl border-4 border-[#3A2B2B] bg-[#FFF6E9] px-5 py-2 text-[10px] tracking-widest text-[#3A2B2B] shadow-[5px_5px_0_#3A2B2B] md:text-xs"
        >
          🎮 ★ PLAYER 1: {birthdayConfig.friendName} ★ LEVEL 20 UNLOCKED ★
        </motion.div>

        <h1 className="pixel-font mt-6 text-lg text-[#3A2B2B] md:text-3xl" style={{ textShadow: "3px 3px 0 #fff" }}>
          {cfg.titleTop}
        </h1>

        {/* giant pixel 20 */}
        <div className="relative my-2 select-none">
          <motion.div
            className="pixel-font text-[7rem] font-black leading-none md:text-[11rem]"
            style={{
              color: "#FF6B9D",
              WebkitTextStroke: "4px #3A2B2B",
              textShadow: "6px 6px 0 #3A2B2B, 12px 12px 0 rgba(255,107,157,.35)",
              paintOrder: "stroke fill",
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            20
          </motion.div>
          <motion.div
            className="absolute -right-6 -top-2 text-4xl md:-right-10 md:text-6xl"
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎂
          </motion.div>
        </div>

        {/* pixel cake strip */}
        <div className="floaty my-3 text-5xl md:text-6xl" aria-hidden>
          🧁 🎂 🍰 🧁 🎂
        </div>

        <p className="pixel-soft max-w-md text-xl md:text-2xl">{cfg.subtitle}</p>
        <p className="pixel-font mt-2 text-[10px] text-[#8a6a6a] md:text-xs">{cfg.hint}</p>

        {/* main button */}
        <div className="mt-8">
          <PixelButton
            onClick={() => {
              birthdayAudio.unlock();
              birthdayAudio.playGlobalMusic();
              birthdayAudio.fanfare();
              onStart();
            }}
          >
            {cfg.buttonText} ▶
          </PixelButton>
        </div>

      </motion.div>

      {/* bottom deco */}
      <div aria-hidden className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center gap-2 text-2xl md:gap-5 md:text-4xl">
        {["🍰", "💛", "🎁", "⭐", "🎉", "💖", "🧁"].map((e, i) => (
          <motion.span key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 2 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.15 }}>
            {e}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
