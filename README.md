# A Birthday Game for My Best Friend

<img src="public/logo.jpg" alt="Birthday logo" width="180" />

A pixel-art birthday adventure I built for my best friend's 20th birthday. It plays as a short 8-stage journey in a single page: blow out the candles, collect 20 wishes, outrun the boys, pass the quiz, revisit memories, read everyone's messages, and hit the finale.

## The Journey

| # | Stage | What happens |
|---|-------|--------------|
| 0 | Intro | Welcome screen and the big start button |
| 1 | Cake | An interactive cake — blow out the "20" candles to proceed |
| 2 | 20 Wishes | One hidden wish behind every candle, 20 in total |
| 3 | Run Game | A canvas runner: jump over 6 boys and reach Arifa at the finish |
| 4 | Quiz | A 4-question friendship test with instant feedback |
| 5 | Memories | A photo gallery, browsed one memory at a time |
| 6 | Messages | Birthday texts arriving WhatsApp-style, with typing indicators |
| 7 | Finale | Fireworks, confetti, and a replay button |

Every background is dressed with hand-cut coquette stickers that drift, react to the mouse, and pop with confetti when tapped.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion for animation and stage transitions
- canvas-confetti for celebrations
- One global music loop (`public/audio/thoseeyes.mp3`) that keeps playing across all stages without restarting

## Editing the Content

All copy lives in a single config file: `src/data/birthday.ts`

- Stage titles, subtitles, and button labels: `birthdayConfig`
- The 20 wishes: the `wishes` array (exactly 20 entries)
- Quiz questions, accepted answers, and replies: `quizQuestions`
- Gallery photos and captions: `memories`
- Chat messages and senders: `friendMessages`
- Runner tuning (goal distance, sprites, reward photo): `birthdayConfig.game`

Assets live under `public/`: gallery photos in `public/memories/`, the logo in `public/logo.jpg`, background stickers in `public/deco/`, music in `public/audio/` and `public/music/`. Missing images never crash the game — a drawn placeholder is shown instead.

## Run It

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

```bash
npm run build
npm start
```

## Deploy

Import this repo as a new Vercel project — the framework and commands are detected automatically. The project name becomes the site address (for example, `elmira20` gives `elmira20.vercel.app`).

## License

MIT — see `LICENSE` for details.
