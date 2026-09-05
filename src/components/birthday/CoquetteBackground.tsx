"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayAudio } from "@/lib/birthday-audio";

export type DecoPreset =
  | "intro"
  | "cake"
  | "wishes"
  | "game"
  | "quiz"
  | "memories"
  | "letter"
  | "finale"
  | "generic";

type Spot = {
  src: string;
  alt: string;
  left: string;
  top: string;
  size: number;
  mdSize: number;
  depth: number;
  rotate: number;
  delay: number;
  dur: number;
  opacity: number;
};

const S = (
  src: string,
  alt: string,
  left: string,
  top: string,
  size: number,
  mdSize: number,
  depth = 0.5,
  rotate = 0,
  delay = 0,
  dur = 4,
  opacity = 1,
): Spot => ({ src, alt, left, top, size, mdSize, depth, rotate, delay, dur, opacity });

const HEART = "/deco/deco-heart.png";
const CAKE = "/deco/deco-cake.png";
const SLICE = "/deco/deco-slice.png";
const BOW = "/deco/deco-bow.png";
const CUP = "/deco/deco-cup.png";
const LETTER = "/deco/deco-letter.png";
const BOUQUET = "/deco/deco-bouquet.png";

const LAYOUTS: Record<DecoPreset, Spot[]> = {
  intro: [
    S(HEART, "pink heart", "2%", "16%", 96, 150, 0.9, -10, 0, 4.2),
    S(CAKE, "birthday cake", "82%", "12%", 110, 165, 0.7, 8, 0.4, 4.6),
    S(BOW, "pink bow", "86%", "62%", 84, 130, 1, -6, 0.8, 3.8),
    S(CUP, "tea cup", "3%", "64%", 88, 135, 0.8, 7, 0.2, 4.4),
    S(SLICE, "cake slice", "12%", "82%", 72, 110, 0.5, -8, 1, 5),
    S(LETTER, "love letter", "76%", "84%", 92, 135, 0.6, 6, 0.6, 4.8),
    S(BOUQUET, "tulips", "44%", "4%", 64, 92, 0.4, 0, 1.2, 5.2, 0.95),
  ],
  cake: [
    S(CAKE, "birthday cake", "1%", "20%", 120, 190, 0.9, -8, 0, 4.2),
    S(SLICE, "cake slice", "84%", "18%", 112, 175, 0.9, 8, 0.4, 4.5),
    S(HEART, "pink heart", "88%", "66%", 80, 120, 0.7, -6, 0.8, 3.8),
    S(CUP, "tea cup", "2%", "68%", 84, 125, 0.7, 6, 0.2, 4.4),
    S(BOW, "pink bow", "8%", "4%", 64, 96, 0.4, -10, 1, 5),
    S(LETTER, "love letter", "70%", "86%", 76, 110, 0.5, 5, 0.6, 4.8),
    S(BOUQUET, "tulips", "30%", "88%", 68, 100, 0.4, 0, 1.2, 5.2, 0.95),
  ],
  wishes: [
    S(HEART, "pink heart", "3%", "30%", 118, 185, 0.9, -8, 0, 4.2),
    S(CUP, "tea cup", "85%", "28%", 104, 160, 0.9, 8, 0.4, 4.5),
    S(CAKE, "birthday cake", "86%", "68%", 84, 125, 0.7, -6, 0.8, 3.8),
    S(BOW, "pink bow", "2%", "72%", 80, 120, 0.7, 7, 0.2, 4.4),
    S(LETTER, "love letter", "10%", "6%", 72, 105, 0.4, -6, 1, 5),
    S(SLICE, "cake slice", "68%", "86%", 78, 115, 0.5, 6, 0.6, 4.8),
    S(BOUQUET, "tulips", "38%", "3%", 62, 90, 0.35, 0, 1.2, 5.2, 0.95),
  ],
  game: [
    S(BOW, "pink bow", "1%", "24%", 96, 150, 0.9, -10, 0, 4.2),
    S(BOUQUET, "tulips", "86%", "22%", 108, 165, 0.9, 8, 0.4, 4.6),
    S(HEART, "pink heart", "88%", "70%", 84, 125, 0.7, -6, 0.8, 3.8),
    S(SLICE, "cake slice", "2%", "72%", 80, 120, 0.7, 7, 0.2, 4.4),
    S(CAKE, "birthday cake", "8%", "3%", 62, 92, 0.4, -8, 1, 5),
    S(CUP, "tea cup", "72%", "87%", 74, 108, 0.5, 5, 0.6, 4.8),
    S(LETTER, "love letter", "40%", "2%", 58, 84, 0.35, 0, 1.2, 5.2, 0.95),
  ],
  quiz: [
    S(LETTER, "love letter", "2%", "26%", 118, 180, 0.9, -8, 0, 4.2),
    S(HEART, "pink heart", "85%", "24%", 106, 160, 0.9, 8, 0.4, 4.5),
    S(CUP, "tea cup", "87%", "68%", 84, 125, 0.7, -6, 0.8, 3.8),
    S(BOW, "pink bow", "2%", "70%", 82, 122, 0.7, 6, 0.2, 4.4),
    S(SLICE, "cake slice", "10%", "4%", 64, 96, 0.4, -10, 1, 5),
    S(CAKE, "birthday cake", "70%", "87%", 76, 112, 0.5, 5, 0.6, 4.8),
    S(BOUQUET, "tulips", "40%", "3%", 60, 88, 0.35, 0, 1.2, 5.2, 0.95),
  ],
  memories: [
    S(BOUQUET, "tulips", "1%", "24%", 116, 180, 0.9, -8, 0, 4.2),
    S(HEART, "pink heart", "86%", "20%", 104, 158, 0.9, 8, 0.4, 4.5),
    S(SLICE, "cake slice", "88%", "68%", 82, 122, 0.7, -6, 0.8, 3.8),
    S(LETTER, "love letter", "2%", "70%", 84, 125, 0.7, 6, 0.2, 4.4),
    S(BOW, "pink bow", "9%", "3%", 64, 96, 0.4, -10, 1, 5),
    S(CUP, "tea cup", "70%", "87%", 76, 112, 0.5, 5, 0.6, 4.8),
    S(CAKE, "birthday cake", "40%", "2%", 58, 86, 0.35, 0, 1.2, 5.2, 0.95),
  ],
  letter: [
    S(LETTER, "love letter", "84%", "16%", 120, 185, 0.9, 8, 0, 4.2),
    S(BOUQUET, "tulips", "1%", "22%", 112, 170, 0.9, -8, 0.4, 4.6),
    S(HEART, "pink heart", "2%", "68%", 86, 128, 0.7, 7, 0.8, 3.8),
    S(CUP, "tea cup", "87%", "70%", 84, 125, 0.7, -6, 0.2, 4.4),
    S(BOW, "pink bow", "8%", "3%", 64, 96, 0.4, -10, 1, 5),
    S(CAKE, "birthday cake", "34%", "89%", 72, 105, 0.5, 4, 0.6, 4.8),
    S(SLICE, "cake slice", "55%", "2%", 58, 86, 0.35, 0, 1.2, 5.2, 0.95),
  ],
  finale: [
    S(BOUQUET, "tulips", "3%", "18%", 118, 185, 0.9, -8, 0, 4.2),
    S(CAKE, "birthday cake", "83%", "16%", 114, 175, 0.9, 8, 0.4, 4.6),
    S(HEART, "pink heart", "87%", "66%", 88, 132, 0.7, -6, 0.8, 3.8),
    S(BOW, "pink bow", "2%", "68%", 86, 128, 0.7, 7, 0.2, 4.4),
    S(SLICE, "cake slice", "12%", "84%", 74, 110, 0.5, -8, 1, 5),
    S(LETTER, "love letter", "74%", "86%", 80, 118, 0.5, 6, 0.6, 4.8),
    S(CUP, "tea cup", "44%", "3%", 62, 90, 0.35, 0, 1.2, 5.2, 0.95),
  ],
  generic: [
    S(HEART, "pink heart", "2%", "20%", 96, 145, 0.8, -8, 0, 4.2),
    S(CAKE, "birthday cake", "84%", "16%", 100, 150, 0.8, 8, 0.4, 4.6),
    S(BOW, "pink bow", "87%", "66%", 80, 120, 0.7, -6, 0.8, 3.8),
    S(CUP, "tea cup", "2%", "68%", 84, 125, 0.7, 6, 0.2, 4.4),
    S(SLICE, "cake slice", "10%", "85%", 70, 105, 0.5, -8, 1, 5),
    S(LETTER, "love letter", "75%", "86%", 78, 115, 0.5, 6, 0.6, 4.8),
    S(BOUQUET, "tulips", "42%", "3%", 60, 88, 0.35, 0, 1.2, 5.2, 0.95),
  ],
};

