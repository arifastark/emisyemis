"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig, wishes } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

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

  const handleNext = () => {
    onNext();
  };

  const blow = (i: number) => {
    if (out[i]) {
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

  const candleColors = [
    "#FF9EBB",
    "#8FCBFF",
    "#A8E6B8",
    "#D3B8FF",
    "#FFCBA8",
  ];

  return (
    <StageShell kicker={`🕯️ STAGE 2 / 7 — 20 WISHES • ${done}/20`} title={done === 20 ? cfg.completeTitle : cfg.title} subtitle={done === 20 ? cfg.completeSub : cfg.subtitle} deco="wishes">
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
            {/* mini candle body — pastel tone, pixel-art stripes */}
            <span
              className="relative mt-1 h-8 w-4 overflow-hidden rounded-sm border-2 border-[#3A2B2B] md:h-10 md:w-5"
              style={{ background: isOut ? "#3a3340" : candleColors[i % candleColors.length] }}
            >
              {!isOut && (
                <>
                  {/* left gloss highlight */}
                  <span className="absolute bottom-0 left-[2px] top-0 w-[3px] rounded-full bg-white/60" aria-hidden />
                  {/* pixel stripes for texture */}
                  <span
                    className="absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 5px, rgba(58,43,43,0.12) 5px, rgba(58,43,43,0.12) 7px)",
                    }}
                  />
                </>
              )}
            </span>
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

      {/* wish reveal card — roomy, readable on desktop + mobile */}
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
              <PixelPanel className="flex min-h-[158px] flex-col justify-center p-5 md:min-h-[150px] md:p-6" color="#FFF6E9">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-4 w-4 shrink-0 rounded-[4px] border-2 border-[#3A2B2B]"
                    style={{ background: candleColors[activeWish % candleColors.length] }}
                    aria-hidden
                  />
                  <p className="pixel-font text-[10px] tracking-wide text-[#FF6B9D] md:text-xs">
                    ✨ WISH #{activeWish + 1} / 20
                  </p>
                </div>
                <p className="pixel-soft mt-3 max-h-[42vh] overflow-y-auto break-words text-[21px] leading-[1.45] text-[#3A2B2B] md:max-h-none md:text-[27px] md:leading-[1.4]">
                  {wishes[activeWish]}
                </p>
                {done < 20 && (
                  <p className="pixel-font mt-3 text-[9px] text-[#8a6a6a] md:text-[10px]">
                    left: {20 - done} candles 🕯️ — keep going!
                  </p>
                )}
              </PixelPanel>
            </motion.div>
          ) : (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PixelPanel className="min-h-[120px] p-5 text-center" color="#FFF6E9">
                <p className="pixel-soft text-[21px] leading-snug md:text-[26px]">tap a candle — a wish hides inside…</p>
              </PixelPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {done === 20 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="z-10 mt-6 flex flex-col items-center gap-3">
          <div className="text-4xl">🎉✨💖✨🎉</div>
          <PixelButton onClick={handleNext} color="#6BCB77">
            {cfg.continueText}
          </PixelButton>
        </motion.div>
      )}
    </StageShell>
  );
}
