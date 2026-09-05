"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "@/data/birthday";
import { PixelButton, PixelPanel, StageShell } from "./pixel-ui";
import { birthdayAudio } from "@/lib/birthday-audio";

type GameState = "ready" | "playing" | "dead" | "won";

type Obstacle = {
  x: number;
  w: number;
  h: number;
  variant: number;
  passed: boolean;
};

// ── STAGE 4: custom pixel runner ──
// ELMIRA runs → jumps over 6 boys → reaches ARIFA (girl) → hug!
// Background music is global (thoseeyes.mp3) — continues across stages.
export function StageGame({ onNext }: { onNext: () => void }) {
  const cfg = birthdayConfig.game;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<GameState>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [jumps, setJumps] = useState(0);
  const [rewardOk, setRewardOk] = useState(true);
  const [, forceSprite] = useState(0);
  const stateRef = useRef<GameState>("ready");
  const rafRef = useRef(0);

  const friendName = (cfg as { friendName?: string }).friendName ?? "ELMIRA";
  const goalName = (cfg as { goalName?: string }).goalName ?? "ARIFA";

  // preload optional custom sprites (silent fallback to canvas-drawn pixels)
  // NOTE: ready-flags live in refs so image onload never restarts the game loop.
  const friendImg = useRef<HTMLImageElement | null>(null);
  const meImg = useRef<HTMLImageElement | null>(null);
  const friendReady = useRef(false);
  const meReady = useRef(false);
  useEffect(() => {
    const f = new Image();
    f.src = cfg.friendSprite;
    f.onload = () => {
      friendReady.current = true;
      forceSprite((v) => v + 1);
    };
    f.onerror = () => {
      friendReady.current = false;
    };
    friendImg.current = f;
    const m = new Image();
    m.src = cfg.meSprite;
    m.onload = () => {
      meReady.current = true;
      forceSprite((v) => v + 1);
    };
    m.onerror = () => {
      meReady.current = false;
    };
    meImg.current = m;
  }, [cfg.friendSprite, cfg.meSprite]);

  const setBoth = (s: GameState) => {
    stateRef.current = s;
    setState(s);
  };

  const start = useCallback(() => {
    birthdayAudio.unlock();
    birthdayAudio.pop();
    setScore(0);
    setJumps(0);
    setBoth("playing");
  }, []);

  // ── core loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(300, rect.width);
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // physics / world — YAVAŞ ve rahat ayar
    const groundY = () => H - 46;
    let playerY = 0; // height above ground
    let vy = 0;
    let jumping = false;
    const GRAV = 0.72;
    const JUMP_V = 13.2;
    const BASE_SPEED = 3.6; // biraz hızlandırıldı (önce 3.0)
    const MAX_SPEED = 4.5; // hafif rampayla
    const SPEED_RAMP = 2500; // yüksek = hız neredeyse sabit
    let speed = BASE_SPEED;
    let dist = 0;
    let frame = 0;
    let obstacles: Obstacle[] = [];

    // ── TAM 6 ERKEK — hepsi baştan sahada, skorla senkron ──
    const TOTAL_BOYS = 6;
    const goalDist = cfg.goalDistance;
    const FIRST_HIT = 250; // ilk erkekle karşılaşma skoru (m)
    const HIT_GAP = 150; // erkekler arası skor mesafesi → 250, 400, 550, 700, 850, 1000
    const HIT_X = 84; // temas anındaki o.x (oyuncu önü)
    // skor 1m = 1/0.6 px — hızdan bağımsız sabit oran (dist += speed*0.6, o.x -= speed)
    let passedCount = 0;
    const placeBoys = () => {
      obstacles = [];
      for (let i = 0; i < TOTAL_BOYS; i++) {
        const h = 32 + Math.random() * 10; // alçak → tek zıplayış yeter
        obstacles.push({
          x: HIT_X + (FIRST_HIT + i * HIT_GAP) / 0.6,
          w: 34,
          h,
          variant: i % 6,
          passed: false,
        });
      }
    };
    placeBoys();

    // kavuşma animasyonu
    let playerX = 64;
    let winT = 0;

    const clouds = Array.from({ length: 5 }, (_, i) => ({ x: Math.random() * 800, y: 20 + Math.random() * 70, s: 0.6 + Math.random() * 0.8, i }));
    let hills = 0;
    let deadFlash = 0;

    const doJump = () => {
      if (stateRef.current !== "playing") return;
      if (!jumping) {
        jumping = true;
        vy = JUMP_V;
        birthdayAudio.jump();
        setJumps((j) => j + 1);
      }
    };
    (canvas as HTMLCanvasElement & { __jump?: () => void }).__jump = doJump;

    const key = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (stateRef.current === "ready") start();
        else if (stateRef.current === "dead" || stateRef.current === "won") {
          // ignore — use buttons (avoids accidental restart)
        } else doJump();
      }
    };
    window.addEventListener("keydown", key);

    const PX = 3; // pixel block size for chunky look
    const drawPixelRect = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x / PX) * PX, Math.round(y / PX) * PX, Math.round(w / PX) * PX, Math.round(h / PX) * PX);
    };

    const drawNameTag = (cx: number, y: number, name: string, bg = "#3A2B2B") => {
      ctx.font = "10px 'Press Start 2P', monospace";
      const w = ctx.measureText(name).width + 14;
      const x = cx - w / 2;
      ctx.fillStyle = bg;
      ctx.fillRect(x, y - 16, w, 18);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y - 16, w, 18);
      ctx.fillStyle = "#fff";
      ctx.fillText(name, x + 7, y - 3);
    };

    // oynayan kız — ELMIRA (kırmızı elbiseli, uzun siyah saçlı)
    const drawFriend = (x: number, gy: number, runFrame: number, squash: number) => {
      if (friendImg.current && friendReady.current && friendImg.current.complete && friendImg.current.naturalWidth > 0) {
        const s = 52;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(friendImg.current, x - 6, gy - playerY - s + squash, s, s);
        drawNameTag(x + 20, gy - playerY - 58 + squash, friendName, "#E63946");
        return;
      }
      const y0 = gy - playerY;
      const legSwing = runFrame % 2 === 0 ? 5 : -5;
      // shadow
      ctx.fillStyle = "rgba(58,43,43,.18)";
      ctx.beginPath();
      ctx.ellipse(x + 16, gy + 8, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // uzun siyah saç (bele kadar)
      drawPixelRect(x, y0 - 52, 32, 12, "#1d1d1f");
      drawPixelRect(x - 3, y0 - 42, 7, 30, "#1d1d1f");
      drawPixelRect(x + 28, y0 - 42, 7, 30, "#1d1d1f");
      // face
      drawPixelRect(x + 4, y0 - 42, 24, 16, "#ffd9b3");
      drawPixelRect(x + 8, y0 - 36, 4, 4, "#3A2B2B");
      drawPixelRect(x + 20, y0 - 36, 4, 4, "#3A2B2B");
      drawPixelRect(x + 12, y0 - 30, 8, 3, "#c2255c");
      // bow
      drawPixelRect(x + 22, y0 - 54, 10, 8, "#FFD93D");
      // kırmızı elbise
      drawPixelRect(x + 4, y0 - 26, 24, 14, "#E63946");
      drawPixelRect(x + 2, y0 - 14, 28, 6, "#B91C1C");
      // legs
      drawPixelRect(x + 8 + legSwing * 0.4, y0 - 8, 6, 8, "#ffd9b3");
      drawPixelRect(x + 18 - legSwing * 0.4, y0 - 8, 6, 8, "#ffd9b3");
      // arm
      drawPixelRect(x + 28, y0 - 24, 6, 10, "#ffd9b3");
      drawNameTag(x + 16, y0 - 56, friendName, "#E63946");
    };

    // finalde BEKLEYEN kız — ARIFA (kahverengi elbiseli, kızıl saçlı, koşmaz)
    const drawGoalGirl = (x: number, gy: number, t: number, happy: boolean) => {
      if (meImg.current && meReady.current && meImg.current.complete && meImg.current.naturalWidth > 0) {
        const s = 56;
        ctx.imageSmoothingEnabled = false;
        const bob = happy ? Math.abs(Math.sin(t / 10)) * -8 : Math.sin(t / 30) * 2;
        ctx.drawImage(meImg.current, x, gy - s + bob, s, s);
        drawNameTag(x + s / 2, gy - s + bob - 8, goalName, "#8B5E34");
        return;
      }
      const jump = happy ? Math.abs(Math.sin(t / 10)) * -8 : 0;
      const y0 = gy + Math.sin(t / 30) * 1.5 + jump;
      ctx.fillStyle = "rgba(58,43,43,.18)";
      ctx.beginPath();
      ctx.ellipse(x + 16, gy + 8, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // el sallıyor (beklerken)
      const wave = Math.sin(t / 10) * 5;
      drawPixelRect(x + 26, y0 - 46 + wave, 6, 14, "#ffd9b3");
      // diğer elinde kahve bardağı ☕
      drawPixelRect(x - 6, y0 - 30, 6, 10, "#ffd9b3");
      drawPixelRect(x - 8, y0 - 36, 10, 8, "#fff");
      drawPixelRect(x - 8, y0 - 36, 10, 3, "#6F4E37");
      // kızıl saç
      drawPixelRect(x - 2, y0 - 54, 36, 14, "#C1440E");
      drawPixelRect(x - 2, y0 - 42, 6, 22, "#C1440E");
      drawPixelRect(x + 28, y0 - 42, 6, 22, "#C1440E");
      // face
      drawPixelRect(x + 4, y0 - 44, 24, 16, "#ffd9b3");
      drawPixelRect(x + 8, y0 - 38, 4, 4, "#3A2B2B");
      drawPixelRect(x + 20, y0 - 38, 4, 4, "#3A2B2B");
      drawPixelRect(x + 11, y0 - 32, 10, 3, "#c2255c");
      // kahverengi elbise
      drawPixelRect(x + 4, y0 - 28, 24, 14, "#8B5E34");
      drawPixelRect(x + 2, y0 - 14, 28, 6, "#6F4E37");
      // bacaklar bitişik — BEKLİYOR, koşmuyor
      drawPixelRect(x + 9, y0 - 8, 6, 8, "#3A2B2B");
      drawPixelRect(x + 18, y0 - 8, 6, 8, "#3A2B2B");
      // heart above head
      ctx.font = "16px serif";
      ctx.fillText("💖", x + 6, y0 - 60 + Math.sin(t / 12) * 3);
      drawNameTag(x + 16, y0 - 60, goalName, "#8B5E34");
    };

    // 6 yakışıklı erkek tipi — sarışın, esmer, kumral, koyu kahve, açık kahve, kızıl
    const HEAD_COLORS = ["#ffdbac", "#f1c27d", "#e0ac69", "#c68642", "#8d5524", "#ffc9a3"];
    const HAIR = ["#f7dc6f", "#232323", "#9c6b30", "#4a2f18", "#6b4a2b", "#c1440e"];
    const drawHead = (o: Obstacle, gy: number) => {
      const v = o.variant % 6;
      const x = o.x;
      const y0 = gy - o.h;
      // shadow
      ctx.fillStyle = "rgba(58,43,43,.15)";
      ctx.beginPath();
      ctx.ellipse(x + o.w / 2, gy + 8, o.w / 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      const skin = HEAD_COLORS[v];
      const hair = HAIR[v];
      // neck + head block
      drawPixelRect(x + 8, y0 + o.h - 10, o.w - 16, 10, skin);
      drawPixelRect(x, y0, o.w, o.h - 10, skin);
      // ears
      drawPixelRect(x - 3, y0 + 12, 4, 8, skin);
      drawPixelRect(x + o.w - 1, y0 + 12, 4, 8, skin);
      // saç bazı (herkes)
      drawPixelRect(x - 2, y0 - 6, o.w + 4, 12, hair);
      if (v === 0) {
        // sarışın — yana taralı perçem
        drawPixelRect(x + 2, y0 + 4, o.w - 10, 6, hair);
        drawPixelRect(x + o.w - 10, y0 + 4, 8, 10, hair);
      } else if (v === 1) {
        // esmer — kısa kesim
        drawPixelRect(x - 2, y0 - 9, o.w + 4, 6, hair);
      } else if (v === 2) {
        // kumral — dalgalı, yanlar uzun
        drawPixelRect(x - 3, y0 + 2, 6, 16, hair);
        drawPixelRect(x + o.w - 3, y0 + 2, 6, 16, hair);
        drawPixelRect(x + 6, y0 + 4, o.w - 12, 5, hair);
      } else if (v === 3) {
        // koyu kahve — perde (curtain)
        drawPixelRect(x - 2, y0 + 2, 10, 14, hair);
        drawPixelRect(x + o.w - 8, y0 + 2, 10, 14, hair);
      } else if (v === 4) {
        // açık kahve — havalı quiff
        drawPixelRect(x + 2, y0 - 14, o.w - 4, 10, hair);
        drawPixelRect(x + o.w - 10, y0 - 10, 10, 8, hair);
      } else {
        // kızıl — kıvırcık
        drawPixelRect(x - 4, y0 - 2, 8, 8, hair);
        drawPixelRect(x + 6, y0 - 10, 10, 8, hair);
        drawPixelRect(x + o.w - 6, y0 - 10, 10, 8, hair);
      }
      if (v === 3) {
        // havalı gözlük 😎
        drawPixelRect(x + 5, y0 + 9, 11, 12, "#3A2B2B");
        drawPixelRect(x + o.w - 16, y0 + 9, 11, 12, "#3A2B2B");
        drawPixelRect(x + 16, y0 + 13, o.w - 32, 3, "#3A2B2B"); // köprü
        drawPixelRect(x + 7, y0 + 11, 7, 8, "#9db8c9"); // cam parlaması
        drawPixelRect(x + o.w - 14, y0 + 11, 7, 8, "#9db8c9");
      } else {
        // kaşlar
        drawPixelRect(x + 7, y0 + 6, 8, 3, hair);
        drawPixelRect(x + o.w - 15, y0 + 6, 8, 3, hair);
        // düzgün gözler — simetrik, parlak bakış
        drawPixelRect(x + 7, y0 + 12, 8, 8, "#fff");
        drawPixelRect(x + o.w - 15, y0 + 12, 8, 8, "#fff");
        drawPixelRect(x + 9, y0 + 14, 4, 5, "#3A2B2B");
        drawPixelRect(x + o.w - 13, y0 + 14, 4, 5, "#3A2B2B");
        drawPixelRect(x + 10, y0 + 15, 2, 2, "#fff"); // göz parlaması ✨
        drawPixelRect(x + o.w - 12, y0 + 15, 2, 2, "#fff");
      }
      // kendinden emin gülüş 😏
      const mouthY = y0 + 25;
      drawPixelRect(x + o.w / 2 - 6, mouthY, 12, 3, "#7a3b3b");
      drawPixelRect(x + o.w / 2 + 4, mouthY - 3, 4, 3, "#7a3b3b"); // yan sırıtma
      if (v === 1) {
        // esmer — hafif kirli sakal
        drawPixelRect(x + 8, mouthY + 4, o.w - 16, 3, "#23232355");
      }
      if (v === 5) {
        // kızıl — çiller
        drawPixelRect(x + 5, y0 + 22, 3, 3, "#a05a2c");
        drawPixelRect(x + o.w - 8, y0 + 22, 3, 3, "#a05a2c");
      }
      // label
      ctx.fillStyle = "#3A2B2B";
      ctx.font = "9px 'Press Start 2P', monospace";
      ctx.fillText("!!", x + o.w / 2 - 7, y0 - 18);
    };

    const reset = () => {
      playerY = 0;
      vy = 0;
      jumping = false;
      speed = BASE_SPEED;
      dist = 0;
      placeBoys();
      passedCount = 0;
      playerX = 64;
      winT = 0;
      deadFlash = 0;
    };
    (canvas as HTMLCanvasElement & { __reset?: () => void }).__reset = reset;

    const doWin = () => {
      // havada kazanırsa Elmira havada asılı kalmasın — yere indir (uçma bug fix)
      playerY = 0;
      vy = 0;
      jumping = false;
      setBoth("won");
      winT = 0;
      birthdayAudio.fanfare();
      setBest((b) => Math.max(b, Math.floor(dist)));
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.55 }, shapes: ["square"] });
      const end = Date.now() + 1800;
      const f2 = () => {
        confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, shapes: ["square"] });
        confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, shapes: ["square"] });
        if (Date.now() < end) requestAnimationFrame(f2);
      };
      f2();
    };

    const loop = () => {
      frame++;
      // bg
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#FFF1E8";
      ctx.fillRect(0, 0, W, H);
      // sun
      ctx.fillStyle = "#FFD93D";
      ctx.fillRect(W - 76, 18, 52, 52);
      ctx.fillStyle = "#3A2B2B";
      ctx.fillRect(W - 76, 18, 52, 4);
      ctx.fillRect(W - 76, 66, 52, 4);
      ctx.fillRect(W - 76, 18, 4, 52);
      ctx.fillRect(W - 20, 18, 4, 52);
      // clouds
      ctx.fillStyle = "#ffffff";
      clouds.forEach((c) => {
        c.x -= speed * 0.2 * c.s;
        if (c.x < -70) c.x = W + 40;
        const y = c.y;
        ctx.fillRect(c.x, y, 46 * c.s, 14 * c.s);
        ctx.fillRect(c.x + 8 * c.s, y - 8 * c.s, 28 * c.s, 10 * c.s);
      });
      // hills
      hills -= speed * 0.4;
      ctx.fillStyle = "#FFC9D6";
      for (let i = -1; i < 8; i++) {
        const hx = ((i * 180 + hills) % (W + 360) + W + 360) % (W + 360) - 180;
        ctx.beginPath();
        ctx.arc(hx, groundY() + 46, 90, Math.PI, 0);
        ctx.fill();
      }
      // ground
      const gy = groundY();
      ctx.fillStyle = "#6BCB77";
      ctx.fillRect(0, gy, W, H - gy);
      ctx.fillStyle = "#3A2B2B";
      ctx.fillRect(0, gy, W, 4);
      // moving dashes
      ctx.fillStyle = "rgba(58,43,43,.25)";
      const off = (dist * 2) % 46;
      for (let x = -46; x < W + 46; x += 46) {
        ctx.fillRect(x - off, gy + 18, 24, 5);
      }
      // floating hearts
      ctx.font = "14px serif";
      for (let i = 0; i < 3; i++) {
        const hx = (frame * 0.6 + i * 260) % (W + 60);
        ctx.globalAlpha = 0.5;
        ctx.fillText("💖", W - hx, 60 + Math.sin((frame + i * 50) / 24) * 10 + i * 26);
        ctx.globalAlpha = 1;
      }

      if (stateRef.current === "playing") {
        dist += speed * 0.6;
        speed = Math.min(MAX_SPEED, BASE_SPEED + dist / SPEED_RAMP);
        const s = Math.floor(dist);
        setScore((prev) => (prev === s ? prev : s));

        // physics
        if (jumping) {
          playerY += vy;
          vy -= GRAV;
          if (playerY <= 0) {
            playerY = 0;
            jumping = false;
            vy = 0;
          }
        }
        // erkekler baştan sahada (placeBoys) — sonradan doğma yok
        // move + collide
        const px = playerX;
        const pw = 32;
        const ph = 52;
        const pTop = gy - playerY - ph;
        const pBot = gy - playerY;
        for (const o of obstacles) {
          o.x -= speed;
          const oTop = gy - o.h;
          const oBot = gy;
          const overlapX = px + pw - 8 > o.x + 4 && px + 8 < o.x + o.w - 4;
          const overlapY = pBot - 4 > oTop + 6 && pTop < oBot;
          if (overlapX && overlapY) {
            setBoth("dead");
            birthdayAudio.hit();
            deadFlash = 14;
            setBest((b) => Math.max(b, Math.floor(dist)));
            break;
          }
          if (!o.passed && o.x + o.w < px) {
            o.passed = true;
            passedCount++;
            birthdayAudio.pop();
          }
        }
        obstacles = obstacles.filter((o) => o.x > -60);

        // win? — 6 oğlanın hepsi geçildikten SONRA (sonuncusu arkada kalmadan bitirme)
        if (dist >= goalDist && passedCount >= TOTAL_BOYS) {
          // son engel ekrandan çıksın, sonra kazan
          obstacles = [];
          doWin();
        }
      }

      // ── final kızı + kavuşma ──
      // ARIFA sonda sabit bekler, koşmaz — 6 oğlan bitmeden görünmez
      // ARIFA başlangıca 3/4 yaklaştı — orijinal mesafenin 1/4'ü kaldı
      const goalX = 64 + ((W - 150 - 64) / 4);

      if (stateRef.current === "won") {
        winT++;
        // güvenlik: won sırasında yerde kal (havada kazanılmışsa süzülmesin)
        playerY = 0;
        vy = 0;
        jumping = false;
        // ELMIRA cidden ARIFA'ya doğru koşar
        const target = goalX - 38;
        if (playerX < target) {
          playerX = Math.min(target, playerX + 3.2);
        }
        // toz efekti koşarken
        if (playerX < target && winT % 8 === 0) {
          ctx.fillStyle = "rgba(58,43,43,.2)";
          ctx.beginPath();
          ctx.ellipse(playerX + 8, gy + 6, 10, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        playerX = 64;
      }

      const hugged = stateRef.current === "won" && playerX >= goalX - 40;
      // ARIFA sadece 6 oğlan da geçildikten sonra görünür
      const allBoysDone = passedCount >= TOTAL_BOYS || stateRef.current === "won";
      if (allBoysDone) {
        drawGoalGirl(goalX, gy, frame, stateRef.current === "won");
      }
      // finish flag (sadece 6 oğlan bitince, oynarken)
      if (allBoysDone && stateRef.current === "playing") {
        const fx = W - 60;
        drawPixelRect(fx, gy - 90, 5, 90, "#3A2B2B");
        const wave = Math.sin(frame / 12) * 3;
        drawPixelRect(fx + 5, gy - 90 + wave, 34, 22, "#FF6B9D");
        ctx.fillStyle = "#fff";
        ctx.font = "8px 'Press Start 2P', monospace";
        ctx.fillText(goalName, fx + 6, gy - 75 + wave);
      }

      // player (ELMIRA) — won'da da koşar halde çizilir
      const squash = jumping ? 0 : Math.sin(frame / 6) * 1.5;
      const runFrame = Math.floor(frame / 8);
      drawFriend(playerX, gy, runFrame, stateRef.current === "won" && !hugged ? 0 : squash);
      for (const o of obstacles) drawHead(o, gy);

      // sarılma kalpleri — kavuşunca büyük kalp
      if (stateRef.current === "won" && hugged) {
        ctx.font = "26px serif";
        const bounce = Math.sin(frame / 10) * 5;
        ctx.fillText("💖", (playerX + goalX) / 2 + 6, gy - 78 + bounce);
        ctx.font = "15px serif";
        ctx.fillText("💕", (playerX + goalX) / 2 - 16, gy - 60 + Math.sin(frame / 14) * 4);
        ctx.fillText("💕", (playerX + goalX) / 2 + 30, gy - 62 + Math.cos(frame / 12) * 4);
      }

      // dead flash
      if (deadFlash > 0) {
        deadFlash--;
        ctx.fillStyle = `rgba(255,60,90,${deadFlash / 40})`;
        ctx.fillRect(0, 0, W, H);
      }

      // score chip drawn in DOM (not canvas) — but draw distance ticks
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCanvasTap = () => {
    const canvas = canvasRef.current as (HTMLCanvasElement & { __jump?: () => void }) | null;
    if (stateRef.current === "ready") start();
    else canvas?.__jump?.();
  };

  const retry = () => {
    const canvas = canvasRef.current as (HTMLCanvasElement & { __reset?: () => void }) | null;
    canvas?.__reset?.();
    start();
  };

  const progress = Math.min(1, score / cfg.goalDistance);

  return (
    <StageShell kicker="🏃‍♀️ STAGE 3 / 7 — RUN GAME" title={cfg.title} subtitle={cfg.subtitle}>
      <PixelPanel className="z-10 w-full max-w-4xl p-3 md:p-5">
        {/* HUD */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="pixel-font text-[10px] text-[#3A2B2B] md:text-xs">
            DISTANCE: {score}m <span className="text-[#8a6a6a]">/ {cfg.goalDistance}m</span>
          </div>
          <div className="pixel-font text-[10px] text-[#8a6a6a] md:text-xs">
            BEST: {Math.max(best, score)}m • {jumps} jumps
          </div>
        </div>
        {/* reunion progress */}
        <div className="mb-3 flex items-center gap-2">
          <div className="relative h-4 flex-1 overflow-hidden rounded-full border-[3px] border-[#3A2B2B] bg-[#FFD8D8]">
            <motion.div className="h-full" style={{ background: "#FF6B9D", width: `${progress * 100}%` }} />
            <span className="absolute left-1 top-0 text-[10px] leading-3">{"▮".repeat(Math.floor(progress * 20))}</span>
          </div>
        </div>

        {/* canvas */}
        <div className="pixel-frame relative">
          <canvas
            ref={canvasRef}
            onPointerDown={onCanvasTap}
            className="block h-[300px] w-full cursor-pointer touch-none select-none md:h-[380px]"
          />
          {/* overlays */}
          <AnimatePresence>
            {state === "ready" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#3A2B2B]/55 p-4 text-center"
              >
                <div className="mt-4">
                  <PixelButton onClick={start} color="#FF6B9D">
                    START ▶
                  </PixelButton>
                </div>
              </motion.div>
            )}
            {state === "dead" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#3A2B2B]/60 p-4 text-center"
              >
                <p className="pixel-font mt-2 text-xs text-white md:text-sm">OPPS! You touch a boy. Retry!</p>
                <p className="pixel-soft mt-1 text-xl text-white/85">
                  you ran {score}m — {cfg.goalDistance - score}m to go. try again!
                </p>
                <div className="mt-4 flex gap-3">
                  <PixelButton onClick={retry} color="#FF6B9D" small>
                    ↻ RUN AGAIN
                  </PixelButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="pixel-font text-[9px] text-[#8a6a6a] md:text-[10px]">
            <span className="hidden md:inline">⌨️ {cfg.instructionsDesktop}</span>
            <span className="md:hidden">👆 {cfg.instructionsMobile}</span>
          </p>
          {state === "playing" && (
            <button
              onClick={onCanvasTap}
              className="pixel-font rounded-lg border-[3px] border-[#3A2B2B] bg-[#FFD93D] px-4 py-2 text-[10px] text-[#3A2B2B] shadow-[3px_3px_0_#3A2B2B] active:translate-y-0.5 active:shadow-none md:hidden"
            >
              ⬆ JUMP!
            </button>
          )}
        </div>
      </PixelPanel>

      {/* victory card */}
      <AnimatePresence>
        {state === "won" && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="z-10 mt-5 w-full max-w-4xl">
            <PixelPanel className="p-5 text-center md:p-7" color="#FFF6E9">
              <div className="text-5xl">💖🏁💖</div>
              <h3 className="pixel-font mt-3 text-sm text-[#3A2B2B] md:text-lg">{cfg.victoryTitle}</h3>
              {/* reunion photo */}
              <div className="mx-auto mt-4 max-w-sm">
                {rewardOk ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cfg.rewardPhoto}
                    alt="photo of us two"
                    onError={() => setRewardOk(false)}
                    className="pixel-frame w-full object-cover"
                  />
                ) : (
                  <div className="pixel-frame flex flex-col items-center gap-2 bg-gradient-to-br from-[#FF6B9D] to-[#FFD93D] p-8 text-center">
                    <div className="text-6xl">👯‍♀️💖</div>
                    <p className="pixel-font text-[10px] text-white" style={{ textShadow: "2px 2px 0 #3A2B2B" }}>
                      US 💖 (photo goes here: /images/us-together.png)
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <PixelButton onClick={onNext} color="#6BCB77">
                  {cfg.continueText}
                </PixelButton>
              </div>
            </PixelPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </StageShell>
  );
}
