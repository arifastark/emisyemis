"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig, quizQuestions } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 5: Quiz — 10 questions, 5 top + 5 bottom ──
function normalize(s: string) {
  return s.toLocaleLowerCase("tr").trim().replace(/\s+/g, " ");
}

function QuizCard({
  index,
  done,
  onDone,
}: {
  index: number;
  done: boolean;
  onDone: () => void;
}) {
  const q = quizQuestions[index];
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [shake, setShake] = useState(0);

  const check = () => {
    if (done) return;
    const v = normalize(value);
    if (!v) {
      setMsg({ ok: false, text: "önce bir şey yaz! 😜" });
      return;
    }
    const correct = q.answers.some((a) => normalize(a) === v || v.includes(normalize(a)));
    if (correct) {
      birthdayAudio.success();
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 }, shapes: ["square"], scalar: 0.9 });
      setMsg({ ok: true, text: "DOĞRU! 🎉 +" });
      onDone();
    } else {
      birthdayAudio.fail();
      setMsg({ ok: false, text: q.incorrectMessage });
      setShake((s) => s + 1);
    }
  };

  return (
    <motion.div
      key={shake}
      animate={msg && !msg.ok && !done ? { x: [0, -8, 8, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className={`pixel-panel relative flex flex-col p-3 md:p-4 ${done ? "opacity-95" : ""}`}
      style={{ background: done ? "#d8f3dc" : "#FFF6E9" }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="pixel-font rounded-md border-2 border-[#3A2B2B] bg-[#FFD93D] px-2 py-1 text-[9px] text-[#3A2B2B]">
          SORU {index + 1}
        </span>
        {done && (
          <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} className="pixel-font rounded-md border-2 border-[#3A2B2B] bg-[#6BCB77] px-2 py-1 text-[9px] text-white">
            ✓ TAMAM!
          </motion.span>
        )}
      </div>
      <p className="pixel-soft mt-2 min-h-12 text-lg leading-snug text-[#3A2B2B] md:text-xl">{q.question}</p>
      {!done ? (
        <div className="mt-2 flex flex-col gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder={q.hint ?? "cevabını yaz…"}
            enterKeyHint="go"
            className="pixel-input pixel-soft w-full px-3 py-2 text-xl"
          />
          <button
            onClick={check}
            className="pixel-font rounded-lg border-[3px] border-[#3A2B2B] bg-[#4D96FF] px-3 py-2 text-[10px] text-white shadow-[3px_3px_0_#3A2B2B] transition active:translate-y-0.5 active:shadow-none"
          >
            KONTROL ET ▶
          </button>
        </div>
      ) : (
        <div className="pixel-soft mt-2 text-lg text-[#2b8a3e]">bravo, bildin! 💛</div>
      )}
      <AnimatePresence>
        {msg && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`pixel-soft mt-2 text-lg leading-tight ${msg.ok || done ? "text-[#2b8a3e]" : "text-[#c2255c]"}`}
          >
            {msg.text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function StageQuiz({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.quiz;
  const [doneSet, setDoneSet] = useState<boolean[]>(() => Array(quizQuestions.length).fill(false));
  const doneCount = doneSet.filter(Boolean).length;

  useEffect(() => {
    birthdayAudio.stopBackground();
  }, []);

  const markDone = (i: number) => {
    const next = doneSet.map((v, j) => (j === i ? true : v));
    setDoneSet(next);
    if (next.every(Boolean)) {
      birthdayAudio.fanfare();
      confetti({ particleCount: 240, spread: 130, origin: { y: 0.5 }, shapes: ["square"] });
    }
  };

  return (
    <StageShell kicker={`🎯 BÖLÜM 4 / 7 — QUIZ • ${doneCount}/10`} title={doneCount === 10 ? cfg.completeTitle : cfg.title} subtitle={doneCount === 10 ? cfg.completeSub : cfg.subtitle}>
      <FloatingPixels items={["🎯", "⭐", "❓", "💡", "🏆"]} />

      {/* arcade scoreboard */}
      <div className="pixel-panel z-10 mb-5 flex w-full max-w-4xl items-center justify-between bg-[#3A2B2B] px-4 py-2">
        <span className="pixel-font text-[10px] text-[#FFD93D] md:text-xs">SKOR: {doneCount * 100}</span>
        <div className="flex gap-1">
          {doneSet.map((d, i) => (
            <span key={i} className="block h-3 w-3 rounded-[4px] border border-black" style={{ background: d ? "#6BCB77" : "#5b4a5e" }} />
          ))}
        </div>
        <span className="pixel-font text-[10px] text-white md:text-xs">{doneCount}/10</span>
      </div>

      {/* upper 5 */}
      <p className="pixel-font z-10 mb-2 text-[10px] text-[#5b4444]">— ÜST BÖLÜM (1-5) —</p>
      <div className="z-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <QuizCard key={i} index={i} done={doneSet[i]} onDone={() => markDone(i)} />
        ))}
        {/* fun filler arcade card on large screens */}
        <div className="pixel-panel hidden flex-col items-center justify-center bg-[#FFD93D] p-4 text-center lg:flex">
          <div className="text-4xl">🕹️</div>
          <p className="pixel-font mt-2 text-[10px] text-[#3A2B2B]">MOLA DOLABI</p>
          <p className="pixel-soft mt-1 text-lg">takılırsan derin nefes al ve en komik cevabı yaz 😌</p>
        </div>
      </div>

      {/* divider */}
      <div className="z-10 my-5 flex w-full max-w-4xl items-center gap-3" aria-hidden>
        <div className="h-1 flex-1 rounded bg-[#3A2B2B]/20" />
        <span className="pixel-font text-[10px] text-[#5b4444]">★ ALT BÖLÜM (6-10) ★</span>
        <div className="h-1 flex-1 rounded bg-[#3A2B2B]/20" />
      </div>

      <div className="z-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[5, 6, 7, 8, 9].map((i) => (
          <QuizCard key={i} index={i} done={doneSet[i]} onDone={() => markDone(i)} />
        ))}
        <PixelPanel className="flex-col items-center justify-center p-4 text-center" color="#FFF6E9">
          <div className="text-4xl">{doneCount === 10 ? "🏆" : "⏳"}</div>
          <p className="pixel-font mt-2 text-[10px] text-[#3A2B2B]">{doneCount === 10 ? "EFSANE OLDUN!" : `${10 - doneCount} SORU KALDI`}</p>
          <p className="pixel-soft mt-1 text-lg">{doneCount === 10 ? "hepsi doğru — alkışlar sana!" : "yapabilirsin, inanıyorum!"}</p>
        </PixelPanel>
      </div>

      {doneCount === 10 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="z-10 mt-6">
          <PixelButton onClick={onNext} color="#6BCB77">
            {cfg.continueText}
          </PixelButton>
        </motion.div>
      )}
    </StageShell>
  );
}
