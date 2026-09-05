"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

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
  const [blown, setBlown] = useState<boolean[]>([false, false]);
  const [blowing, setBlowing] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

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
    <StageShell kicker="🎂 STAGE 1 / 7 — CAKE" title={allOut ? cfg.blownMessage : cfg.title} subtitle={allOut ? cfg.blownSub : cfg.subtitle} deco="cake">
      <FloatingPixels items={["🎂", "⭐", "💖", "✨", "🕯️"]} />

      {/* pixel-art I LOVE YOU background writings */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {[
          { l: "3%", t: "10%", r: "-12deg", text: "I LOVE YOU" },
          { l: "78%", t: "8%", r: "10deg", text: "I ♥ YOU" },
          { l: "8%", t: "32%", r: "8deg", text: "I ♥ YOU" },
          { l: "84%", t: "30%", r: "-8deg", text: "I LOVE YOU" },
          { l: "2%", t: "58%", r: "-6deg", text: "LOVE YOU" },
          { l: "88%", t: "56%", r: "12deg", text: "LOVE YOU" },
          { l: "6%", t: "82%", r: "10deg", text: "I LOVE YOU" },
          { l: "74%", t: "84%", r: "-10deg", text: "I ♥ YOU" },
          { l: "38%", t: "4%", r: "0deg", text: "I LOVE YOU" },
          { l: "44%", t: "92%", r: "-4deg", text: "I LOVE YOU" },
        ].map((w, i) => (
          <span
            key={i}
            className="pixel-font floaty absolute text-xs whitespace-nowrap md:text-sm"
            style={{
              left: w.l,
              top: w.t,
              transform: `rotate(${w.r})`,
              color: "#fff",
              textShadow: "2px 2px 0 #3A2B2B",
              opacity: 0.75,
              animationDelay: `${(i % 5) * 0.5}s`,
            }}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* dim room when lit, bright party when blown */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 transition-colors duration-1000"
        style={{ background: allOut ? "radial-gradient(circle at 50% 40%, rgba(255,217,61,.35), transparent 65%)" : "rgba(58,30,60,.22)" }}
      />

      <PixelPanel className="relative z-10 w-full max-w-xl p-4 md:p-5">
        {/* ── pixel cake ── */}
        <div className="flex flex-col items-center">
          {/* number candles 2 + 0 — interactive, stays on top of cake.png */}
          <div className="relative z-10 -mb-8 flex items-end gap-5 md:-mb-10 md:gap-8">
            {(["2", "0"] as const).map((digit, i) => (
              <button
                key={digit}
                onClick={() => blowOne(i)}
                title={blown[i] ? "out!" : "candle"}
                className="flex cursor-pointer flex-col items-center outline-none"
              >
                {/* flame / smoke */}
                <span className="flex h-9 items-end justify-center md:h-10">
                  {!blown[i] ? (
                    <motion.span
                      className={`flame text-2xl md:text-3xl ${blowing ? "scale-125" : ""}`}
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
                  className="pixel-font flex h-16 w-12 items-center justify-center rounded-lg border-4 border-[#3A2B2B] text-3xl md:h-18 md:w-14 md:text-4xl"
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
                <span className="mt-1 h-6 w-2 rounded bg-[#3A2B2B]/70" />
              </button>
            ))}
          </div>

          {/* cake image — user provided cake.png, 20 candles stay interactive on top */}
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 12 }}
            className="mt-1 w-full max-w-[240px] md:max-w-xs"
          >
            <img
              src="/cake.png"
              alt="Pink strawberry birthday cake"
              className="h-auto w-full select-none"
              style={{ imageRendering: "pixelated" }}
              draggable={false}
            />
          </motion.div>

          {/* status */}
          <div className="pixel-font mt-3 min-h-5 text-center text-[10px] text-[#5b4444] md:text-[11px]">
            {!allOut ? (
              <span>
                {blown.filter(Boolean).length}/2 candles out{blowing ? " — bloooow… 🌬️" : ""}
              </span>
            ) : (
              <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-[#c2255c]">
                ✨ wish granted ✨
              </motion.span>
            )}
          </div>

          {/* blow button */}
          {!allOut ? (
            <div className="mt-2">
              <PixelButton onClick={blowAll} color="#4D96FF">
                {blowing ? "BLOWING… 🌬️" : cfg.blowButtonText}
              </PixelButton>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex flex-col items-center gap-2">
                <div className="text-3xl">🎉💖🎂💖🎉</div>
                <PixelButton onClick={onNext} color="#6BCB77">
                  {cfg.continueText}
                </PixelButton>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </PixelPanel>
    </StageShell>
  );
}
