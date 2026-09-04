"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig, quizQuestions } from "@/data/birthday";
import { PixelButton, StageShell, FloatingPixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 5: Quiz — 5 sual, tək-tək. ──
// Düz → təbrik + avtomatik növbəti. Səhv → doğru cavabı göstər + növbəti.
// Kiçik/böyük hərf fərqi yoxdur, Ə/ə uyğunluğu var.

// Azərbaycan hərflərini qatla ki, "Tənbəl" = "tenbel" = "TENBEL" olsun.
function foldAz(s: string) {
  return s
    .toLocaleLowerCase("az")
    .replaceAll("ə", "e")
    .replaceAll("ğ", "g")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ü", "u")
    .replaceAll("ç", "c")
    .replaceAll("ş", "s");
}

function normalize(s: string) {
  return foldAz(s)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]/g, "");
}

function isCorrect(input: string, answers: string[]) {
  const v = normalize(input);
  if (!v) return false;
  return answers.some((a) => {
    const n = normalize(a);
    if (!n) return false;
    if (v === n) return true;
    // uzun cavablarda (4-cü sual) artıq simvol (... və s.) olsa da qəbul et
    if (n.length > 12 && v.includes(n)) return true;
    return false;
  });
}

export function StageQuiz({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.quiz;
  const total = quizQuestions.length;
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<(boolean | null)[]>(() => Array(total).fill(null));
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [pending, setPending] = useState(false); // son sual cavablandı, mesaj göstərilir
  const [shake, setShake] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = quizQuestions[idx];
  const answeredCount = results.filter((r) => r !== null).length;
  const score = results.filter((r) => r === true).length;
  const finished = answeredCount === total;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // son sualın cavabını neticeye işlə — mesajdan sonra birbaşa finiş
  const commitLast = (correct: boolean) => {
    if (timer.current) clearTimeout(timer.current);
    setResults((prev) => prev.map((r, j) => (j === idx ? correct : r)));
    setPending(false);
    birthdayAudio.fanfare();
    confetti({ particleCount: 240, spread: 130, origin: { y: 0.5 }, shapes: ["square"] });
  };

  const goNext = () => {
    if (timer.current) clearTimeout(timer.current);
    if (idx + 1 >= total) {
      // son sual — NƏTİCƏYƏ BAX basıldısa dərhal neticeye keç
      if (pending) {
        commitLast(isCorrect(value, q.answers));
        return;
      }
      // hamısı cavablandı — fanfar
      birthdayAudio.fanfare();
      confetti({ particleCount: 240, spread: 130, origin: { y: 0.5 }, shapes: ["square"] });
      setResults((prev) => [...prev]);
      return;
    }
    setIdx((i) => i + 1);
    setValue("");
    setMsg(null);
    setRevealed(false);
  };

  const check = () => {
    if (revealed || finished || pending) return;
    const v = value.trim();
    if (!v) {
      setMsg({ ok: false, text: "əvvəlcə nəsə yaz!" });
      setShake((s) => s + 1);
      return;
    }
    const correct = isCorrect(v, q.answers);
    const isLast = idx + 1 >= total;
    if (correct) {
      birthdayAudio.success();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, shapes: ["square"], scalar: 0.9 });
      setMsg({ ok: true, text: q.correctMessage ?? "DÜZGÜN! 🎉" });
      if (isLast) {
        // son sual — mesaj görünsün, sonra avtomatik neticeye
        setRevealed(true);
        setPending(true);
        timer.current = setTimeout(() => commitLast(true), 1800);
        return;
      }
      setResults((prev) => prev.map((r, j) => (j === idx ? true : r)));
      setRevealed(true);
      // düz cavab → qısa fasilədən sonra avtomatik növbəti
      timer.current = setTimeout(() => {
        if (idx + 1 >= total) {
          birthdayAudio.fanfare();
          confetti({ particleCount: 240, spread: 130, origin: { y: 0.5 }, shapes: ["square"] });
        } else {
          setIdx((i) => i + 1);
          setValue("");
          setMsg(null);
          setRevealed(false);
        }
      }, 1400);
    } else {
      birthdayAudio.fail();
      setMsg({ ok: false, text: q.incorrectMessage });
      if (isLast) {
        // son sual — səhv mesajı görünsün, sonra avtomatik neticeye
        setRevealed(true);
        setPending(true);
        setShake((s) => s + 1);
        timer.current = setTimeout(() => commitLast(false), 2400);
        return;
      }
      setResults((prev) => prev.map((r, j) => (j === idx ? false : r)));
      setRevealed(true);
      setShake((s) => s + 1);
      // səhv cavab → doğru cavabı oxusun deyə avtomatik keçmir, düyməni gözləyir
    }
  };

  return (
    <StageShell
      kicker={`🎯 STAGE 4 / 7 — QUIZ • ${finished ? score : answeredCount}/${total}`}
      title={finished ? (score === total ? cfg.completeTitle : `${score}/${total}`) : cfg.title}
      subtitle={finished ? cfg.completeSub : cfg.subtitle}
    >
      <FloatingPixels items={["🎯", "⭐", "❓", "💡", "🏆"]} />

      {/* arcade scoreboard */}
      <div className="pixel-panel z-10 mb-5 flex w-full max-w-2xl items-center justify-between bg-[#3A2B2B] px-4 py-2">
        <span className="pixel-font text-[10px] text-[#FFD93D] md:text-xs">XAL: {score * 100}</span>
        <div className="flex gap-1">
          {results.map((r, i) => (
            <span
              key={i}
              className="block h-3 w-3 rounded-[4px] border border-black"
              style={{ background: r === true ? "#6BCB77" : r === false ? "#FF6B9D" : "#5b4a5e" }}
            />
          ))}
        </div>
        <span className="pixel-font text-[10px] text-white md:text-xs">
          {finished ? score : answeredCount}/{total}
        </span>
      </div>

      {!finished ? (
        <motion.div
          key={`${idx}-${shake}`}
          animate={msg && !msg.ok && revealed ? { x: [0, -8, 8, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="pixel-panel relative z-10 flex w-full max-w-2xl flex-col p-4 md:p-5"
          style={{ background: "#FFF6E9" }}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="pixel-font rounded-md border-2 border-[#3A2B2B] bg-[#FFD93D] px-2 py-1 text-[9px] text-[#3A2B2B]">
              SUAL {idx + 1}/{total}
            </span>
            <span className="pixel-font rounded-md border-2 border-[#3A2B2B] bg-white px-2 py-1 text-[9px] text-[#3A2B2B]">
              ⭐ {score} DÜZ
            </span>
          </div>

          <p className="pixel-soft mt-3 text-xl leading-snug text-[#3A2B2B] md:text-2xl">{q.question}</p>

          {!revealed ? (
            <div className="mt-3 flex flex-col gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && check()}
                placeholder={q.placeholder ?? q.hint ?? "cavabını yaz…"}
                enterKeyHint="go"
                autoFocus
                className="pixel-input pixel-soft w-full px-3 py-2 text-xl"
              />
              <button
                onClick={check}
                className="pixel-font rounded-lg border-[3px] border-[#3A2B2B] bg-[#4D96FF] px-3 py-2 text-[10px] text-white shadow-[3px_3px_0_#3A2B2B] transition active:translate-y-0.5 active:shadow-none"
              >
                YOXLAMAQ ▶
              </button>
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-2">
              <div className="pixel-soft rounded-lg border-2 border-dashed border-[#3A2B2B]/30 bg-white/60 px-3 py-2 text-xl text-[#3A2B2B]/70">
                sənin cavabın: <b>{value}</b>
              </div>
              <button
                onClick={goNext}
                className="pixel-font rounded-lg border-[3px] border-[#3A2B2B] bg-[#6BCB77] px-3 py-2 text-[10px] text-white shadow-[3px_3px_0_#3A2B2B] transition active:translate-y-0.5 active:shadow-none"
              >
                {idx + 1 >= total ? "NƏTİCƏYƏ BAX →" : "NÖVBƏTİ SUAL →"}
              </button>
            </div>
          )}

          <AnimatePresence>
            {msg && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`pixel-soft mt-3 text-xl leading-tight ${msg.ok ? "text-[#2b8a3e]" : "text-[#c2255c]"}`}
              >
                {msg.text}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pixel-panel z-10 flex w-full max-w-2xl flex-col items-center bg-[#FFF6E9] p-6 text-center"
        >
          <div className="text-5xl">{score >= 3 ? "😄" : "🙃"}</div>
          <p className="pixel-font mt-3 text-[10px] text-[#5b4444]">
            NƏTİCƏ: {score}/{total} DÜZ
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {results.map((r, i) => (
              <span
                key={i}
                className="pixel-font rounded-md border-2 border-[#3A2B2B] px-2 py-1 text-[9px]"
                style={{ background: r ? "#6BCB77" : "#FF6B9D", color: "#fff" }}
              >
                {i + 1}: {r ? "DÜZ ✓" : "SƏHV"}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <PixelButton onClick={onNext} color="#6BCB77">
              {cfg.continueText}
            </PixelButton>
          </div>
        </motion.div>
      )}
    </StageShell>
  );
}
