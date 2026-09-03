// ─────────────────────────────────────────────
//  MEMORIES — replace with your real photos.
//  1. Drop images into /public/memories/ (jpg/png/webp)
//  2. Update `src` below, keep caption/date/sticker.
//  Tip: square-ish photos look best in the deck.
// ─────────────────────────────────────────────

export type Memory = {
  src: string;
  caption: string;
  date: string;
  sticker: string;
  doodle: string;
  backNote: string;
};

export const memories: Memory[] = [
  {
    src: "/memories/memory-1.svg",
    caption: "the day we laughed till we cried",
    date: "summer • 14:32 • too hot to think",
    sticker: "☀️",
    doodle: "100% unhinged",
    backNote: "REPLACE ME: that park afternoon where we forgot time. Click any photo to flip it!",
  },
  {
    src: "/memories/memory-2.svg",
    caption: "emergency snack mission",
    date: "midnight run • snacks > sleep",
    sticker: "🍟",
    doodle: "certified snack experts",
    backNote: "REPLACE ME: the 2am corner-shop run. You + fries = true love.",
  },
  {
    src: "/memories/memory-3.svg",
    caption: "main-character walk",
    date: "golden hour • wind machine: nature",
    sticker: "✨",
    doodle: "iconic behaviour",
    backNote: "REPLACE ME: that walk where we pretended a music video was filming us.",
  },
  {
    src: "/memories/memory-4.svg",
    caption: "the photo we must never show",
    date: "classified • eyes half closed",
    sticker: "🙈",
    doodle: "burn after viewing",
    backNote: "REPLACE ME: blurry, chaotic, perfect. This one stays between us.",
  },
  {
    src: "/memories/memory-5.svg",
    caption: "dance break in the kitchen",
    date: "rainy day • volume: illegal",
    sticker: "🪩",
    doodle: "grammy who?",
    backNote: "REPLACE ME: spoons as microphones. Neighbours complained. Worth it.",
  },
  {
    src: "/memories/memory-6.svg",
    caption: "us vs. the world",
    date: "always • forever • no refunds",
    sticker: "💛",
    doodle: "dynamic duo",
    backNote: "REPLACE ME: your favorite duo shot goes here. The one that feels like home.",
  },
];

export const chatScript = [
  { from: "me" as const, text: "ok hear me out… what if I make you a WEBSITE", delay: 0.1 },
  { from: "you" as const, text: "a WHAT. like… a whole website?? for ME??", delay: 0.25 },
  { from: "me" as const, text: "yes. with our photos. our songs. the cursed jokes.", delay: 0.4 },
  { from: "you" as const, text: "this is either the sweetest thing ever or a trap", delay: 0.55 },
  { from: "me" as const, text: "por qué no los dos 😌", delay: 0.7 },
  { from: "you" as const, text: "i'm scared. continue.", delay: 0.85 },
  { from: "me" as const, text: "scroll down. adventure starts now 👇", delay: 1.0 },
];
