"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "@/data/birthday";
import { PixelButton, FloatingPixels, LogoBadge } from "./pixel-ui";
import { CoquetteBackground } from "./CoquetteBackground";
import { birthdayAudio } from "@/lib/birthday-audio";

export function StageFinale({ onReplay }: { onReplay: () => void }) {
  const cfg = birthdayConfig.finale;

  useEffect(() => {
    birthdayAudio.fanfare();
    const end = Date.now() + 4000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, shapes: ["square"], colors: ["#FF6B9D", "#FFD93D", "#fff"] });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, shapes: ["square"], colors: ["#4D96FF", "#6BCB77", "#fff"] });
      confetti({ particleCount: 8, spread: 100, startVelocity: 32, origin: { x: Math.random(), y: Math.random() * 0.5 }, shapes: ["square"] });
      if (Date.now() < end) setTimeout(frame, 350);
    };
    frame();
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-14 text-center">
      <CoquetteBackground preset="finale" />
      <FloatingPixels items={["🎉", "💖", "⭐", "🎂", "✨", "🎈", "💛"]} />
      {/* twinkles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className="twinkle absolute"
            style={{ left: `${(i * 37 + 5) % 100}%`, top: `${(i * 23 + 8) % 100}%`, animationDelay: `${(i % 9) * 0.25}s`, fontSize: 12 + ((i * 5) % 16) }}
          >
            {["✦", "★", "💖", "✧"][i % 4]}
          </span>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 90, damping: 13 }} className="relative z-10 flex max-w-2xl flex-col items-center">
        <LogoBadge size={100} />
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="pixel-font mt-5 rounded-2xl border-4 border-[#3A2B2B] bg-[#FFF6E9] px-5 py-2 text-[10px] text-[#3A2B2B] shadow-[5px_5px_0_#3A2B2B] md:text-xs"
        >
          🎮 ★ GAME COMPLETE ★ CONGRATS! ★
        </motion.div>

        <motion.h1
          className="pixel-font mt-6 text-4xl leading-tight md:text-7xl"
          style={{ color: "#FF6B9D", WebkitTextStroke: "3px #3A2B2B", textShadow: "5px 5px 0 #3A2B2B", paintOrder: "stroke fill" }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          HAPPY
          <br />
          <span className="text-[4rem] md:text-[8rem]">20</span>
        </motion.h1>

        <p className="pixel-soft max-w-md text-2xl text-[#5b4444] md:text-3xl">{cfg.subtitle}</p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <PixelButton
            color="#FF6B9D"
            onClick={() => {
              birthdayAudio.fanfare();
              confetti({ particleCount: 200, spread: 130, origin: { y: 0.5 }, shapes: ["square"] });
            }}
          >
            🎉 CONFETTI!
          </PixelButton>
          <PixelButton color="#4D96FF" small onClick={onReplay}>
            {cfg.replayText}
          </PixelButton>
        </div>
        <p className="pixel-font mt-5 text-[9px] text-[#8a6a6a]">from your bestie who loves you • age 20 keepsake 💛</p>
      </motion.div>
    </div>
  );
}
