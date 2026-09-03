"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memories } from "@/data/memories";
import { SectionHeading } from "./ui";

export default function PhotoVault({ onToast }: { onToast: (m: string) => void }) {
  const [order, setOrder] = useState<number[]>(memories.map((_, i) => i));
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [found, setFound] = useState(0);
  const top = order[order.length - 1];

  const next = (shuffle = false) => {
    setOrder((o) => {
      const copy = [...o];
      if (shuffle) {
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        onToast("deck shuffled like our sleep schedule 🔀");
      } else {
        const last = copy.pop()!;
        copy.unshift(last);
      }
      return copy;
    });
  };

  const flip = (idx: number) => {
    const isNew = !flipped[idx];
    setFlipped((f) => ({ ...f, [idx]: !f[idx] }));
    if (isNew) {
      const n = found + 1;
      setFound(n);
      if (n === memories.length) onToast("📸 vault COMPLETE! you looked at all our nonsense!");
      else if (n === 1) onToast("psst — drag the photo. it moves. you're welcome.");
    }
  };

  return (
    <section id="vault" className="relative px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff_0%,transparent_70%)]" />
      <SectionHeading
        kicker="chapter 02 — the photo vault"
        title={<>not a grid. <span className="text-[#FF6B9D]">a deck.</span></>}
        sub="drag it • flip it • steal it (don't actually)"
        color="#FF6B9D"
      />

      <div className="mx-auto max-w-md">
        {/* progress */}
        <div className="mb-6 flex items-center justify-between text-sm font-bold text-white/70">
          <span className="font-display uppercase tracking-widest">flipped {found}/{memories.length}</span>
          <div className="flex h-3 w-40 overflow-hidden rounded-full border-2 border-white/30">
            <motion.div
              className="h-full bg-[#FFD93D]"
              animate={{ width: `${(found / memories.length) * 100}%` }}
              transition={{ type: "spring", bounce: 0.3 }}
            />
          </div>
        </div>

        <div className="relative h-[480px] md:h-[520px]" style={{ perspective: 1200 }}>
          <AnimatePresence>
            {order.map((memIdx, pos) => {
              const m = memories[memIdx];
              const isTop = memIdx === top;
              const depth = order.length - 1 - pos;
              return (
                <motion.div
                  key={memIdx}
                  drag={isTop}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 110 || Math.abs(info.offset.y) > 110) next();
                  }}
                  initial={{ opacity: 0, y: 60, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    y: -depth * 10,
                    scale: 1 - depth * 0.045,
                    rotate: (memIdx % 2 === 0 ? -1 : 1) * (3 + depth),
                    zIndex: pos + 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.35 }}
                  whileDrag={{ scale: 1.05, rotate: 0, cursor: "grabbing" }}
                  className={`absolute inset-x-4 top-0 ${isTop ? "cursor-grab" : ""}`}
                  style={{ zIndex: pos + 1 }}
                >
                  <motion.div
                    animate={{ rotateY: flipped[memIdx] ? 180 : 0 }}
                    transition={{ duration: 0.55 }}
                    className="relative"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* FRONT */}
                    <div
                      className="sticker-card cursor-pointer rounded-2xl p-3"
                      onClick={() => isTop && flip(memIdx)}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="tape -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" />
                      <div className="relative overflow-hidden rounded-xl">
                        <Image
                          src={m.src}
                          alt={m.caption}
                          width={600}
                          height={600}
                          className="aspect-square w-full object-cover"
                          draggable={false}
                          priority={pos > order.length - 3}
                        />
                        <span className="absolute right-3 top-3 rounded-full border-2 border-[#14122b] bg-white px-2 py-0.5 text-lg shadow">
                          {m.sticker}
                        </span>
                        <span className="font-display absolute bottom-3 left-3 -rotate-2 rounded-lg border-2 border-[#14122b] bg-[#FFD93D] px-2 py-0.5 text-xs font-extrabold uppercase">
                          {m.doodle}
                        </span>
                      </div>
                      <p className="font-hand pt-2 text-center text-3xl leading-tight">{m.caption}</p>
                      <p className="font-display pb-1 text-center text-[11px] font-bold uppercase tracking-widest text-[#14122b]/50">
                        {m.date} • tap to flip ↻
                      </p>
                    </div>
                    {/* BACK */}
                    <div
                      className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-[3px] border-[#FFD93D] bg-[#1b1840] p-8 text-center"
                      onClick={() => flip(memIdx)}
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <p className="text-4xl">{m.sticker}</p>
                      <p className="font-hand mt-3 text-3xl leading-snug text-[#FFF6E9]">{m.backNote}</p>
                      <p className="font-display mt-4 rounded-full bg-[#FFD93D] px-4 py-1 text-xs font-extrabold uppercase text-[#14122b]">
                        tap to flip back
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => next()}
            className="font-display rounded-full border-[3px] border-[#14122b] bg-white px-6 py-2.5 font-extrabold text-[#14122b] shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            ← fling it
          </button>
          <button
            onClick={() => next(true)}
            className="font-display rounded-full border-[3px] border-[#14122b] bg-[#6BCB77] px-6 py-2.5 font-extrabold text-[#14122b] shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            🔀 chaos shuffle
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-white/40">
          💡 to use YOUR photos: drop them in <code className="rounded bg-white/10 px-1">/public/memories/</code> and edit{" "}
          <code className="rounded bg-white/10 px-1">src/data/memories.ts</code>
        </p>
      </div>
    </section>
  );
}
