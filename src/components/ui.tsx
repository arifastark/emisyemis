"use client";
import { motion } from "framer-motion";

export function SectionHeading({
  kicker,
  title,
  sub,
  color = "#FFD93D",
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="font-display inline-block -rotate-2 rounded-full border-[3px] border-[#14122b] px-4 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[#14122b] md:text-sm"
        style={{ background: color }}
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.08 }}
        className="font-display mt-4 text-4xl font-extrabold leading-[1.02] text-[#FFF6E9] md:text-6xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="font-hand mt-3 text-2xl text-[#FFF6E9]/80 md:text-3xl"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative -rotate-1 overflow-hidden border-y-[3px] border-[#14122b] bg-[#FFD93D] py-2">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-6 whitespace-nowrap pr-6">
        {row.map((t, i) => (
          <span key={i} className="font-display text-sm font-extrabold uppercase tracking-widest text-[#14122b] md:text-base">
            {t} <span className="mx-3">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Starfield({ count = 70 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    left: (i * 37.7 + 13) % 100,
    top: (i * 53.3 + 7) % 100,
    size: 1 + ((i * 7) % 3),
    delay: (i % 10) * 0.3,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
