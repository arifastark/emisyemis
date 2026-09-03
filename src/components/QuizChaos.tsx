"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { quizQuestions } from "@/data/quiz";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "./ui";

export default function QuizChaos({ onToast }: { onToast: (m: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const q = quizQuestions[idx];

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 }, colors: ["#6BCB77", "#FFD93D", "#fff"] });
    } else {
      setShakeKey((k) => k + 1);
    }
    setTimeout(() => {
      if (idx + 1 >= quizQuestions.length) { setDone(true); }
      else { setIdx((v) => v + 1); setPicked(null); }
    }, 1400);
  };

  const reset = () => { setIdx(0); setScore(0); setPicked(null); setDone(false); onToast("quiz rebooted. redemption arc starts now."); };
  const rank = [...siteConfig.ranks].reverse().find((r) => score >= r.min)!;

  return (
    <section id="quiz" className="relative mx-auto max-w-2xl px-4 py-24 md:py-32">
      <SectionHeading
        kicker="chapter 05 — quiz chaos 🎯"
        title={<>prove you <span className="text-[#FFD93D]">know us</span></>}
        sub="wrong answers will be mocked lovingly"
        color="#FFD93D"
      />

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 80, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -80, rotate: -2 }}
            className="sticker-card-dark rounded-3xl p-6 md:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display rounded-full bg-[#FFD93D] px-3 py-1 text-xs font-extrabold uppercase text-[#14122b]">
                Q{idx + 1}/{quizQuestions.length}
              </span>
              <span className="font-display text-sm font-bold text-[#FFD93D]">score: {score} ⭐</span>
            </div>
            <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{q.q}</h3>
            <motion.div key={shakeKey} animate={picked !== null && picked !== q.correct ? { x: [0, -12, 12, -8, 8, 0] } : {}} className="mt-5 grid gap-3">
              {q.options.map((opt, i) => {
                const isRight = picked !== null && i === q.correct;
                const isWrongPick = picked === i && i !== q.correct;
                return (
                  <motion.button
                    key={i}
                    whileHover={picked === null ? { scale: 1.02, rotate: i % 2 ? 0.5 : -0.5 } : {}}
                    whileTap={picked === null ? { scale: 0.97 } : {}}
                    onClick={() => answer(i)}
                    className={`rounded-2xl border-[3px] px-4 py-3 text-left font-bold transition ${
                      isRight
                        ? "border-[#14122b] bg-[#6BCB77] text-[#14122b]"
                        : isWrongPick
                          ? "border-[#14122b] bg-[#FF6B9D] text-[#14122b]"
                          : "border-white/25 bg-white/5 text-white hover:border-[#FFD93D] hover:bg-white/10"
                    }`}
                  >
                    {opt} {isRight ? "✓" : isWrongPick ? "✗" : ""}
                  </motion.button>
                );
              })}
            </motion.div>
            <AnimatePresence>
              {picked !== null && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`font-hand mt-4 text-center text-2xl ${picked === q.correct ? "text-[#6BCB77]" : "text-[#FF6B9D]"}`}
                >
                  {picked === q.correct ? q.reaction : q.roast}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sticker-card rounded-3xl p-8 text-center"
          >
            <p className="text-6xl">{score === quizQuestions.length ? "🏆" : score >= 2 ? "🎉" : "🫠"}</p>
            <p className="font-display mt-2 text-sm font-extrabold uppercase tracking-widest text-[#14122b]/50">
              final score: {score}/{quizQuestions.length}
            </p>
            <h3 className="font-display mt-2 text-3xl font-extrabold text-[#14122b] md:text-4xl">{rank.label}</h3>
            <p className="font-hand text-3xl text-[#14122b]/70">{rank.note}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={reset} className="font-display rounded-full border-[3px] border-[#14122b] bg-[#FFD93D] px-6 py-2 font-extrabold text-[#14122b] shadow-[4px_4px_0_#14122b] hover:-translate-y-0.5">
                ↻ retry for glory
              </button>
              <a href="#finale" className="font-display rounded-full border-[3px] border-[#14122b] bg-white px-6 py-2 font-extrabold text-[#14122b] hover:-translate-y-0.5">
                claim prize 💌
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
