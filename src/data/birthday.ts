// ─────────────────────────────────────────────────────────────
//  🎂 BIRTHDAY CONFIG — ★ EDIT EVERYTHING HERE ★
//  This is the ONLY file you need to personalize the whole game.
//  Replace placeholders with your real texts / files.
//
//  ASSET MAP (drop files into /public/...):
//   /public/sprites/friend.png   → pixel-art of your best friend (player)
//   /public/sprites/me.png       → pixel-art of you (goal at end of game)
//   /public/images/us-together.png → reward photo after the runner game
//   /public/memories/*           → memory photos (memory-1..N)
//   /public/music/happy-birthday.mp3 → optional real birthday song
//   /public/music/memories.mp3       → optional memory-section song
//   /public/music/game-loop.mp3      → optional runner-game music
//  If an audioSrc file is missing, the built-in chiptune synth plays.
// ─────────────────────────────────────────────────────────────

export const birthdayConfig = {
  friendName: "ELMIRA",
  age: 20,

  intro: {
    buttonText: "ARE YOU READY?",
    titleTop: "HAPPY BIRTHDAY",
    titleBig: "20",
    subtitle: "a tiny pixel adventure awaits you…",
    hint: "don't forget to turn the sound on 🔊",
  },

  cake: {
    title: "first, make a wish…",
    subtitle: "blow or tap to put out the candles!",
    blowButtonText: "BLOW! 🎂",
    litMessage: "candles are lit… make a wish!",
    blownMessage: "HAPPY BIRTHDAY! 🎉",
    blownSub: "your wish flew to the stars — now 20 wishes await you",
    continueText: "CONTINUE TO 20 WISHES →",
    // optional real recording: place file at /public/music/happy-birthday.mp3
    musicSrc: "/music/happy-birthday.mp3",
  },

  wishes: {
    title: "20 CANDLES • 20 WISHES",
    subtitle: "blow out each candle one by one — a wish hides in every flame 🕯️",
    completeTitle: "20/20! ALL WISHES UNLOCKED ✨",
    completeSub: "we collected 20 tiny universes for you",
    continueText: "CONTINUE TO THE GAME →",
    musicSrc: "/music/happy-birthday.mp3",
  },

  game: {
    title: "RUN! REACH ME! 🏃‍♀️💨",
    subtitle: "jump over the funny heads — reach the finish line, reunite with me!",
    instructionsDesktop: "JUMP: SPACE / ↑",
    instructionsMobile: "JUMP: tap the screen 👆",
    goalDistance: 1200, // px-score until reunion (lower = shorter level)
    victoryTitle: "REUNION! 💖",
    victorySub: "you ran, you jumped, you dodged them all — you reached me!",
    continueText: "CONTINUE TO THE SURPRISE →",
    // sprites — replace with your own pixel art
    friendSprite: "/sprites/friend.png",
    meSprite: "/sprites/me.png",
    rewardPhoto: "/images/us-together.png",
    musicSrc: "/music/game-loop.mp3",
  },

  quiz: {
    title: "BFF QUIZ SHOW 🎯",
    subtitle: "10 questions • get your keyboard ready • be honest!",
    completeTitle: "10/10 LEGENDARY! 🏆",
    completeSub: "you literally know me better than I know myself",
    continueText: "CONTINUE TO MEMORIES →",
  },

  memories: {
    title: "MEMORIES 📸",
    subtitle: "tiny time capsules opening one by one",
    continueText: "CONTINUE TO THE FINAL LETTER →",
    musicSrc: "/music/memories.mp3",
    hint: "press the arrow / swipe to move on",
  },

  letter: {
    title: "ONE LAST ENVELOPE 💌",
    subtitle: "a handmade letter, just for you",
    envelopeHint: "tap the envelope to open it 👆",
    continueText: "GO TO THE FINALE →",
  },

  finale: {
    title: "HAPPY 20",
    subtitle: "happy birthday, so glad you exist 💖",
    replayText: "↻ PLAY AGAIN",
  },

  music: {
    label: "🎵",
  },
} as const;

// ─── 20 WISHES — replace with your real 20 wishes ───
// wishes[i] belongs to candle #i+1. Keep exactly 20 entries.
export const wishes: string[] = Array.from({ length: 20 }, (_, i) => {
  const placeholders = [
    "Wish 1: May you wake up laughing every morning ☀️ (write your real wish here)",
    "Wish 2: May you dance whenever your favorite song plays 🎶",
    "Wish 3: May you never get tired while chasing your dreams 🏃‍♀️",
    "Wish 4: May you always have chocolate in your pocket 🍫",
    "Wish 5: May you ace every exam / crush it at work every time ⭐",
    "Wish 6: May someone always be there to make you laugh on your worst day 💛",
    "Wish 7: May you travel tons in your new age ✈️",
    "Wish 8: May your heart always stay warm and cozy 💖",
    "Wish 9: May this year pile up your funniest memories yet 😂",
    "Wish 10: May your friendships never leave you halfway 🤝",
    "Wish 11: May you smile every time you look in the mirror 🪞",
    "Wish 12: May you have people you can call even at 2am 🌙",
    "Wish 13: May surprise treats of your favorite food find you 🍕",
    "Wish 14: May you feel as free as the sky ☁️",
    "Wish 15: May tiny things bring you giant happiness 🌸",
    "Wish 16: May your fears shrink and your courage grow 🦁",
    "Wish 17: May your eyes sparkle in every photo 📸",
    "Wish 18: May music, laughter and hugs never run out 🎈",
    "Wish 19: May your 20s be your most legendary years 🎂",
    "Wish 20: Happy birthday — so glad you're my best friend! 💖",
  ];
  return placeholders[i];
});

