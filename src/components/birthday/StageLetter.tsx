"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig, friendMessages } from "@/data/birthday";
import { PixelButton, StageShell, InteractivePixels } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── STAGE 7: birthday messages for Elmira ──
// Bej + pembe, sitenin düzenine uygun — telefon görseli yok,
// mesajlar doğrudan ekranda kartlar halinde akar.
// Edit names/texts in `friendMessages` (src/data/birthday.ts).
// Background music is global (thoseeyes.mp3) — keeps playing.
const NAME_COLORS = ["#FF6B9D", "#D94F70", "#B76E79", "#8A5A5A", "#C99A2B", "#9B5DE5"];
// Sıra: önce altta "X is typing…" balonu → sonra mesaj bir anda gelir →
// okuma molası (uzunluğa göre) → sıradaki kişi.
const readMsFor = (text: string) => Math.min(15000, Math.max(3500, 2200 + text.length * 28));
// Tek tip ritim: TÜM mesaj aralıkları Günel→Aysu aralığı kadar (5700ms).
// Typing her mesajdan 0.8sn sonra belirir, sıradaki mesaja kadar kalır → her typing ~4.9sn görünür.
const UNIFORM_GAP_MS = readMsFor(friendMessages[2].text); // Günel'in okuma molası = 5700
const NEXT_BEAT_MS = 800;

