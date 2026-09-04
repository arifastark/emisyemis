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
    src: "/memories/e1.jpg",
    caption: "Gel ve bax, gece nece yaraşır sene",
    date: "summer • 14:32 • too hot to think",
    sticker: "☀️",
    doodle: "100% unhinged",
    backNote: "REPLACE ME: that park afternoon where we forgot time. Click any photo to flip it!",
  },
  {
    src: "/memories/e2.jpg",
    caption: "2026 — bir yerde qeyd etdiyimiz ilk Yeni il",
    date: "midnight run • snacks > sleep",
    sticker: "🍟",
    doodle: "certified snack experts",
    backNote: "REPLACE ME: the 2am corner-shop run. You + fries = true love.",
  },
  {
    src: "/memories/e3.jpg",
    caption: "Satqınlıq edib başqa komandada olduğun o Hackathon (aramızda qarlı dağlar)",
    date: "golden hour • wind machine: nature",
    sticker: "✨",
    doodle: "iconic behaviour",
    backNote: "REPLACE ME: that walk where we pretended a music video was filming us.",
  },
  {
    src: "/memories/e4.jpg",
    caption: "you're my sunshine, my only sunshine",
    date: "classified • eyes half closed",
    sticker: "🙈",
    doodle: "burn after viewing",
    backNote: "REPLACE ME: blurry, chaotic, perfect. This one stays between us.",
  },
  {
    src: "/memories/e6.jpg",
    caption: "Daha bir Hackathon",
    date: "always • forever • no refunds",
    sticker: "💛",
    doodle: "dynamic duo",
    backNote: "REPLACE ME: your favorite duo shot goes here. The one that feels like home.",
  },
  {
    src: "/memories/e7.jpg",
    caption: "Qorxu filmi adı ile gedib, Aysu ile gülmekden yere uzandığımız o film date",
    date: "no filter • just vibes",
    sticker: "📸",
    doodle: "frame this one",
    backNote: "REPLACE ME: the surprise good photo in a sea of blurry ones.",
  },
  {
    src: "/memories/e8.jpg",
    caption: "because no one else in the world matters more to me than you do, you're my pack",
    date: "24/7 • no days off",
    sticker: "😎",
    doodle: "trouble x2",
    backNote: "REPLACE ME: together we have exactly one braincell and we share it well.",
  },
  {
    src: "/memories/e10.jpg",
    caption: "Hackathonda uduzandan sonra boynunun borcu senin keyfini açmaq olan bir eded Arife",
    date: "good vibes only",
    sticker: "💫",
    doodle: "certified cuteness",
    backNote: "REPLACE ME: told you it gets better.",
  },
  {
    src: "/memories/e12.jpg",
    caption: "Peerstack",
    date: "landscape mode: happy",
    sticker: "🌈",
    doodle: "wide-screen happiness",
    backNote: "REPLACE ME: some memories need a wider frame.",
  },
  {
    src: "/memories/e14.jpg",
    caption: "Basketball date",
    date: "game on • hoops",
    sticker: "🏀",
    doodle: "swish",
    backNote: "REPLACE ME: basketball date.",
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
