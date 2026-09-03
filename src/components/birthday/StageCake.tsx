"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 2: Big pixel birthday cake with "20" candles ──
// Interaction: press BLOW OR tap each flame.
// Background music is global (thoseeyes.mp3) — continues across stages.
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

  // Clear pending blow-out timers on unmount (music is global, untouched).
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
                title={blown[i] ? "out!" : "candle"}
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

          {/* cake tiers (pure CSS pixel-art cake) */}
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 12 }}
            className="mt-1 w-full max-w-sm"
          >
            {/* berry topper row */}
            <div className="mx-auto flex w-[92%] items-end justify-between px-2 text-xl md:text-2xl" aria-hidden>
              {["🍓", "🫐", "🍓", "🫐", "🍓"].map((f, i) => (
                <span key={i} className="relative flex flex-col items-center">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                    className="relative z-10"
                  >
                    {f}
                  </motion.span>
                  <span className="z-0 -mt-1 h-2 w-8 rounded-full border-2 border-[#3A2B2B] bg-white" />
                </span>
              ))}
            </div>
            {/* thick glossy vanilla icing cap */}
            <div className="mx-auto w-[92%] rounded-t-xl border-4 border-b-0 border-[#3A2B2B] bg-white px-4 pb-1 pt-3">
              <div className="mx-auto h-2 w-[60%] rounded-full bg-[#FFE9F2]" aria-hidden />
              <div className="mt-1 flex justify-center gap-1.5" aria-hidden>
                {["#FF6B9D", "#4D96FF", "#FFD93D", "#6BCB77", "#9B5DE5", "#FF9F45", "#FF6B9D", "#4D96FF"].map((c, i) => (
                  <span key={i} className="block h-1.5 w-1.5 rounded-[2px] border border-[#3A2B2B]/40" style={{ background: c }} />
                ))}
              </div>
            </div>
            {/* pixel drip edge under icing */}
            <div className="mx-auto flex w-[92%] items-start justify-around border-x-4 border-[#3A2B2B] bg-[#FFF6E9] px-4" aria-hidden>
              {[14, 24, 12, 28, 16, 24, 12, 26, 14, 22].map((h, i) => (
                <span
                  key={i}
                  className="block w-4 border-x-[3px] border-b-[3px] border-[#3A2B2B] bg-white md:w-5"
                  style={{ height: h }}
                />
              ))}
            </div>
            {/* top tier — vanilla with sprinkles */}
            <div className="relative mx-auto w-[92%] border-4 border-b-0 border-t-0 border-[#3A2B2B] bg-[#FFF6E9] px-4 py-3 text-center" style={{ boxShadow: "inset 0 4px 0 rgba(255,255,255,.9), inset 0 -6px 0 rgba(58,43,43,.08)" }}>
              <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
                {[
                  { l: "6%", t: "18%", c: "#FF6B9D" },
                  { l: "14%", t: "62%", c: "#4D96FF" },
                  { l: "24%", t: "30%", c: "#FFD93D" },
                  { l: "76%", t: "26%", c: "#6BCB77" },
                  { l: "86%", t: "60%", c: "#9B5DE5" },
                  { l: "68%", t: "68%", c: "#FF9F45" },
                ].map((s, i) => (
                  <span key={i} className="absolute block h-1.5 w-2.5 rounded-[2px]" style={{ left: s.l, top: s.t, background: s.c }} />
                ))}
              </div>
              <div className="pixel-font relative text-xs text-[#FF6B9D] md:text-sm">★ HAPPY BIRTHDAY ★</div>
              <div className="relative mx-auto mt-1 h-1 w-3/4 rounded-full bg-[#3A2B2B]/10" aria-hidden />
            </div>
            {/* chocolate ganache divider with drips */}
            <div className="relative mx-auto w-[92%] border-4 border-[#3A2B2B] bg-[#5C2E1E] px-2 pb-2 pt-1.5" style={{ boxShadow: "inset 0 3px 0 rgba(255,255,255,.25), inset 0 -4px 0 rgba(0,0,0,.3)" }}>
              <div className="flex justify-around" aria-hidden>
                {[10, 18, 12, 20, 14, 18, 10, 16].map((h, i) => (
                  <span key={i} className="block w-3 rounded-b-[4px] border-x-2 border-b-2 border-[#3A2B2B] bg-[#7A452B] md:w-4" style={{ height: h, boxShadow: "inset -2px 0 0 rgba(0,0,0,.3)" }} />
                ))}
              </div>
              <div className="mt-0.5 flex justify-center gap-1" aria-hidden>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="block h-1 w-1 rounded-full bg-[#FFD93D]/80" />
                ))}
              </div>
            </div>
            {/* middle tier — caramel with toppings */}
            <div className="relative mx-auto w-full border-4 border-t-0 border-[#3A2B2B] bg-[#FF9F45] px-4 pb-3 pt-3 text-center" style={{ boxShadow: "inset 0 4px 0 rgba(255,255,255,.45), inset 0 -8px 0 rgba(0,0,0,.12)" }}>
              <span className="pointer-events-none absolute left-2 top-2 bottom-2 w-2.5 rounded bg-white/40" aria-hidden />
              <span className="pointer-events-none absolute right-2 top-2 bottom-2 w-2.5 rounded bg-black/10" aria-hidden />
              <div className="flex justify-center gap-2 text-2xl" aria-hidden>
                {["🍒", "🍫", "🍒", "🍫", "🍒", "🍫", "🍒"].map((e, i) => (
                  <span key={i} className="rounded-md border-2 border-[#3A2B2B]/20 bg-white/50 px-1">{e}</span>
                ))}
              </div>
              <div className="mt-2 flex justify-center gap-1.5" aria-hidden>
                {["#fff", "#FF6B9D", "#4D96FF", "#fff", "#6BCB77", "#fff", "#FFD93D", "#fff", "#9B5DE5", "#fff"].map((c, i) => (
                  <span key={i} className="block h-1.5 w-1.5 rounded-[2px] border border-[#3A2B2B]/30" style={{ background: c }} />
                ))}
              </div>
            </div>
            {/* strawberry scallop frosting */}
            <div className="mx-auto flex w-full justify-between border-x-4 border-[#3A2B2B] bg-[#FF6B9D] px-1" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="block h-5 w-full border-b-[3px] border-r-[3px] border-[#3A2B2B] bg-[#FFC2D6] last:border-r-0" style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
              ))}
            </div>
            {/* bottom tier — big berry tier with plaque */}
            <div className="relative mx-auto w-full rounded-b-xl border-4 border-t-0 border-[#3A2B2B] bg-[#FF6B9D] px-4 pb-6 pt-4 text-center" style={{ boxShadow: "inset 0 -10px 0 rgba(0,0,0,.14)" }}>
              <span className="pointer-events-none absolute left-3 top-3 bottom-4 w-3 rounded bg-white/35" aria-hidden />
              <span className="pointer-events-none absolute right-3 top-3 bottom-4 w-3 rounded bg-black/15" aria-hidden />
              <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden
                style={{ backgroundImage: "radial-gradient(#fff 2.2px, transparent 2.3px)", backgroundSize: "22px 22px" }}
              />
              <div className="relative mx-auto inline-block rounded-xl border-4 border-[#3A2B2B] bg-[#FFF6E9] px-5 py-2.5" style={{ boxShadow: "4px 4px 0 #3A2B2B" }}>
                <div className="pixel-font text-sm text-[#c2255c] md:text-base" style={{ textShadow: "1px 1px 0 #fff" }}>
                  HAPPY BIRTHDAY • 20 🎉
                </div>
                <div className="mt-1 flex justify-center gap-1" aria-hidden>
                  {["#FF6B9D", "#FFD93D", "#4D96FF", "#6BCB77"].map((c, i) => (
                    <span key={i} className="block h-1.5 w-4 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="pixel-font relative mt-2 text-[9px] text-white/95 md:text-[10px]" style={{ textShadow: "1px 1px 0 #3A2B2B" }}>
                ★ ★ ★
              </div>
            </div>
            {/* double cake board / plate */}
            <div className="relative mx-auto mt-3 w-[110%] -translate-x-[4.5%]">
              <div className="h-5 rounded-full border-4 border-[#3A2B2B] bg-[#FFD93D]" style={{ boxShadow: "inset 0 3px 0 rgba(255,255,255,.7), inset 0 -3px 0 rgba(0,0,0,.15)" }} />
              <div className="mx-auto -mt-1 h-3 w-[92%] rounded-full border-4 border-t-0 border-[#3A2B2B] bg-[#E0A82E]" />
              <div className="absolute -top-2 left-6 flex gap-1.5" aria-hidden>
                <span className="twinkle block h-2 w-2 rounded-[2px] bg-white" />
                <span className="twinkle block h-2 w-2 rounded-[2px] bg-white" style={{ animationDelay: ".6s" }} />
              </div>
              <div className="absolute -top-3 right-8 text-lg" aria-hidden>
                <span className="twinkle">✨</span>
              </div>
            </div>
          </motion.div>

          {/* status */}
          <div className="pixel-font mt-5 min-h-6 text-center text-[10px] text-[#5b4444] md:text-xs">
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
            <div className="mt-3">
              <PixelButton onClick={blowAll} color="#4D96FF">
                {blowing ? "BLOWING… 🌬️" : cfg.blowButtonText}
              </PixelButton>
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
    </StageShell>
  );
}
