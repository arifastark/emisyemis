"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { chatScript } from "@/data/memories";
import { SectionHeading } from "./ui";

const bursts = ["💛", "😂", "🔥", "👀", "💀"];

export default function OriginStory({ onToast }: { onToast: (m: string) => void }) {
  const [popped, setPopped] = useState<Record<number, string>>({});

  const tapBubble = (i: number, e: React.MouseEvent) => {
    const emoji = bursts[i % bursts.length];
    setPopped((p) => ({ ...p, [i]: emoji }));
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 12,
      spread: 50,
      startVelocity: 22,
      scalar: 0.9,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
      colors: ["#FFD93D", "#FF6B9D", "#fff"],
    });
    if (Object.keys(popped).length === 3) onToast("chat detective 🕵️ — you tap EVERYTHING, huh?");
  };

  return (
    <section id="origin" className="relative mx-auto max-w-3xl px-4 py-24 md:py-32">
      <SectionHeading
        kicker="chapter 01 — how it started"
        title={<>it all started with <span className="text-[#4D96FF]">a terrible idea</span></>}
        sub="exhibit A: our actual brain cells at work"
        color="#4D96FF"
      />

      <div className="sticker-card relative rounded-3xl p-4 md:p-8">
        <div className="tape -top-3 left-8 -rotate-6" />
        <div className="tape -top-3 right-8 rotate-6" />
        <div className="mb-4 flex items-center gap-3 border-b-[3px] border-dashed border-[#14122b]/20 pb-4">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF6B9D]" />
            <span className="h-3 w-3 rounded-full bg-[#FFD93D]" />
            <span className="h-3 w-3 rounded-full bg-[#6BCB77]" />
          </div>
          <p className="font-display text-xs font-extrabold uppercase tracking-widest text-[#14122b]/60">
            💬 definitely-real-chat-logs (100% legit)
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {chatScript.map((m, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.02, rotate: m.from === "me" ? -0.5 : 0.5 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => tapBubble(i, e)}
              className={`relative max-w-[85%] rounded-2xl border-[3px] border-[#14122b] px-4 py-2.5 text-left text-sm font-bold shadow-[3px_3px_0_#14122b] md:text-base ${
                m.from === "me" ? "self-end rounded-br-sm bg-[#FFD93D] text-[#14122b]" : "self-start rounded-bl-sm bg-white text-[#14122b]"
              }`}
            >
              <span className="mb-0.5 block text-[10px] font-extrabold uppercase tracking-widest opacity-50">
                {m.from === "me" ? "chaos gremlin (me)" : "icon (you)"}
              </span>
              {m.text}
              {popped[i] && (
                <motion.span
                  initial={{ scale: 0, y: 0 }}
                  animate={{ scale: [0, 1.6, 1], y: -24, opacity: [1, 1, 0] }}
                  transition={{ duration: 0.9 }}
                  className="pointer-events-none absolute -top-2 right-2 text-2xl"
                >
                  {popped[i]}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        <p className="font-hand mt-5 text-center text-2xl text-[#14122b]/60">
          ↑ tap the bubbles. they’re juicier than they look.
        </p>
      </div>
    </section>
  );
}
