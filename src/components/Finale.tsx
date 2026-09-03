"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "./ui";

const stages = [
  { label: "DO NOT PRESS", sub: "seriously. walk away.", color: "#ff4d6d" },
  { label: "REALLY DON'T", sub: "wow. rebellious. i like that.", color: "#ff8fa3" },
  { label: "LAST WARNING", sub: "behind this button: feelings.", color: "#FFD93D" },
];

function fireworks() {
  const colors = ["#FFD93D", "#FF6B9D", "#6BCB77", "#4D96FF", "#fff"];
  confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 120, angle: 60, spread: 80, origin: { x: 0, y: 0.7 }, colors }), 250);
  setTimeout(() => confetti({ particleCount: 120, angle: 120, spread: 80, origin: { x: 1, y: 0.7 }, colors }), 450);
  setTimeout(() => confetti({ particleCount: 250, spread: 160, origin: { y: 0.4 }, colors, scalar: 1.2 }), 800);
}

export default function Finale({ onToast }: { onToast: (m: string) => void }) {
  const [stage, setStage] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  const press = () => {
    if (stage < stages.length - 1) {
      setStage((s) => s + 1);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
    } else {
      setExploded(true);
      fireworks();
      const t = setInterval(fireworks, 2200);
      setTimeout(() => clearInterval(t), 7000);
      onToast("💛 you did it. no take-backs. feelings deployed.");
    }
  };

  return (
    <section id="finale" className="relative px-4 py-24 md:py-32">
      <SectionHeading
        kicker="final chapter — the surprise 💌"
        title={<>one last thing, <span className="text-[#FF6B9D]">{siteConfig.friendName}</span></>}
        sub="you've been warned. repeatedly."
        color="#FF6B9D"
      />

      <div className="mx-auto max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {!exploded ? (
            <motion.div key="button" exit={{ scale: 0, rotate: 20, opacity: 0 }}>
              {/* big red button */}
              <motion.button
                onClick={press}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: [1, 1.04 + stage * 0.03, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="relative mx-auto block h-52 w-52 rounded-full border-8 border-[#800f2f] font-display text-2xl font-extrabold leading-tight text-white shadow-[0_14px_0_#800f2f,0_24px_50px_rgba(255,77,109,0.45)] md:h-64 md:w-64"
                style={{ background: `radial-gradient(circle at 35% 30%, #ff8fa3, ${stages[stage].color} 60%, #c9184a)` }}
              >
                {stages[stage].label}
                <span className="absolute inset-x-6 top-5 h-8 rounded-full bg-white/30 blur-[2px]" aria-hidden />
              </motion.button>
              <p className="font-hand mt-5 text-3xl text-white/70">{stages[stage].sub}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/30">
                press count: {stage}/3 • courage level: rising
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 60, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="sticker-card relative rounded-3xl p-6 text-left md:p-10">
                <div className="tape -top-3 left-10 -rotate-6" />
                <div className="tape -top-3 right-10 rotate-6" />
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-[#14122b]/50">
                  💌 official feelings document • no. 001
                </p>
                <h3 className="font-hand mt-2 text-4xl font-bold text-[#14122b] md:text-5xl">
                  dear {siteConfig.friendName},
                </h3>
                <div className="mt-4 space-y-4">
                  {siteConfig.finaleLetter.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-base font-semibold leading-relaxed text-[#14122b]/85 md:text-lg"
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                <p className="font-hand mt-6 text-right text-3xl text-[#14122b]">{siteConfig.finaleSign} 💛</p>

                {/* certificate */}
                <div className="mt-8 rounded-2xl border-[3px] border-dashed border-[#14122b]/40 bg-[#FFD93D]/30 p-5 text-center">
                  <p className="font-display text-xs font-extrabold uppercase tracking-widest">★ certificate of being awesome ★</p>
                  <p className="font-display mt-1 text-2xl font-extrabold">
                    {sealBroken ? "OFFICIALLY CERTIFIED ✅" : "this certifies that YOU are elite"}
                  </p>
                  {!sealBroken ? (
                    <button
                      onClick={() => { setSealBroken(true); fireworks(); }}
                      className="font-display mt-3 rounded-full border-[3px] border-[#14122b] bg-[#14122b] px-6 py-2 text-sm font-extrabold uppercase tracking-widest text-[#FFD93D] hover:scale-105"
                    >
                      stamp it 🔨
                    </button>
                  ) : (
                    <p className="font-hand mt-2 text-2xl">stamped with love. frame-worthy, honestly.</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={fireworks}
                  className="font-display rounded-full border-[3px] border-[#14122b] bg-[#FF6B9D] px-6 py-2.5 font-extrabold text-[#14122b] shadow-[4px_4px_0_#000] hover:-translate-y-0.5"
                >
                  🎆 more fireworks
                </button>
                <a
                  href="#hero"
                  className="font-display rounded-full border-[3px] border-white/60 px-6 py-2.5 font-extrabold text-white hover:bg-white hover:text-[#14122b]"
                >
                  ↻ relive it all
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
