"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { birthdayAudio } from "@/lib/birthday-audio";

// ── small unobtrusive music control ──
export function MusicToggle() {
  const [muted, setMuted] = useState(false);
  const [on, setOn] = useState(true);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          birthdayAudio.unlock();
          const m = !muted;
          setMuted(m);
          birthdayAudio.setMuted(m);
        }}
        title={muted ? "unmute" : "mute"}
        className="pixel-font flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-[#3A2B2B] bg-[#FFF6E9] text-lg shadow-[3px_3px_0_#3A2B2B]"
      >
        {muted ? "🔇" : "🎵"}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (on) birthdayAudio.stopBackground();
          setOn(!on);
        }}
        title="stop/start music (page music)"
        className="pixel-font hidden h-12 items-center rounded-xl border-[3px] border-[#3A2B2B] bg-[#FFF6E9] px-3 text-[10px] text-[#3A2B2B] shadow-[3px_3px_0_#3A2B2B] sm:flex"
      >
        {on ? "⏸" : "▶"}
      </motion.button>
    </div>
  );
}
