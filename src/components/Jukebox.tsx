"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { songs, type Song } from "@/data/songs";
import { SectionHeading } from "./ui";

function useSongPlayer(song: Song) {
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stepRef = useRef(0);

  const stop = () => {
    setPlaying(false);
    setTick(0);
    stepRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    audioRef.current?.pause();
  };

  const play = () => {
    if (playing) { stop(); return; }
    if (song.audioSrc) {
      if (!audioRef.current) audioRef.current = new Audio(song.audioSrc);
      else audioRef.current.src = song.audioSrc;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      audioRef.current.onended = () => setPlaying(false);
      setPlaying(true);
      const t = setInterval(() => setTick((v) => v + 1), 300);
      timerRef.current = t;
      return;
    }
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();
      setPlaying(true);
      const playNote = () => {
        const freq = song.melody[stepRef.current % song.melody.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + song.tempo / 1000);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + song.tempo / 1000 + 0.05);
        stepRef.current += 1;
        setTick(stepRef.current);
      };
      playNote();
      timerRef.current = setInterval(playNote, song.tempo);
    } catch { /* audio blocked — visual only */ setPlaying(true); }
  };

  useEffect(() => {
    const timer = timerRef;
    const audio = audioRef;
    const ctx = ctxRef;
    return () => {
      if (timer.current) clearInterval(timer.current);
      audio.current?.pause();
      void ctx.current?.close().catch(() => {});
      ctx.current = null;
    };
  }, []);

  return { playing, tick, play, stop };
}

export default function Jukebox({ onToast }: { onToast: (m: string) => void }) {
  const [activeId, setActiveId] = useState(songs[0].id);
  const song = songs.find((s) => s.id === activeId)!;
  const { playing, tick, play, stop } = useSongPlayer(song);
  const bars = Array.from({ length: 24 }, (_, i) => i);

  const selectSong = (id: string) => {
    stop();
    setActiveId(id);
    const s = songs.find((x) => x.id === id);
    if (s) onToast(`now spinning: “${s.title}” ${s.emoji}`);
  };

  return (
    <section id="jukebox" className="relative px-4 py-24 md:py-32">
      <SectionHeading
        kicker="chapter 04 — the jukebox 🎧"
        title={<>our songs, <span style={{ color: song.color }}>on loop</span></>}
        sub="press play. feel things. no refunds."
        color={song.color}
      />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* track list */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
          {songs.map((s) => {
            const active = s.id === activeId;
            return (
              <motion.button
                key={s.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectSong(s.id)}
                className={`flex min-w-[240px] items-center gap-3 rounded-2xl border-[3px] border-[#14122b] p-3 text-left shadow-[4px_4px_0_#000] transition lg:min-w-0 ${
                  active ? "bg-[#FFF6E9]" : "bg-[#1b1840] hover:bg-[#26225c]"
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#14122b] text-2xl" style={{ background: s.color }}>
                  {s.emoji}
                </span>
                <span>
                  <span className={`font-display block text-base font-extrabold leading-tight ${active ? "text-[#14122b]" : "text-white"}`}>{s.title}</span>
                  <span className={`block text-xs font-bold ${active ? "text-[#14122b]/60" : "text-white/50"}`}>{s.artist} • {s.mood}</span>
                </span>
                {active && <span className="ml-auto animate-bounce text-lg">▶</span>}
              </motion.button>
            );
          })}
        </div>

        {/* player */}
        <AnimatePresence mode="wait">
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 24, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="sticker-card relative overflow-hidden rounded-3xl p-6 md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-2" style={{ background: song.color }} />
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* vinyl */}
              <motion.div
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                className="relative h-36 w-36 shrink-0 rounded-full border-4 border-[#14122b] bg-[#14122b] shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
              >
                <div className="absolute inset-4 rounded-full bg-[repeating-radial-gradient(circle,#222_0_2px,#111_2px_4px)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#14122b] text-2xl" style={{ background: song.color }}>
                    {song.emoji}
                  </span>
                </div>
              </motion.div>
              <div className="text-center sm:text-left">
                <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#14122b]/50">{song.mood}</p>
                <h3 className="font-display text-3xl font-extrabold leading-tight text-[#14122b]">{song.title}</h3>
                <p className="font-bold text-[#14122b]/60">{song.artist}</p>
                <p className="font-hand mt-2 text-2xl leading-snug text-[#14122b]/80">{song.description}</p>
              </div>
            </div>

            {/* equalizer */}
            <div className="mt-6 flex h-16 items-end justify-center gap-1.5" aria-hidden>
              {bars.map((b) => (
                <motion.span
                  key={b}
                  animate={playing ? { height: [8, 12 + ((b * 13 + tick * 7) % 48), 10] } : { height: 8 }}
                  transition={{ duration: 0.3 }}
                  className="w-2.5 rounded-full border border-[#14122b]"
                  style={{ background: b % 2 ? song.color : "#14122b" }}
                />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={play}
                className="font-display rounded-full border-[3px] border-[#14122b] px-8 py-2.5 text-lg font-extrabold text-[#14122b] shadow-[4px_4px_0_#14122b] transition hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: song.color }}
              >
                {playing ? "⏸ pause the feelings" : "▶ play our song"}
              </button>
              {song.link && (
                <a href={song.link} target="_blank" rel="noreferrer" className="font-display text-sm font-bold uppercase tracking-widest text-[#14122b]/60 underline decoration-wavy underline-offset-4 hover:text-[#14122b]">
                  open in spotify ↗
                </a>
              )}
            </div>
            <p className="mt-4 text-center text-[11px] text-[#14122b]/50">
              {song.audioSrc
                ? `playing file: ${song.audioSrc}`
                : <>demo synth playing ♥ — add your mp3 in <code className="rounded bg-black/10 px-1">/public/music/</code> + set <code className="rounded bg-black/10 px-1">audioSrc</code> in <code className="rounded bg-black/10 px-1">src/data/songs.ts</code></>}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
