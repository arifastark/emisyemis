"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { stages } from "@/data/birthday";
import { StageIntro } from "@/components/birthday/StageIntro";
import { StageCake } from "@/components/birthday/StageCake";
import { StageWishes } from "@/components/birthday/StageWishes";
import { StageGame } from "@/components/birthday/StageGame";
import { StageQuiz } from "@/components/birthday/StageQuiz";
import { StageMemories } from "@/components/birthday/StageMemories";
import { StageLetter } from "@/components/birthday/StageLetter";
import { StageFinale } from "@/components/birthday/StageFinale";
import { StageProgress } from "@/components/birthday/pixel-ui";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import { birthdayAudio } from "@/lib/birthday-audio";

// Sequential 8-stage pixel birthday game. One stage at a time.
// Background music is ONE global thoseeyes.mp3 instance: started once here,
// never restarted on stage change, keeps playback position.
export default function Home() {
  const [stage, setStage] = useState(0);
  const next = useCallback(() => {
    setStage((s) => Math.min(s + 1, stages.length - 1));
  }, []);
  const replay = useCallback(() => {
    window.scrollTo({ top: 0 });
    setStage(0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  // Start the single global background track once. If autoplay is blocked,
  // birthdayAudio retries after the user's first interaction. Stage changes
  // never touch it, so position is preserved.
  useEffect(() => {
    birthdayAudio.playGlobalMusic();
  }, []);

  return (
    <main className="crt relative min-h-dvh overflow-x-clip bg-[#FFD8D8]">
      {stage > 0 && <StageProgress stage={stage} total={stages.length} />}
      <MusicToggle />

      {/* tiny stage label */}
      {stage > 0 && stage < stages.length - 1 && (
        <div className="pointer-events-none fixed left-3 top-3 z-50 hidden sm:block">
          <span className="pixel-font rounded-lg border-[3px] border-[#3A2B2B] bg-[#3A2B2B] px-3 py-1.5 text-[9px] text-[#FFD93D]">
            {stages[stage].emoji} {stages[stage].label} • {stage}/{stages.length - 1}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: 60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {stage === 0 && <StageIntro onStart={next} />}
          {stage === 1 && <StageCake onNext={next} />}
          {stage === 2 && <StageWishes onNext={next} />}
          {stage === 3 && <StageGame onNext={next} />}
          {stage === 4 && <StageQuiz onNext={next} />}
          {stage === 5 && <StageMemories onNext={next} />}
          {stage === 6 && <StageLetter onNext={next} />}
          {stage === 7 && <StageFinale onReplay={replay} />}
        </motion.div>
      </AnimatePresence>

      {/* marquee footer flavor */}
      {stage === 0 && (
        <div className="fixed inset-x-0 bottom-0 z-10 overflow-hidden border-t-4 border-[#3A2B2B] bg-[#FFD93D] py-1.5">
          <div className="animate-marquee flex w-max gap-8 whitespace-nowrap pr-8">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["You're my best friend, and I love you forever. ★", "Best friends forever. ★", "Friends who become family. ★", "Side by side, always. ★", "Making memories together, one moment at a time. ★", "Through every adventure, I'll always be by your side. ★"].map((t, i) => (
                <span key={`${k}-${i}`} className="pixel-font text-[9px] text-[#3A2B2B]">
                  {t}
                </span>
              )),
            )}
          </div>
        </div>
      )}
    </main>
  );
}
