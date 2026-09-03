"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig, wishes } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 3: 20 candles / 20 wishes ──
function celebrateWishes() {
  birthdayAudio.fanfare();
  const colors = ["#FF6B9D", "#FFD93D", "#6BCB77", "#4D96FF", "#9B5DE5", "#ffffff"];
  confetti({ particleCount: 250, spread: 130, origin: { y: 0.5 }, shapes: ["square"], colors });
  const end = Date.now() + 2000;
  const frame = () => {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, shapes: ["square"], colors });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, shapes: ["square"], colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function StageWishes({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.wishes;
  const [out, setOut] = useState<boolean[]>(() => Array(20).fill(false));
  const [activeWish, setActiveWish] = useState<number | null>(null);

  const done = useMemo(() => out.filter(Boolean).length, [out]);

  useEffect(() => {
    void birthdayAudio.playBackground("birthday", cfg.musicSrc);
  }, [cfg.musicSrc]);

  const blow = (i: number) => {
    if (out[i]) {
      // re-open already-read wish
      setActiveWish(i);
      birthdayAudio.click();
      return;
    }
    birthdayAudio.blow();
    const next = out.map((v, j) => (j === i ? true : v));
    setOut(next);
    setActiveWish(i);
    confetti({
      particleCount: 26,
      spread: 60,
      startVelocity: 28,
      origin: { y: 0.55 },
      shapes: ["square"],
      scalar: 0.85,
      colors: ["#FFD93D", "#FF6B9D", "#ffffff"],
    });
    if (done + 1 < 20) {
      setTimeout(() => birthdayAudio.pop(), 250);
    } else {
      celebrateWishes();
    }
  };

  const candleColors = ["#FF6B9D", "#4D96FF", "#6BCB77", "#9B5DE5", "#FF9F45"];

  return (
    <StageShell kicker={`🕯️ STAGE 2 / 7 — 20 WISHES • ${done}/20`} title={done === 20 ? cfg.completeTitle : cfg.title} subtitle={done === 20 ? cfg.completeSub : cfg.subtitle}>
      <FloatingPixels items={["🕯️", "✨", "💖", "⭐"]} />

      {/* progress bar */}
      <div className="z-10 mb-4 w-full max-w-2xl">
        <div className="h-5 overflow-hidden rounded-full border-[3px] border-[#3A2B2B] bg-[#FFF6E9]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#FF6B9D,#FFD93D)" }}
            animate={{ width: `${(done / 20) * 100}%` }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          />
        </div>
        <p className="pixel-font mt-1 text-center text-[10px] text-[#5b4444]">{done}/20 candles out</p>
      </div>

      {/* candle grid — responsive */}
      <div className="z-10 grid w-full max-w-2xl grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
        {out.map((isOut, i) => (
          <motion.button
            key={i}
            onClick={() => blow(i)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            className={`pixel-panel relative flex flex-col items-center px-1 py-2 transition md:py-3 ${
              isOut ? "opacity-90" : ""
            }`}
            style={{
              background: isOut ? "#5b4a5e" : "#FFF6E9",
              borderColor: "#3A2B2B",
            }}
            title={isOut ? `Wish ${i + 1} (read again)` : `Candle ${i + 1} — tap to blow out`}
          >
            <span className="pixel-font text-[9px] md:text-[10px]" style={{ color: isOut ? "#FFD93D" : "#3A2B2B" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex h-9 items-end md:h-10">
              {!isOut ? (
                <span className="flame text-2xl md:text-3xl">🕯️</span>
              ) : (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl md:text-3xl">
                  💨
                </motion.span>
              )}
            </span>
            {/* mini candle body */}
            <span
              className="mt-1 h-8 w-3 rounded-sm border-2 border-[#3A2B2B] md:h-10 md:w-4"
              style={{ background: isOut ? "#3a3340" : candleColors[i % candleColors.length] }}
            />
            {isOut && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#3A2B2B] bg-[#6BCB77] text-xs"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      {/* wish reveal card */}
      <div className="z-10 mt-5 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {activeWish !== null ? (
            <motion.div
              key={activeWish}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            >
              <PixelPanel className="p-4 md:p-5" color="#FFF6E9">
                <p className="pixel-font text-[10px] text-[#FF6B9D] md:text-xs">✨ WISH #{activeWish + 1} / 20</p>
                <p className="pixel-soft mt-2 text-xl leading-snug text-[#3A2B2B] md:text-2xl">{wishes[activeWish]}</p>
                {done < 20 && (
                  <p className="pixel-font mt-3 text-[9px] text-[#8a6a6a]">left: {20 - done} candles 🕯️ — keep going!</p>
                )}
              </PixelPanel>
            </motion.div>
          ) : (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PixelPanel className="p-4 text-center" color="#FFF6E9">
                <p className="pixel-soft text-xl md:text-2xl">👆 tap a candle — a wish hides inside…</p>
              </PixelPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {done === 20 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="z-10 mt-6 flex flex-col items-center gap-3">
          <div className="text-4xl">🎉✨💖✨🎉</div>
          <PixelButton onClick={onNext} color="#6BCB77">
            {cfg.continueText}
          </PixelButton>
        </motion.div>
      )}
    </StageShell>
  );
}
