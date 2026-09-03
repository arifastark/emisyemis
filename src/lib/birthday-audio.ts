// ─────────────────────────────────────────────
//  Reusable chiptune + file audio engine.
//  - SFX (pop/blow/fanfare/...) via WebAudio synth, starts after first gesture
//  - Background music: ONE global <audio> instance playing
//    "/audio/thoseeyes.mp3" on loop across ALL stages.
//    Never restarts on stage change, keeps playback position.
//    Only stops via explicit user control or page close.
// ─────────────────────────────────────────────
"use client";

export const GLOBAL_MUSIC_SRC = "/audio/thoseeyes.mp3";
const GLOBAL_MUSIC_VOLUME = 0.8;

class BirthdayAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  // ── single global background music instance ──
  private globalAudio: HTMLAudioElement | null = null;
  private userStopped = false;
  private interactionListenersBound = false;
  muted = false;
  unlocked = false;

  /** Must be called from a click/tap handler once (enables WebAudio SFX). */
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
    if (this.globalAudio) this.globalAudio.muted = m;
  }

  private bindFirstInteractionRetry() {
    if (this.interactionListenersBound) return;
    if (typeof window === "undefined" || typeof document === "undefined") return;
    this.interactionListenersBound = true;
    const retry = () => {
      if (this.userStopped) return;
      const el = this.globalAudio;
      if (el && el.paused) {
        void el.play().catch(() => {});
      } else if (!el) {
        this.playGlobalMusic();
        return;
      }
      // Once playing, no need to keep listening.
      if (this.globalAudio && !this.globalAudio.paused) {
        document.removeEventListener("pointerdown", retry);
        document.removeEventListener("keydown", retry);
        document.removeEventListener("touchstart", retry);
        this.interactionListenersBound = false;
      }
    };
    document.addEventListener("pointerdown", retry);
    document.addEventListener("keydown", retry);
    document.addEventListener("touchstart", retry);
  }

  /**
   * Start (or resume) the single global background track.
   * Idempotent: never restarts, never resets playback position.
   * If autoplay is blocked, retries after the user's first interaction.
   */
  playGlobalMusic() {
    if (typeof window === "undefined") return;
    this.userStopped = false;
    // Already have the one global instance → just resume, keep position.
    if (this.globalAudio) {
      this.globalAudio.muted = this.muted;
      if (this.globalAudio.paused) {
        void this.globalAudio.play().catch(() => {
          this.bindFirstInteractionRetry();
        });
      }
      return;
    }
    // Create the ONE global instance.
    const el = new Audio(GLOBAL_MUSIC_SRC);
    el.loop = true;
    el.preload = "auto";
    el.muted = this.muted;
    el.volume = GLOBAL_MUSIC_VOLUME;
    this.globalAudio = el;
    void el.play().catch(() => {
      // Autoplay blocked — start after first user gesture.
      this.bindFirstInteractionRetry();
    });
  }

  /** Explicit user stop/pause. Preserves playback position for resume. */
  stopGlobalMusic() {
    this.userStopped = true;
    if (this.globalAudio) {
      try {
        this.globalAudio.pause();
      } catch {
        // ignore
      }
    }
  }

  /**
   * Explicit user stop only (used by the music control).
   * Stages must NOT call this on navigation — music continues across stages.
   */
  stopBackground() {
    this.stopGlobalMusic();
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
  /** Short blowing/wind noise for candle blow-out. */
  blow() {
    this.unlock();
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    if (this.muted) return;
    try {
      const ctx = this.ctx;
      const master = this.master;
      const dur = 0.9;
      const t = ctx.currentTime;
      const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.Q.value = 0.7;
      bp.frequency.setValueAtTime(1000, t);
      bp.frequency.exponentialRampToValueAtTime(320, t + dur);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2400;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.6, t + 0.12);
      g.gain.exponentialRampToValueAtTime(0.28, t + 0.45);
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.62);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(bp);
      bp.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + dur + 0.05);
    } catch {
      // fall back to soft descending puff so blow-out still has feedback
      this.sfx([500, 380, 260], 90, "sine", 0.12);
    }
  }
  success() { this.sfx([523, 659, 784, 1047], 90, "square", 0.2); }
  fail() { this.sfx([300, 220], 140, "sawtooth", 0.14); }
  jump() { this.sfx([400, 700], 60, "square", 0.14); }
  hit() { this.sfx([200, 120], 120, "sawtooth", 0.22); }
  fanfare() { this.sfx([523, 523, 523, 659, 784, 1047, 784, 1047], 110, "square", 0.2); }
  click() { this.sfx([880], 0, "square", 0.12); }
}

// singleton
export const birthdayAudio = new BirthdayAudio();
