"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 2: Big pixel birthday cake with "20" candles ──
// Interaction: press BLOW OR tap each flame. No mic required.
function celebrateCake() {
  birthdayAudio.fanfare();
  const end = Date.now() + 1600;
  const frame = () => {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, shapes: ["square"], colors: ["#FF6B9D", "#FFD93D", "#fff"] });
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, shapes: ["square"], colors: ["#FF6B9D", "#FFD93D", "#fff"] });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
  confetti({ particleCount: 160, spread: 110, origin: { y: 0.5 }, shapes: ["square"] });
}

export function StageCake({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.cake;
  const [blown, setBlown] = useState<boolean[]>([false, false]); // [candle "2", candle "0"]
  const [blowing, setBlowing] = useState(false);
  const timers = useRef<number[]>([]);

  // start Happy Birthday loop on mount (already unlocked by intro click)
  useEffect(() => {
    void birthdayAudio.playBackground("birthday", cfg.musicSrc);
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, [cfg.musicSrc]);

  const allOut = blown.every(Boolean);

  const blowOne = (idx: number) => {
    if (blown[idx]) return;
    birthdayAudio.blow();
    const next = blown.map((v, i) => (i === idx ? true : v));
    setBlown(next);
    confetti({ particleCount: 22, spread: 50, origin: { y: 0.4 }, shapes: ["square"], scalar: 0.8 });
    if (next.every(Boolean)) celebrateCake();
  };

  const blowAll = () => {
    if (blowing || allOut) return;
    setBlowing(true);
    birthdayAudio.blow();
    // staggered extinguish = satisfying (explicit states avoid stale closures)
    timers.current.push(
      window.setTimeout(() => {
        setBlown([true, false]);
        confetti({ particleCount: 22, spread: 50, origin: { y: 0.4 }, shapes: ["square"], scalar: 0.8 });
      }, 350),
    );
    timers.current.push(
      window.setTimeout(() => {
        setBlown([true, true]);
        confetti({ particleCount: 22, spread: 50, origin: { y: 0.4 }, shapes: ["square"], scalar: 0.8 });
        celebrateCake();
      }, 800),
    );
    timers.current.push(window.setTimeout(() => setBlowing(false), 1200));
  };

  return (
    <StageShell kicker="🎂 STAGE 1 / 7 — CAKE" title={allOut ? cfg.blownMessage : cfg.title} subtitle={allOut ? cfg.blownSub : cfg.subtitle}>
      <FloatingPixels items={["🎂", "⭐", "💖", "✨", "🕯️"]} />

      {/* dim room when lit, bright party when blown */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 transition-colors duration-1000"
        style={{ background: allOut ? "radial-gradient(circle at 50% 40%, rgba(255,217,61,.35), transparent 65%)" : "rgba(58,30,60,.22)" }}
      />

      <PixelPanel className="relative z-10 w-full max-w-xl p-5 md:p-8">
        {/* ── pixel cake ── */}
        <div className="flex flex-col items-center">
          {/* number candles 2 + 0 */}
          <div className="flex items-end gap-6 md:gap-10">
            {(["2", "0"] as const).map((digit, i) => (
              <button
                key={digit}
                onClick={() => blowOne(i)}
                title={blown[i] ? "out!" : "tap to blow out"}
                className="flex cursor-pointer flex-col items-center outline-none"
              >
                {/* flame / smoke */}
                <span className="flex h-12 items-end justify-center md:h-14">
                  {!blown[i] ? (
                    <motion.span
                      className={`flame text-3xl md:text-4xl ${blowing ? "scale-125" : ""}`}
                      animate={blowing ? { x: [0, 6, -6, 0], opacity: [1, 0.6, 1] } : {}}
                    >
                      🔥
                    </motion.span>
                  ) : (
                    <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: -6 }} className="text-2xl opacity-70">
                      💨
                    </motion.span>
                  )}
                </span>
                {/* digit candle body */}
                <motion.span
                  className="pixel-font flex h-20 w-14 items-center justify-center rounded-lg border-4 border-[#3A2B2B] text-4xl md:h-24 md:w-16 md:text-5xl"
                  style={{
                    background: i === 0 ? "#4D96FF" : "#FF6B9D",
                    color: "#fff",
                    textShadow: "2px 2px 0 #3A2B2B",
                    boxShadow: "4px 4px 0 #3A2B2B",
                    opacity: blown[i] ? 0.85 : 1,
                  }}
                  animate={!blown[i] ? { rotate: [-1.5, 1.5, -1.5] } : { rotate: 0 }}
                  transition={{ duration: 1.6, repeat: blown[i] ? 0 : Infinity }}
                >
                  {digit}
                </motion.span>
                <span className="mt-1 h-8 w-2 rounded bg-[#3A2B2B]/70" />
              </button>
            ))}
          </div>

          {/* cake tiers (pure CSS pixel cake) */}
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 12 }}
            className="mt-1 w-full max-w-sm"
          >
            {/* icing drips */}
            <div className="mx-auto flex w-[92%] justify-between px-2 text-xl md:text-2xl" aria-hidden>
              {["🍓", "🫐", "🍓", "🫐", "🍓"].map((f, i) => (
                <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}>
                  {f}
                </motion.span>
              ))}
            </div>
            {/* top tier */}
            <div className="mx-auto w-[92%] rounded-t-xl border-4 border-b-0 border-[#3A2B2B] bg-[#FFF6E9] px-4 py-3 text-center">
              <div className="pixel-font text-xs text-[#FF6B9D] md:text-sm">★ HAPPY BIRTHDAY ★</div>
            </div>
            {/* middle tier */}
            <div className="mx-auto w-full border-4 border-[#3A2B2B] bg-[#FF9F45] px-4 py-4 text-center" style={{ boxShadow: "inset 0 -8px 0 rgba(0,0,0,.12)" }}>
              <div className="flex justify-center gap-2 text-2xl" aria-hidden>
                {["🍒", "🍫", "🍒", "🍫", "🍒", "🍫", "🍒"].map((e, i) => (
                  <span key={i}>{e}</span>
                ))}
              </div>
            </div>
            {/* bottom tier */}
            <div className="mx-auto w-full rounded-b-xl border-4 border-t-0 border-[#3A2B2B] bg-[#FF6B9D] px-4 py-5 text-center">
              <div className="pixel-font text-sm text-white md:text-base" style={{ textShadow: "2px 2px 0 #3A2B2B" }}>
                HAPPY BIRTHDAY • 20 🎉
              </div>
            </div>
            {/* plate */}
            <div className="mx-auto mt-2 h-4 w-[110%] -translate-x-[4.5%] rounded-full border-4 border-[#3A2B2B] bg-[#FFD93D]" />
          </motion.div>

          {/* status */}
          <div className="pixel-font mt-5 min-h-6 text-center text-[10px] text-[#5b4444] md:text-xs">
            {!allOut ? (
              <span>
                {blown.filter(Boolean).length}/2 candles out — {blowing ? "bloooow… 🌬️" : "tap the candles or press the button below!"}
              </span>
            ) : (
              <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-[#c2255c]">
                ✨ wish granted ✨
              </motion.span>
            )}
          </div>

          {/* blow button */}
          {!allOut ? (
            <div className="mt-3">
              <PixelButton onClick={blowAll} color="#4D96FF">
                {blowing ? "BLOWING… 🌬️" : cfg.blowButtonText}
              </PixelButton>
              <p className="pixel-font mt-3 text-center text-[9px] text-[#8a6a6a]">🎙️ no mic needed — just tap!</p>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col items-center gap-3">
                <div className="text-4xl">🎉💖🎂💖🎉</div>
                <PixelButton onClick={onNext} color="#6BCB77">
                  {cfg.continueText}
                </PixelButton>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </PixelPanel>

      <p className="pixel-font mt-4 text-center text-[9px] text-[#8a6a6a] md:text-[10px]">🎵 happy birthday is playing • mute it with the button at the bottom right</p>
    </StageShell>
  );
}