export function CoquetteBackground({ preset = "generic" }: { preset?: DecoPreset }) {
  const spots = LAYOUTS[preset] ?? LAYOUTS.generic;
  const [par, setPar] = useState({ x: 0, y: 0 });
  const [popped, setPopped] = useState<number | null>(null);
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const tick = () => {
      setPar((p) => {
        const nx = p.x + (target.current.x - p.x) * 0.08;
        const ny = p.y + (target.current.y - p.y) * 0.08;
        if (Math.abs(nx - p.x) < 0.001 && Math.abs(ny - p.y) < 0.001) return p;
        return { x: nx, y: ny };
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    const onWinMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("pointermove", onWinMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onWinMove);
    };
  }, []);

  const pop = useCallback((i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    birthdayAudio.pop();
    confetti({
      particleCount: 28,
      spread: 70,
      startVelocity: 24,
      scalar: 0.75,
      ticks: 130,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      shapes: ["square"],
      colors: ["#FF6B9D", "#FFD93D", "#ffffff", "#FF9EBB"],
    });
    setPopped(i);
    timers.current.push(setTimeout(() => setPopped(null), 500));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`@media (min-width: 768px) { ${spots.map((s, i) => `.deco-${preset}-${i}{width:${s.mdSize}px !important;}`).join(" ")} }`}</style>
      {spots.map((s, i) => (
        <motion.div
          key={`${preset}-${i}`}
          className="absolute"
          style={{ left: s.left, top: s.top, opacity: s.opacity }}
          animate={{ x: par.x * 26 * s.depth, y: par.y * 22 * s.depth }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        >
          <motion.button
            type="button"
            onClick={(e) => pop(i, e)}
            className="pointer-events-auto block cursor-pointer touch-manipulation bg-transparent"
            style={{ border: "none", padding: 0 }}
            aria-label={s.alt}
            animate={
              popped === i
                ? { scale: [1, 1.5, 0.6, 1.1, 1], rotate: [s.rotate, s.rotate + 18, s.rotate - 10, s.rotate] }
                : { y: [0, -14, 0], rotate: [s.rotate, s.rotate + 6, s.rotate - 5, s.rotate] }
            }
            transition={
              popped === i
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }
            }
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              draggable={false}
              className={`deco-${preset}-${i} select-none`}
              style={{
                width: s.size,
                height: "auto",
                imageRendering: "pixelated",
                filter: "drop-shadow(3px 4px 0 rgba(58,43,43,.22))",
              }}
            />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
