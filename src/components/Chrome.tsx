"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import confetti from "canvas-confetti";
import { chapters } from "@/data/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[90] h-1.5 origin-left bg-gradient-to-r from-[#FFD93D] via-[#FF6B9D] to-[#4D96FF]" />
  );
}

export function ChapterDots() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed right-3 top-1/2 z-[80] hidden -translate-y-1/2 flex-col gap-2 md:flex" aria-label="Chapters">
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          title={c.label}
          className={`group flex items-center justify-end gap-2 rounded-full px-2 py-1.5 transition ${
            active === c.id ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <span className={`text-[11px] font-bold uppercase tracking-widest opacity-0 transition group-hover:opacity-100 ${active === c.id ? "opacity-100 text-[#FFD93D]" : "text-white/60"}`}>
            {c.label}
          </span>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm transition ${active === c.id ? "border-[#FFD93D] bg-[#FFD93D] scale-110" : "border-white/30 bg-black/40"}`}>
            {c.emoji}
          </span>
        </a>
      ))}
    </nav>
  );
}

export function Toast({ msg }: { msg: string | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="font-display max-w-md rounded-2xl border-[3px] border-[#14122b] bg-[#FFD93D] px-5 py-3 text-center text-sm font-extrabold text-[#14122b] shadow-[5px_5px_0_#000]"
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function useSecrets(onToast: (m: string) => void, onDisco: (v: boolean) => void) {
  useEffect(() => {
    const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let pos = 0;
    const key = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      pos = k === seq[pos] ? pos + 1 : k === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        onDisco(true);
        onToast("🪩 KONAMI ACCEPTED. disco mode: ON. press ESC to be boring again.");
        confetti({ particleCount: 180, spread: 130, origin: { y: 0.5 }, colors: ["#FFD93D", "#FF6B9D", "#00BBF9", "#6BCB77"] });
        setTimeout(() => onDisco(false), 12000);
      }
      if (e.key === "Escape") onDisco(false);
    };
    const click = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) return;
      const sparkle = document.createElement("div");
      sparkle.textContent = ["✨", "💛", "⭐", "💫"][Math.floor(Math.random() * 4)];
      sparkle.style.cssText = `position:fixed;left:${e.clientX - 10}px;top:${e.clientY - 10}px;z-index:99;pointer-events:none;font-size:22px;`;
      document.body.appendChild(sparkle);
      sparkle.animate(
        [{ transform: "scale(0) rotate(0deg)", opacity: 1 }, { transform: "scale(1.6) rotate(90deg) translateY(-30px)", opacity: 0 }],
        { duration: 700, easing: "ease-out" }
      ).onfinish = () => sparkle.remove();
    };
    window.addEventListener("keydown", key);
    window.addEventListener("click", click);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("click", click); };
  }, [onToast, onDisco]);
}

export function Footer({ onToast }: { onToast: (m: string) => void }) {
  const [clicks, setClicks] = useState(0);
  return (
    <footer className="relative border-t-[3px] border-white/10 px-4 py-12 text-center">
      <p className="font-hand text-3xl text-white/70">made with chaos, snacks & love</p>
      <p className="font-display mt-2 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
        operation emisyemis • est. forever • no besties were harmed
      </p>
      <button
        onClick={() => {
          const n = clicks + 1;
          setClicks(n);
          if (n === 5) { onToast("🐾 the footer gremlin says hi. (try ↑↑↓↓←→←→BA)"); setClicks(0); }
        }}
        className="mt-4 text-2xl opacity-40 transition hover:scale-125 hover:opacity-100"
        title="..."
      >
        🐾
      </button>
      <p className="mt-2 text-[11px] text-white/25">
        photos: <code>/public/memories/</code> • words: <code>/src/data/</code> • go make it yours 💛
      </p>
    </footer>
  );
}
