"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";

export default function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [cracking, setCracking] = useState(false);
  const [opened, setOpened] = useState(false);

  const breakSeal = () => {
    if (cracking) return;
    setCracking(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, colors: ["#FFD93D", "#FF6B9D", "#fff"] });
    setTimeout(() => {
      setOpened(true);
      setTimeout(() => {
        confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 }, colors: ["#FFD93D", "#FF6B9D", "#6BCB77", "#4D96FF", "#fff"] });
        onOpen();
      }, 900);
    }, 700);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#FFD8D8] p-4"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff_0%,#FFD8D8_65%)]" />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: -120, rotate: -4, opacity: 0 }}
            className="relative w-full max-w-md text-center"
          >
            <p className="font-display mb-3 inline-block rounded-full border-2 border-[#FFD93D]/60 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFD93D]">
              {siteConfig.codename}
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-[#FFF6E9] md:text-5xl">
              psst… {siteConfig.friendName}.
              <br />
              <span className="font-hand font-medium text-[#FFD93D]">this is for you.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xs text-sm text-white/60">
              One envelope. Seven chapters. Zero chill. Tap the seal to break it.
            </p>

            {/* envelope */}
            <motion.button
              onClick={breakSeal}
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              animate={cracking ? { x: [0, -8, 8, -5, 5, 0], rotate: [0, -2, 2, -1, 1, 0] } : { y: [0, -8, 0] }}
              transition={cracking ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="group relative mx-auto mt-8 block w-full max-w-sm cursor-pointer"
              aria-label="Break the seal"
            >
              <div className="sticker-card relative overflow-hidden rounded-2xl p-2">
                <div className="rounded-xl bg-[#1b1840] p-6 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[11px] font-extrabold uppercase tracking-widest text-white/50">
                      ✉ sealed with love + chaos
                    </span>
                    <span className="text-xl">💌</span>
                  </div>
                  <p className="font-hand mt-4 text-3xl leading-tight text-[#FFF6E9]">
                    “to the human who laughs before the punchline…”
                  </p>
                  <p className="mt-2 text-xs text-white/50">from: {siteConfig.envelopeFrom}</p>
                </div>
                {/* wax seal */}
                <motion.div
                  animate={cracking ? { scale: [1, 1.4, 0], rotate: [0, 40, 90], opacity: [1, 1, 0] } : { scale: [1, 1.08, 1] }}
                  transition={cracking ? { duration: 0.5 } : { duration: 2, repeat: Infinity }}
                  className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#a4133c] bg-[#ff4d6d] text-center shadow-[0_8px_0_#800f2f]"
                >
                  <span className="font-display text-xs font-extrabold leading-tight text-white">
                    BREAK
                    <br />
                    ME ♥
                  </span>
                </motion.div>
              </div>
              <p className="font-display mt-4 animate-pulse text-sm font-bold uppercase tracking-widest text-[#FFD93D]">
                {cracking ? "cracking it open…" : "👆 tap the seal 👆"}
              </p>
            </motion.button>

            <p className="mt-6 text-[11px] uppercase tracking-widest text-white/30">{siteConfig.envelopeWarning}</p>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="font-hand text-5xl text-[#FFD93D]">unsealing…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