export function StageLetter({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.letter;
  const [count, setCount] = useState(0);
  const [announce, setAnnounce] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finished = count >= friendMessages.length;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const celebrate = () => {
    birthdayAudio.fanfare();
    confetti({ particleCount: 160, spread: 110, origin: { y: 0.5 }, shapes: ["square"] });
  };

  // Tek tip ritim: her mesajdan 0.8sn sonra altta "X is typing…" belirir,
  // sıradaki mesaj tam UNIFORM_GAP_MS sonra gelir. `start` indeksinden başlar.
  const playFrom = (start: number) => {
    clearTimers();
    setAnnounce(null);
    setCount(start);
    // ilk typing sahne giriş animasyonu (0.35sn) bitince gelsin ki Nərmininki de net görünsün
    let t = 1100;
    let lastAppeared = t - UNIFORM_GAP_MS + NEXT_BEAT_MS;
    for (let i = start; i < friendMessages.length; i++) {
      const at = i === start ? t : lastAppeared + NEXT_BEAT_MS;
      timers.current.push(setTimeout(() => setAnnounce(i), at));
      const appearAt = i === start ? at + (UNIFORM_GAP_MS - NEXT_BEAT_MS) : lastAppeared + UNIFORM_GAP_MS;
      timers.current.push(
        setTimeout(() => {
          setAnnounce(null);
          setCount(i + 1);
          birthdayAudio.pop();
        }, appearAt),
      );
      lastAppeared = appearAt;
    }
    const lastText = friendMessages[friendMessages.length - 1].text;
    timers.current.push(setTimeout(celebrate, lastAppeared + readMsFor(lastText) + 400));
  };

  useEffect(() => {
    playFrom(0);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // always follow the newest bubble (page scroll, since chat is directly on screen)
  useEffect(() => {
    const el = scrollRef.current;
    const last = el?.lastElementChild as HTMLElement | null | undefined;
    if (last) last.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [count, announce]);

  const skip = () => {
    birthdayAudio.click();
    clearTimers();
    setAnnounce(null);
    setCount(friendMessages.length);
    celebrate();
  };

  const replay = () => {
    birthdayAudio.click();
    setAnnounce(null);
    setCount(0);
    playFrom(0);
  };

  return (
    <StageShell kicker="💌 STAGE 6 / 7 — BIRTHDAY MESSAGES" title={cfg.title} subtitle={cfg.subtitle}>
      <InteractivePixels
        items={["💌", "🌸", "💖", "✨", "🎂", "💕", "🎉", "🍰", "💝", "🌷", "⭐", "💗"]}
        count={22}
      />

      {/* başlık kartı — bej zemin, pembe vurgu */}
      <div className="pixel-panel z-10 w-full max-w-2xl bg-[#FFF6E9] px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#3A2B2B] bg-[#FF6B9D] text-2xl shadow-[3px_3px_0_#3A2B2B]">
            💌
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="pixel-font truncate text-[11px] text-[#3A2B2B] md:text-xs">{cfg.groupName}</p>
            <p className="pixel-soft truncate text-lg leading-tight md:text-xl">
              {announce !== null ? `${friendMessages[announce].name} is typing… ✍️` : cfg.groupSub}
            </p>
          </div>
          {!finished ? (
            <button
              onClick={skip}
              className="pixel-font shrink-0 rounded-xl border-[3px] border-[#3A2B2B] bg-[#FFD93D] px-3 py-2 text-[9px] text-[#3A2B2B] shadow-[3px_3px_0_#3A2B2B] transition active:translate-y-0.5 active:shadow-none"
            >
              SKIP ▸▸
            </button>
          ) : (
            <button
              onClick={replay}
              title="mesajları tekrar oynat"
              className="pixel-font flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#3A2B2B] bg-[#FFD93D] text-base text-[#3A2B2B] shadow-[3px_3px_0_#3A2B2B] transition active:translate-y-0.5 active:shadow-none"
            >
              ↻
            </button>
          )}
        </div>
        <div className="pixel-soft mt-2 rounded-xl border-2 border-dashed border-[#FF6B9D]/50 bg-[#FFD8D8]/40 px-3 py-1.5 text-center text-lg leading-snug">
          {cfg.notice}
        </div>
      </div>

      {/* mesajlar — WP balonu şeklinde, telefon çerçevesiz, doğrudan ekranda */}
      <div ref={scrollRef} className="z-10 mt-4 flex w-full max-w-2xl flex-col gap-3">
        <p className="pixel-font mx-auto rounded-lg border-[3px] border-[#3A2B2B] bg-[#FFD93D] px-3 py-1 text-[8px] text-[#3A2B2B] shadow-[3px_3px_0_#3A2B2B]">
          🎂 TODAY • {count}/{friendMessages.length}
        </p>

        {friendMessages.slice(0, count).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative max-w-[88%] self-start rounded-2xl rounded-tl-[4px] border-[3px] border-[#3A2B2B] bg-[#FFF6E9] px-4 pb-2 pt-2.5 text-left shadow-[4px_4px_0_#3A2B2B] md:max-w-[80%]"
          >
            {/* balon kuyruğu */}
            <span
              aria-hidden
              className="absolute -left-[11px] top-[14px] h-4 w-4 rotate-45 border-b-[3px] border-l-[3px] border-[#3A2B2B] bg-[#FFF6E9]"
            />
            <div className="flex items-center gap-2">
              <span
                className="pixel-soft text-[22px] font-bold leading-none md:text-[24px]"
                style={{ color: NAME_COLORS[i % NAME_COLORS.length] }}
              >
                {m.name}
              </span>
              {m.time && <span className="pixel-font ml-auto pl-4 text-[8px] text-[#8a6a6a]">{m.time}</span>}
            </div>
            <p className="pixel-soft mt-1 break-words whitespace-pre-line text-[22px] leading-[1.4] text-[#3A2B2B] md:text-[24px]">
              {m.text}
            </p>
          </motion.div>
        ))}

        {/* altta "X is typing…" balonu — sıradaki kişi yazmadan önce */}
        {announce !== null && (
          <motion.div
            key={`announce-${announce}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex w-fit max-w-[70%] items-center gap-2 self-start rounded-2xl rounded-tl-[4px] border-[3px] border-[#3A2B2B] bg-[#FFD8D8] px-4 py-3 shadow-[4px_4px_0_#3A2B2B]"
          >
            <span
              aria-hidden
              className="absolute -left-[11px] top-[14px] h-4 w-4 rotate-45 border-b-[3px] border-l-[3px] border-[#3A2B2B] bg-[#FFD8D8]"
            />
            <span className="pixel-soft text-xl leading-none text-[#8a5a5a]">{friendMessages[announce].name} is typing…</span>
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="block h-2 w-2 rounded-full bg-[#FF6B9D]"
                animate={{ y: [0, -4, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </motion.div>
        )}

      </div>

      {/* continue */}
      <div className="z-10 mt-5 flex min-h-16 flex-col items-center">
        {finished ? (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-2">
            <p className="pixel-font text-[10px] text-[#5b4444]">💛 everyone loves you 💛</p>
            <PixelButton onClick={onNext} color="#6BCB77">
              {cfg.continueText}
            </PixelButton>
          </motion.div>
        ) : (
          <p className="pixel-font text-[10px] text-[#8a6a6a]">
            {count}/{friendMessages.length} messages… 💬
          </p>
        )}
      </div>
    </StageShell>
  );
}
