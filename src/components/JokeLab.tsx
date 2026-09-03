"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jokes } from "@/data/jokes";
import { SectionHeading } from "./ui";

export default function JokeLab({ onToast }: { onToast: (m: string) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [dontCount, setDontCount] = useState(0);
  const visible = jokes.filter((j) => !j.secret || Object.keys(open).length >= jokes.length - 1);
  const openedCount = useMemo(() => Object.values(open).filter(Boolean).length, [open]);

  const toggle = (id: string) => {
    const willOpen = !open[id];
    setOpen((o) => ({ ...o, [id]: willOpen }));
    if (willOpen && id === "vault-secret") onToast("🕵️ you found the CLASSIFIED file. elite nosiness.");
  };

  return (
    <section id="jokes" className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading
        kicker="chapter 03 — the joke lab 🧪"
        title={<>classified lore, <span className="text-[#6BCB77]">declassified</span></>}
        sub={`tap a vial to uncork it (${openedCount} opened)`}
        color="#6BCB77"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((j, i) => {
          const isOpen = !!open[j.id];
          return (
            <motion.button
              key={j.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ rotate: isOpen ? 0 : i % 2 ? 1.5 : -1.5, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(j.id)}
              className="group relative min-h-[240px] overflow-hidden rounded-2xl border-[3px] border-[#14122b] p-5 text-left shadow-[6px_6px_0_#000]"
              style={{ background: j.color }}
            >
              <div className="flex items-start justify-between">
                <span className="font-display rounded-full border-2 border-[#14122b] bg-white/90 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-[#14122b]">
                  {j.tag}
                </span>
                <span className="text-4xl drop-shadow transition group-hover:scale-125 group-hover:rotate-12">{j.emoji}</span>
              </div>
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                    <p className="font-display mt-4 text-2xl font-extrabold leading-tight text-[#14122b]">{j.setup}</p>
                    <p className="font-display mt-4 inline-block animate-pulse rounded-full border-2 border-[#14122b] bg-[#14122b] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                      tap to uncork 👆
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="punch" initial={{ opacity: 0, y: 14, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0 }}>
                    <p className="font-hand mt-3 text-[26px] font-semibold leading-snug text-[#14122b]">“{j.punchline}”</p>
                    <p className="font-display mt-3 text-[11px] font-bold uppercase tracking-widest text-[#14122b]/60">
                      tap to re-cork
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {j.secret && (
                <span className="absolute inset-x-0 top-0 bg-[#14122b] py-1 text-center text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FFD93D]">
                  ★ secret file ★
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* forbidden button */}
      <div className="mt-10 text-center">
        <motion.button
          whileHover={{ x: [0, -4, 4, -3, 3, 0] }}
          onClick={() => {
            const n = dontCount + 1;
            setDontCount(n);
            onToast(
              n === 1 ? "it says DON'T. respect the sign. 🚫" :
              n === 2 ? "again?? bold. very bold." :
              n === 3 ? "fine. NOTHING happens. happy? (something happens later…)" :
              `pressed ${n}x. this is going on your permanent record.`
            );
          }}
          className="font-display rounded-full border-[3px] border-dashed border-white/40 px-6 py-2 text-sm font-bold uppercase tracking-widest text-white/50 transition hover:border-[#FF6B9D] hover:text-[#FF6B9D]"
        >
          🚫 don’t press this tiny button ({dontCount})
        </motion.button>
        <p className="mt-3 text-xs text-white/30">
          edit jokes in <code className="rounded bg-white/10 px-1">src/data/jokes.ts</code> — add your real inside jokes
        </p>
      </div>
    </section>
  );
}
