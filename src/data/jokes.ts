// ─────────────────────────────────────────────
//  INSIDE JOKES — click-to-reveal lab cards.
//  `setup` shows first, `punchline` reveals on flip.
//  Add as many as you want. `secret: true` hides it
//  until all others are found (easter egg).
// ─────────────────────────────────────────────

export type Joke = {
  id: string;
  tag: string;
  setup: string;
  punchline: string;
  emoji: string;
  color: string;
  secret?: boolean;
};

export const jokes: Joke[] = [
  {
    id: "pigeon",
    tag: "lore #001",
    setup: "Why do we nod at every pigeon we see?",
    punchline: "Because Kevin watches. Kevin ALWAYS watches. 🐦 (replace with your real pigeon story)",
    emoji: "🐦",
    color: "#4D96FF",
  },
  {
    id: "fridge",
    tag: "lore #002",
    setup: "What is the 'fridge rule'?",
    punchline: "If you open my fridge, you've signed a contract to stay for 3 more hours. No exceptions.",
    emoji: "🧊",
    color: "#FF6B9D",
  },
  {
    id: "voice-note",
    tag: "lore #003",
    setup: "What's our world-record voice note?",
    punchline: "11 minutes, 47 seconds. Topic: literally nothing. Oscar-worthy pacing though.",
    emoji: "🎙️",
    color: "#6BCB77",
  },
  {
    id: "password",
    tag: "lore #004",
    setup: "What would our password be if we were hackers?",
    punchline: "definitely NOT 'password123'. It's 'password1234' — we're professionals.",
    emoji: "💻",
    color: "#FFD93D",
  },
  {
    id: "snack",
    tag: "lore #005",
    setup: "Fries or nuggets?",
    punchline: "Wrong question. Answer: BOTH, plus the drink we said we didn't want.",
    emoji: "🍟",
    color: "#FF9F45",
  },
  {
    id: "alarm",
    tag: "lore #006",
    setup: "Why do we set 7 alarms and wake up at alarm #8?",
    punchline: "Because growth is a journey and the bed is very persuasive.",
    emoji: "⏰",
    color: "#9B5DE5",
  },
  {
    id: "vault-secret",
    tag: "CLASSIFIED",
    setup: "🎉 SECRET FILE UNLOCKED 🎉",
    punchline: "You clicked EVERYTHING. As suspected: nosy, brilliant, 10/10 bestie material. This joke is just to say — I adore you.",
    emoji: "🕵️",
    color: "#00BBF9",
    secret: true,
  },
];
