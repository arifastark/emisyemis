// ─────────────────────────────────────────────
//  Reusable chiptune + file audio engine.
//  - Starts only after first user gesture (autoplay-safe)
//  - Tries real mp3 (audioSrc) first, falls back to WebAudio synth
//  - Global mute toggle, per-stage background loops
// ─────────────────────────────────────────────
"use client";

type LoopKind = "birthday" | "memories" | "game" | null;

const HAPPY_BIRTHDAY: { f: number; d: number }[] = [
  // "Happy birthday to you" — G G A G C B | G G A G D C ...
  { f: 392.0, d: 0.75 }, { f: 392.0, d: 0.75 }, { f: 440.0, d: 1 },
  { f: 392.0, d: 1 }, { f: 523.25, d: 1 }, { f: 493.88, d: 1.5 },
  { f: 392.0, d: 0.75 }, { f: 392.0, d: 0.75 }, { f: 440.0, d: 1 },
  { f: 392.0, d: 1 }, { f: 587.33, d: 1 }, { f: 523.25, d: 1.5 },
  { f: 392.0, d: 0.75 }, { f: 392.0, d: 0.75 }, { f: 783.99, d: 1 },
  { f: 659.25, d: 1 }, { f: 523.25, d: 1 }, { f: 493.88, d: 1 }, { f: 440.0, d: 1.5 },
  { f: 698.46, d: 0.75 }, { f: 698.46, d: 0.75 }, { f: 659.25, d: 1 },
  { f: 523.25, d: 1 }, { f: 587.33, d: 1 }, { f: 523.25, d: 2 },
];

const MEMORY_LULLABY = [523.25, 587.33, 659.25, 587.33, 523.25, 440.0, 392.0, 440.0, 523.25, 659.25, 783.99, 659.25];
const GAME_LOOP = [262, 330, 392, 523, 392, 330, 294, 330, 392, 440, 523, 440];

class BirthdayAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private loopTimer: number | null = null;
  private loopKind: LoopKind = null;
  private fileAudio: HTMLAudioElement | null = null;
  private fileSrc: string | null = null;
  muted = false;
  unlocked = false;

  /** Must be called from a click/tap handler once. */
  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.5;
      this.master.connect(this.ctx.destination);
    } catch {
      this.ctx = null;
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master && this.ctx) this.master.gain.setValueAtTime(m ? 0 : 0.5, this.ctx.currentTime);
    if (this.fileAudio) this.fileAudio.muted = m;
  }

  private async tryFile(src?: string): Promise<boolean> {
    if (!src) return false;
    try {
      const res = await fetch(src, { method: "HEAD" });
      if (!res.ok) return false;
    } catch {
      return false;
    }
    this.stopFile();
    const el = new Audio(src);
    el.loop = true;
    el.muted = this.muted;
    el.volume = 0.8;
    this.fileAudio = el;
    this.fileSrc = src;
    try {
      await el.play();
      return true;
    } catch {
      return false;
    }
  }

  private stopFile() {
    if (this.fileAudio) {
      this.fileAudio.pause();
      this.fileAudio.src = "";
      this.fileAudio = null;
      this.fileSrc = null;
    }
  }

  private stopSynth() {
    if (this.loopTimer) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.loopKind = null;
  }

  stopBackground() {
    this.stopFile();
    this.stopSynth();
  }

  /** Play a stage background loop: tries mp3, else synth. */
  async playBackground(kind: Exclude<LoopKind, null>, fileSrc?: string) {
    this.unlock();
    if (this.ctx?.state === "suspended") void this.ctx.resume();
    this.stopBackground();
    const ok = await this.tryFile(fileSrc);
    if (ok) return;
    this.loopKind = kind;
    if (kind === "birthday") void this.synthBirthdayLoop();
    else if (kind === "memories") this.synthLoop(MEMORY_LULLABY, 340, "triangle", 0.35);
    else if (kind === "game") this.synthLoop(GAME_LOOP, 150, "square", 0.12);
  }

  private synthLoop(melody: number[], tempoMs: number, type: OscillatorType, vol: number) {
    if (!this.ctx || !this.master) return;
    let i = 0;
    const step = () => {
      if (!this.ctx || !this.master) return;
      this.blip(melody[i % melody.length], tempoMs / 1000, type, vol);
      i++;
      this.loopTimer = window.setTimeout(step, tempoMs);
    };
    step();
  }

  private async synthBirthdayLoop() {
    if (!this.ctx || !this.master) return;
    const beat = 0.42;
    for (const n of HAPPY_BIRTHDAY) {
      if (this.loopKind !== "birthday") return;
      this.blip(n.f, n.d * beat * 0.9, "square", 0.16);
      await new Promise((r) => setTimeout(r, n.d * beat * 1000));
    }
    if (this.loopKind === "birthday") {
      await new Promise((r) => setTimeout(r, 600));
      void this.synthBirthdayLoop();
    }
  }

  private blip(freq: number, durSec: number, type: OscillatorType = "square", vol = 0.2) {
    if (!this.ctx || !this.master || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(vol, 0.001), t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(durSec, 0.08));
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + Math.max(durSec, 0.08) + 0.05);
  }

  // ── one-shot SFX ──
  private sfx(notes: number[], stepMs: number, type: OscillatorType = "square", vol = 0.22) {
    this.unlock();
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    notes.forEach((f, i) => setTimeout(() => this.blip(f, 0.18, type, vol), i * stepMs));
  }
  pop() { this.sfx([660, 880], 70); }
  blow() { this.sfx([800, 600, 400, 200], 90, "sawtooth", 0.12); }
  success() { this.sfx([523, 659, 784, 1047], 90, "square", 0.2); }
  fail() { this.sfx([300, 220], 140, "sawtooth", 0.14); }
  jump() { this.sfx([400, 700], 60, "square", 0.14); }
  hit() { this.sfx([200, 120], 120, "sawtooth", 0.22); }
  fanfare() { this.sfx([523, 523, 523, 659, 784, 1047, 784, 1047], 110, "square", 0.2); }
  click() { this.sfx([880], 0, "square", 0.12); }
}

// singleton
export const birthdayAudio = new BirthdayAudio();
