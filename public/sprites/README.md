# 🎂 HOW TO REPLACE ASSETS

Everything is centralized in `src/data/birthday.ts`. You only need this folder + that file.

## Sprites (pixel-art characters)
- `public/sprites/friend.png` → your best friend (the RUNNER in the game). Transparent PNG, ~64x64 or 128x128.
- `public/sprites/me.png` → you (waiting at the FINISH line). Same size.
- If files are missing, the game draws cute built-in pixel characters automatically. No crash.

## Reward photo (after the game)
- `public/images/us-together.png` → photo of you two, shown at the reunion celebration.
- Missing? A cute placeholder card is shown instead.

## Memories
- `public/memories/memory-1.svg` … `memory-6.svg` already exist as placeholders.
- Replace with your JPG/PNG/WEBP photos (keep filenames OR update `src/data/birthday.ts` → `memories[].src`).

## Music (all optional — synth plays if missing)
- `public/music/happy-birthday.mp3` → cake + 20-wishes sections (loops)
- `public/music/memories.mp3` → memories section
- `public/music/game-loop.mp3` → runner game background
- Just drop the mp3 with that exact name. The audio engine auto-detects it.

## Texts
- 20 wishes → `wishes` array in `src/data/birthday.ts` (exactly 20!)
- 10 quiz questions → `quizQuestions` array (question / answers[] / incorrectMessage)
- Final letter → `finalLetter` object
- Names/titles → `birthdayConfig`
