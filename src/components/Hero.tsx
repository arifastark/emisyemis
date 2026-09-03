"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { Starfield } from "./ui";

function pop(x = 0.5, colors?: string[]) {
  confetti({ particleCount: 60, spread: 75, origin: { x, y: 0.4 }, colors: colors ?? ["#FFD93D", "#FF6B9D", "#fff"] });
}

export default function Hero({ onToast }: { onToast: (msg: string) => void }) {
  const [spins, setSpins] = useState(0);
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 600], [0, 120]);
  const yFast = useTransform(scrollY, [0, 600], [0, -80]);
  const rotate = useTransform(scrollY, [0, 600], [0, 8]);

  return (
    <header id="hero" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-16 pt-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ffffff_0%,#FFD8D8_60%)]" />
      <Starfield count={90} />

      {/* floating deco polaroids (desktop) */}
      <motion.div style={{ y: ySlow }} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <motion.div style={{ rotate }} className="absolute left-[6%] top-[18%] w-44 -rotate-12">
          <FloatCard src="/memories/memory-1.svg" label="lol forever" />
        </motion.div>
        <div className="absolute right-[7%] top-[16%] w-48 rotate-6" style={{ ["--fl-rot" as string]: "6deg" }}>
          <div className="animate-[float_6s_ease-in-out_infinite]"><FloatCard src="/memories/memory-3.svg" label="golden hour" /></div>
        </div>
        <div className="absolute bottom-[12%] left-[8%] w-40 -rotate-6" style={{ ["--fl-rot" as string]: "-6deg" }}>
          <div className="animate-[float_7s_ease-in-out_infinite]"><FloatCard src="/memories/memory-5.svg" label="disco!!" /></div>
        </div>
      </motion.div>

      <motion.div style={{ y: yFast }} className="relative mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="font-display rounded-full bg-[#FF6B9D] px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#14122b] shadow-[3px_3px_0_#14122b]">
            ✨ interactive experience
          </span>
          <button
            onClick={() => { pop(0.5); onToast("⭐ secret star found! 1 of 3. keep hunting…"); }}
            className="font-display rounded-full border-2 border-dashed border-[#FFD93D]/70 px-3 py-1 text-xs font-bold text-[#FFD93D] transition hover:rotate-3 hover:bg-[#FFD93D] hover:text-[#14122b]"
            title="hmm, what's this?"
          >
            ★ ???
          </button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", bounce: 0.4 }}
          className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-[#FFF6E9] md:text-8xl"
        >
          {siteConfig.heroTitleA}
          <br />
          <span className="relative inline-block text-[#FFD93D]">
            {siteConfig.heroTitleB}
            <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full" aria-hidden>
              <motion.path
                d="M5 14 Q 75 4 150 12 T 295 8"
                fill="none" stroke="#FF6B9D" strokeWidth="7" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.8 }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/70 md:text-lg"
        >
          {siteConfig.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#origin"
            className="font-display rounded-full border-[3px] border-[#14122b] bg-[#FFD93D] px-8 py-3 text-lg font-extrabold text-[#14122b] shadow-[5px_5px_0_#000] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#000] active:translate-y-0 active:shadow-[3px_3px_0_#000]"
          >
            start the chaos 🚀
          </a>
          <button
            onClick={() => { setSpins((s) => s + 1); pop(Math.random()); onToast(spins >= 4 ? "okay okay, you LOVE buttons. noted. 📝" : "button mashing: excellent technique."); }}
            className="font-display rounded-full border-[3px] border-[#FFF6E9] px-8 py-3 text-lg font-extrabold text-[#FFF6E9] transition hover:rotate-1 hover:bg-[#FFF6E9] hover:text-[#14122b]"
          >
            useless button ({spins})
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-hand mt-6 text-2xl text-white/50"
        >
          p.s. everything here is clickable. trust nothing. tap everything.
        </motion.p>
      </motion.div>

      {/* mobile polaroid strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative mx-auto mt-10 flex gap-3 overflow-x-auto no-scrollbar lg:hidden"
      >
        {["/memories/memory-2.svg", "/memories/memory-4.svg", "/memories/memory-6.svg"].map((s, i) => (
          <Image key={i} src={s} alt="memory" width={140} height={140} className={`h-32 w-32 shrink-0 rounded-xl border-[3px] border-[#FFF6E9] object-cover ${i % 2 ? "rotate-3" : "-rotate-3"}`} />
        ))}
      </motion.div>

      <motion.a
        href="#origin"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-3xl"
        aria-label="Scroll down"
      >
        👇
      </motion.a>
    </header>
  );
}

function FloatCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="rounded-xl border-[3px] border-[#14122b] bg-[#FFF6E9] p-2 shadow-[5px_5px_0_#000]">
      <Image src={src} alt={label} width={200} height={200} className="h-36 w-full rounded-lg object-cover" />
      <p className="font-hand py-1 text-center text-xl text-[#14122b]">{label}</p>
    </div>
  );
}