// ─── QUIZ — 10 questions. Edit freely. ───
// `answers`: accepted correct answers (lowercase-compared, trimmed).
// `incorrectMessage`: funny message shown when wrong (you will provide final texts).
export type QuizQuestion = {
  question: string;
  placeholder?: string;
  answers: string[];
  incorrectMessage: string;
  hint?: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Question 1: What is our favorite emergency snack?",
    answers: ["chips", "fries", "potato", "nugget"],
    incorrectMessage: "Haha nope! Hint: fried and full of regret 🍟 Try again!",
  },
  {
    question: "Question 2: What happens if you open my fridge?",
    answers: ["you stay 3 hours", "you stay", "3 hours", "you can't leave"],
    incorrectMessage: "Wrong! Fridge laws are clear: openers stay 🧊",
  },
  {
    question: "Question 3: What is our world-record voice message length?",
    answers: ["11:47", "11 minutes", "11 minutes 47", "11min"],
    incorrectMessage: "No way, we are PROFESSIONAL yappers 🎙️ Think again!",
  },
  {
    question: "Question 4: How many alarms do we set to wake up?",
    answers: ["8", "eight", "7+1", "7", "seven"],
    incorrectMessage: "Disciplined?? Don't act like you don't know us ⏰",
  },
  {
    question: "Question 5: What is my coffee order?",
    answers: ["latte", "cappuccino", "filter coffee", "espresso"],
    incorrectMessage: "The barista is crying right now ☕ Try again!",
  },
  {
    question: "Question 6: Where did we first meet?",
    answers: ["school", "park", "cafe", "classroom"],
    incorrectMessage: "Stretch that memory… remember that day! 👀",
  },
  {
    question: "Question 7: What is my favorite color?",
    answers: ["pink", "pastel pink"],
    incorrectMessage: "Nope! Hint: this whole site is that color 🎀",
  },
  {
    question: "Question 8: What was the first movie we watched together?",
    answers: ["barbie", "harry potter", "titanic"],
    incorrectMessage: "That popcorn night… 🍿",
  },
  {
    question: "Question 9: What should you do when I'm grumpy?",
    answers: ["chocolate", "give chocolate", "hug", "stay quiet"],
    incorrectMessage: "Wrong move = danger! 🚨 You know the right answer!",
  },
  {
    question: "Question 10: Who made this site? (super hard 😏)",
    answers: ["my best friend", "bestie", "you"],
    incorrectMessage: "Come on! One correct answer for all this effort please 💖",
  },
];

// ─── MEMORIES — replace src with your photos in /public/memories/ ───
export type Memory = {
  src: string;
  caption: string;
  date: string;
  sticker: string;
  overlay: string;
};

export const memories: Memory[] = [
  { src: "/memories/memory-1.svg", caption: "the day we laughed till we cried", date: "summer • 14:32 • super hot", sticker: "☀️", overlay: "100% laughs guaranteed" },
  { src: "/memories/memory-2.svg", caption: "midnight snack operation", date: "00:47 • sleep < chips", sticker: "🍟", overlay: "shoutout to my partner in crime" },
  { src: "/memories/memory-3.svg", caption: "main character walk", date: "golden hour • wind: improvised", sticker: "✨", overlay: "iconic behavior" },
  { src: "/memories/memory-4.svg", caption: "the photo we must never show", date: "classified • eyes half closed", sticker: "🙈", overlay: "burn after viewing" },
  { src: "/memories/memory-5.svg", caption: "kitchen dance break", date: "rainy day • volume: max", sticker: "🪩", overlay: "spoon = microphone" },
  { src: "/memories/memory-6.svg", caption: "us against the world", date: "always • forever", sticker: "💛", overlay: "dynamic duo" },
];

// ─── FINAL LETTER — replace with your real long letter ───
export const finalLetter = {
  greeting: "Dear Best Friend,",
  paragraphs: [
    "Letter paragraph 1 (placeholder): You turned 20! I'm grinning so big writing this, because I built this site for you piece by piece, laughing the whole way. (Paste your real letter here — long is fine, it's scrollable.)",
    "Letter paragraph 2 (placeholder): I want to be by your side on good days and bad days. Your midnight voice notes, your endless laughter, how you laugh even at my silliest jokes… those are all my favorite things.",
    "Letter paragraph 3 (placeholder): Your 20s are a giant adventure. Don't be afraid — try, fail, laugh, cry, dance. I'll always be here — front row, cheering the loudest for you.",
    "Letter paragraph 4 (placeholder): Happy birthday. So glad our paths crossed. So glad you're my best friend. This tiny pixel game is nothing next to how much I love you, but I hope it makes your day a little happier. 💖",
  ],
  sign: "— your bestie who loves you tons 💛",
};

// ─── SPRITES / IMAGES — file paths to replace later ───
export const assets = {
  friendSprite: "/sprites/friend.png",
  meSprite: "/sprites/me.png",
  rewardPhoto: "/images/us-together.png",
  cakeSprite: "/images/cake.png",
} as const;

// ─── STAGE ORDER (do not change unless you know what you do) ───
export const stages = [
  { id: 0, label: "start", emoji: "🎈" },
  { id: 1, label: "cake", emoji: "🎂" },
  { id: 2, label: "20 wishes", emoji: "🕯️" },
  { id: 3, label: "run game", emoji: "🏃‍♀️" },
  { id: 4, label: "quiz", emoji: "🎯" },
  { id: 5, label: "memories", emoji: "📸" },
  { id: 6, label: "letter", emoji: "💌" },
  { id: 7, label: "happy 20", emoji: "🎉" },
] as const;
