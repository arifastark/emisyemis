// ─────────────────────────────────────────────
//  SITE CONFIG — start here! Replace names/texts.
//  Everything on the site pulls from these files,
//  so you never have to hunt through components.
// ─────────────────────────────────────────────

export const siteConfig = {
  // 👇 REPLACE with your friend's name
  friendName: "Sunshine",
  // secret codename for the whole experience (tab title, envelope stamp)
  codename: "OPERATION EMISYEMIS",
  // hero lines — keep them short & punchy
  heroTitleA: "a tiny universe,",
  heroTitleB: "built for you.",
  heroSubtitle:
    "No boring gallery. No normal portfolio. Just us — the photos, the songs, the stupid jokes — turned into a little adventure.",
  // envelope intro
  envelopeFrom: "your favorite chaos gremlin",
  envelopeWarning: "TOP SECRET • DO NOT OPEN unless you are 100% awesome",
  // finale letter — make it cry-laugh
  finaleLetter: [
    "Okay. Serious mode for 10 seconds. (Yes, I'm capable of it. Barely.)",
    "If you're reading this, you survived the envelope, the embarrassing photos, the cursed quiz and that big red button. Classic you — curious, brave, slightly chaotic.",
    "Thank you for every 2am voice note, every 'you won't BELIEVE what happened', every time you laughed at my joke before I even finished it.",
    "This little website is just a box for the stuff I never say out loud: you're my favorite notification, my emergency contact for nonsense, my human lucky charm.",
    "Now go drink some water, text me something unhinged, and never forget — you are so, so loved. 💛",
  ],
  finaleSign: "— your partner in crime",
  // quiz ranks
  ranks: [
    { min: 0, label: "Certified Stranger 🕵️", note: "Have we even met??" },
    { min: 1, label: "Casual Accomplice 😏", note: "warming up…" },
    { min: 3, label: "Bestie Supreme 👑", note: "you KNOW things." },
    { min: 4, label: "Soulmate (platonic, allegedly) 💛", note: "call the police, we're too iconic." },
  ],
} as const;

export const chapters = [
  { id: "hero", label: "liftoff", emoji: "🚀" },
  { id: "origin", label: "origin story", emoji: "💬" },
  { id: "vault", label: "photo vault", emoji: "📸" },
  { id: "jokes", label: "joke lab", emoji: "🧪" },
  { id: "jukebox", label: "jukebox", emoji: "🎧" },
  { id: "quiz", label: "quiz chaos", emoji: "🎯" },
  { id: "finale", label: "finale", emoji: "💌" },
] as const;
