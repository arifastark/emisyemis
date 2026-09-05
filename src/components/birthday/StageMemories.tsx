"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig, memories } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

export function StageMemories({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.memories;
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => memories.map((_, i) => i === 0));
  const [dir, setDir] = useState(1);
  const m = memories[idx];
  const finished = seen.every(Boolean);

  const markSeen = (i: number) => setSeen((s) => (s[i] ? s : s.map((v, j) => (j === i ? true : v))));

  const go = (d: number) => {
    birthdayAudio.click();
    const n = (idx + d + memories.length) % memories.length;
    setDir(d);
    setIdx(n);
    markSeen(n);
  };

  const jumpTo = (i: number) => {
    birthdayAudio.click();
    setDir(i > idx ? 1 : -1);
    setIdx(i);
    markSeen(i);
  };

  return (
    <StageShell kicker={`📸 STAGE 5 / 7 — MEMORIES • ${idx + 1}/${memories.length}`} title={cfg.title} subtitle={cfg.subtitle} deco="memories">
      <FloatingPixels items={["📸", "💛", "✨", "🌸"]} />

      {/* filmstrip progress */}
      <div className="no-scrollbar z-10 mb-3 flex w-full max-w-2xl items-center justify-center gap-1.5 overflow-x-auto">
        {memories.map((mm, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border-[3px] transition"
            style={{
              borderColor: i === idx ? "#FF6B9D" : "#3A2B2B",
              transform: i === idx ? "scale(1.15)" : "none",
              opacity: seen[i] || i === idx ? 1 : 0.55,
            }}
            title={mm.caption}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mm.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* main memory card */}
      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: 90 * dir, rotate: 3 * dir, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, x: -90 * dir, rotate: -3 * dir, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <PixelPanel className="relative overflow-hidden p-2.5 md:p-3" color="#FFF6E9">
              {/* tape */}
              <div className="absolute -top-1 left-1/2 z-10 h-5 w-24 -translate-x-1/2 -rotate-2 rounded-sm bg-[#FFD93D]/90 shadow" />
              {/* photo — natural size, never cropped */}
              <div className="pixel-frame relative flex w-full items-center justify-center bg-[#FFD8D8] p-1.5">
                <motion.div
                  key={`zoom-${idx}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex w-full justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.caption} className="h-auto max-h-[32vh] w-auto max-w-full md:max-h-[36vh]" draggable={false} />
                </motion.div>
                {/* sticker only — overlay labels removed */}
                <motion.span
                  className="absolute right-2 top-2 text-2xl md:text-3xl"
                  animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  {m.sticker}
                </motion.span>
                {/* pixel sparkle sweep */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,.5) 50%, transparent 60%)" }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
                />
              </div>
              {/* caption only — date line removed */}
              <div className="px-1 pb-1 pt-2 text-center">
                <p className="pixel-font text-[11px] text-[#3A2B2B] md:text-xs">“{m.caption}”</p>
              </div>
            </PixelPanel>
          </motion.div>
        </AnimatePresence>

        {/* prev / next */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            onClick={() => go(-1)}
            className="pixel-font rounded-xl border-4 border-[#3A2B2B] bg-[#FFF6E9] px-3 py-2.5 text-[11px] text-[#3A2B2B] shadow-[4px_4px_0_#3A2B2B] transition active:translate-y-1 active:shadow-none"
          >
            ← PREV
          </button>
          <p className="pixel-font hidden text-[9px] text-[#8a6a6a] sm:block">{cfg.hint}</p>
          <button
            onClick={() => go(1)}
            className="pixel-font rounded-xl border-4 border-[#3A2B2B] bg-[#FF6B9D] px-3 py-2.5 text-[11px] text-white shadow-[4px_4px_0_#3A2B2B] transition active:translate-y-1 active:shadow-none"
            style={{ textShadow: "1px 1px 0 #3A2B2B" }}
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* continue appears after all seen */}
      <div className="z-10 mt-3 flex min-h-14 flex-col items-center">
        {finished ? (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-2">
            <p className="pixel-font text-[10px] text-[#5b4444]">✨ all memories unlocked ✨</p>
            <PixelButton onClick={onNext} color="#6BCB77">
              {cfg.continueText}
            </PixelButton>
          </motion.div>
        ) : (
          <p className="pixel-font text-[10px] text-[#8a6a6a]">
            {seen.filter(Boolean).length}/{memories.length} memories seen — visit them all 💛
          </p>
        )}
      </div>
    </StageShell>
  );
}
