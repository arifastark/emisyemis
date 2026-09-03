"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig, finalLetter } from "@/data/birthday";
import { PixelButton, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 7: envelope → letter ──
export function StageLetter({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.letter;
  const [open, setOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [read, setRead] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    birthdayAudio.stopBackground();
  }, []);

  const openEnvelope = () => {
    if (open) return;
    birthdayAudio.unlock();
    birthdayAudio.success();
    setOpen(true);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 }, shapes: ["square"] });
    setTimeout(() => {
      setShowLetter(true);
      birthdayAudio.fanfare();
      confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 }, shapes: ["square"] });
    }, 900);
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || read) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      setRead(true);
      birthdayAudio.pop();
    }
  };

  return (
    <StageShell kicker="💌 STAGE 6 / 7 — FINAL LETTER" title={cfg.title} subtitle={cfg.subtitle}>
      <FloatingPixels items={["💌", "💖", "✨", "🌸", "💛"]} />

      {/* envelope */}
      <AnimatePresence mode="wait">
        {!showLetter ? (
          <motion.button
            key="env"
            onClick={openEnvelope}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 mx-auto w-full max-w-sm cursor-pointer outline-none"
            title="tap to open"
          >
            {/* glow */}
            <motion.div
              className="absolute -inset-4 rounded-3xl bg-[#FFD93D]/50 blur-xl"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="pixel-panel relative overflow-hidden bg-[#FFF6E9] p-6 pb-8">
              {/* stamp */}
              <div className="absolute right-3 top-3 rotate-6 rounded-md border-[3px] border-dashed border-[#FF6B9D] bg-white px-2 py-1 text-center">
                <div className="text-2xl">🎂</div>
                <div className="pixel-font text-[7px] text-[#FF6B9D]">AGE 20<br />SPECIAL</div>
              </div>
              {/* envelope body */}
              <div className="relative mx-auto mt-8 h-44 overflow-hidden rounded-xl border-4 border-[#3A2B2B] bg-[#FFC9D6]">
                {/* letter peeking */}
                <motion.div
                  className="absolute left-1/2 top-3 h-28 w-3/4 -translate-x-1/2 rounded-md border-[3px] border-[#3A2B2B] bg-white"
                  animate={open ? { y: -70, opacity: 1 } : { y: 10 }}
                  transition={{ type: "spring", stiffness: 90, damping: 14 }}
                >
                  <div className="pixel-font p-2 text-center text-[8px] text-[#3A2B2B]">I have a letter for you… 💖</div>
                </motion.div>
                {/* flap */}
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top border-b-4 border-[#3A2B2B]"
                  style={{
                    height: 90,
                    background: "#FF8FAB",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={open ? { rotateX: 180, opacity: 0.4 } : { rotateX: 0 }}
                  transition={{ duration: 0.7 }}
                />
                {/* wax seal */}
                {!open && (
                  <motion.div
                    className="absolute left-1/2 top-[74px] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#3A2B2B] bg-[#c2255c] text-2xl text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    ♥
                  </motion.div>
                )}
              </div>
              <p className="pixel-font mt-5 animate-bounce text-[10px] text-[#c2255c] md:text-xs">{cfg.envelopeHint}</p>
              <p className="pixel-soft mt-1 text-lg">one giant envelope • one tiny heart • one super long letter</p>
            </div>
          </motion.button>
        ) : (
          /* letter */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="relative z-10 w-full max-w-2xl"
          >
            <div className="pixel-paper relative">
              <div className="border-b-[3px] border-dashed border-[#3A2B2B]/30 px-5 pb-3 pt-5 text-center md:px-8">
                <div className="text-3xl">💖</div>
                <h3 className="pixel-font mt-2 text-xs text-[#3A2B2B] md:text-sm">{finalLetter.greeting}</h3>
              </div>
              <div
                ref={scrollRef}
                onScroll={onScroll}
                className="max-h-[46dvh] min-h-56 overflow-y-auto px-5 py-4 md:max-h-[52dvh] md:px-8"
              >
                {finalLetter.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.35 }}
                    className="pixel-soft mb-4 text-xl leading-snug text-[#3A2B2B] md:text-2xl"
                  >
                    {p}
                  </motion.p>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + finalLetter.paragraphs.length * 0.35 }}
                  className="pixel-font mt-6 text-right text-[10px] text-[#c2255c] md:text-xs"
                >
                  {finalLetter.sign}
                </motion.p>
                <div className="pb-2 text-center text-2xl">🌸 💛 🌸</div>
              </div>
              {!read && (
                <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-center">
                  <span className="pixel-font animate-bounce rounded-full border-[3px] border-[#3A2B2B] bg-[#FFD93D] px-3 py-1 text-[9px] text-[#3A2B2B]">
                    ↓ scroll to the very end ↓
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 flex min-h-16 flex-col items-center">
              {read ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <PixelButton onClick={onNext} color="#FF6B9D">
                    {cfg.continueText}
                  </PixelButton>
                </motion.div>
              ) : (
                <p className="pixel-font text-[10px] text-[#8a6a6a]">read the letter to the very end 💛 ({finalLetter.paragraphs.length} paragraphs)</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </StageShell>
  );
}
