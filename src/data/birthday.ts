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
//   /public/audio/thoseeyes.mp3  → the ONE global background music track (loops on all stages)
//  Background music is a single global player — see src/lib/birthday-audio.ts.
// ─────────────────────────────────────────────────────────────

export const birthdayConfig = {
  friendName: "ELMIRA",
  age: 20,

  intro: {
    buttonText: "ARE YOU READY?",
    titleTop: "HAPPY BIRTHDAY",
    titleBig: "20",
    subtitle: "A tiny pixel adventure for your birthday",
    hint: "don't forget to turn the sound on 🔊",
  },

  cake: {
    title: "first, make a wish…",
    subtitle: "Tap / Blow to put out the candles!",
    blowButtonText: "BLOW! 🎂",
    litMessage: "candles are lit… make a wish!",
    blownMessage: "HAPPY BIRTHDAY! 🎉",
    blownSub: "your wish flew to the stars — now 20 wishes await you",
    continueText: "CONTINUE TO 20 WISHES →",
  },

  wishes: {
    title: "20 CANDLES • 20 WISHES",
    subtitle: "blow out each candle one by one — a wish hides in every flame 🕯️",
    completeTitle: "20/20! ALL WISHES UNLOCKED ✨",
    completeSub: "we collected 20 tiny universes for you",
    continueText: "CONTINUE TO THE GAME →",
  },

  game: {
    title: "RUN FROM THE BOYS! REACH ME!",
    subtitle: "Jump over the boys and escape them • reach Arifa",
    instructionsDesktop: "JUMP: SPACE / ↑",
    instructionsMobile: "JUMP: tap the screen 👆",
    goalDistance: 1000, // 5 engel, aralar ~8cm (~300px)
    friendName: "ELMIRA", // oynayan kız
    goalName: "ARIFA", // finalde bekleyen kız
    victoryTitle: "You escaped the boys and reached me. Well done!",
    victorySub: "You escaped the boys and reached me. Well done!",
    continueText: "Continue",
    // sprites — replace with your own pixel art
    friendSprite: "/sprites/friend.png",
    meSprite: "/sprites/me.png",
    rewardPhoto: "/images/us-together.png",
  },

  quiz: {
    title: "BFF QUIZ SHOW 🎯",
    subtitle: "5 sual • cavabı yaz • dürüst ol!",
    completeTitle: "5/5 PERFECT!",
    completeSub: "",
    continueText: "XATİRƏLƏRƏ DAVAM ET →",
  },

  memories: {
    title: "MEMORIES 📸",
    subtitle: "tiny time capsules opening one by one",
    continueText: "CONTINUE TO THE FINAL LETTER →",
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

// ─── 20 WISHES — final content (do not edit wording/order) ───
// wishes[i] belongs to candle #i+1. Keep exactly 20 entries.
export const wishes: string[] = [
  "Ümid edirəm ki, 20 yaşında olduğu kimi, 40 yaşında da ən yaxın dostun mən olaram (onsuz da başqa şansın yoxdur).",
  "İnanıram ki, Arifə bir də tənbəllik edib sənin əsəblərinlə oynamayacaq.",
  "Bu yaşında mütləq o xəyalındakı möhtəşəm soyuducuya qovuşmalısan, başqa variant yoxdur!",
  "Gündə 500 dəfə \"Oğlanlar yaramır, başını burax\" adlı romanımı sənə oxusam da, ümid edirəm ki, bu il xəyalındakı relationshipi taparsan.",
  "Tək arzum bir gün o qədər varlanmağındır ki, mənim işləməyimə ehtiyac qalmasın.",
  "Bu yaşında məni danlamağa bir az ara verəcəyinə inanıram.",
  "Bir də harasa gedəndə açarı evdə unutmayasan.",
  "Arifənin sənin dediklərini vaxtında etdiyi bir il olsun.",
  "Yeni laptopunla sənə bu il xoşbəxtliklər arzu edirəm.",
  "Bu yaşında bir də camaat içində yıxılıb 1000 aura itirməyəsən.",
  "İmtahanda köçürəndə tutulmayacaq qədər \"professional\" olasan.",
  "Ümid edirəm ki, bir də avtobusa minəndə bank kartında problem olmaz.",
  "İnanıram ki, bu il kiminsə mesajını \"screenshot\" edəndə səhvən həmin adamın özünə yox, mənə atmağı bacaracaqsan.",
  "Gün o gün olsun ki, səninlə \"Instagram Blend\" edəndə artıq insanların qarşısına normal videolar çıxsın.",
  "Bu yaşında bir də hansısa məxluqa görə ağlamayacağına inanıram, əks halda əlimdə qalacaqsan.",
  "Gün o gün olsun ki, sənə zəng etmək istəyəndə nömrənin əvvəli +994 yox, +1 ilə başlasın.",
  "Ümid edirəm ki, hər zaman mənim yanımda olarsan, çünki mənim axmaqlıqlarıma Elmiradan başqa heç kim dözə bilməz.",
  "Söz verirəm ki, xoşbəxt və ya qəmli olduğun hər anda sağında və ya solunda (sağla solu ayıra bilməsəm də) məni görəcəksən.",
  "Qarşılaşacağın hər kəs sənə sənin mənə davrandığın kimi davransın və səni mənim sevdiyim qədər sevsin.",
  "20 yaşında bütün xoşbəxtliklər səninlə olsun. Ad günün mübarək!",
];

// ─── QUIZ — 5 sual. Hamısı azərbaycanca. ───
// `answers`: düzgün cavablar (kiçik/böyük hərf fərqi yoxdur, Ə/ə uyğunluğu var).
// `correctMessage`: düz cavabda göstərilir. `incorrectMessage`: səhv cavabda
// doğru cavabla birlikdə göstərilir — hər ikisindən sonra növbəti suala keçilir.
export type QuizQuestion = {
  question: string;
  placeholder?: string;
  answers: string[];
  correctMessage?: string;
  incorrectMessage: string;
  hint?: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "İlk tanış olduğumuz tarixin gün nömrəsi nə idi? (məs: 9, 7, 18)",
    placeholder: "gün nömrəsini yaz…",
    answers: ["15"],
    correctMessage: "DÜZGÜN! Yaddaşın əla işləyir!",
    incorrectMessage: "Ayıb olsun. Doğru cavab: 15 idi!",
  },
  {
    question: "Mənə ən çox .... olduğuma görə əsəbləşirsən. (nöqtələrin yerinə uyğun sözü yaz)",
    placeholder: "bir söz yaz…",
    answers: ["tənbəl", "tenbel"],
    correctMessage: "DÜZGÜN! Bəli, tənbəl!",
    incorrectMessage:
      "Yox e! Doğru cavab: Tənbəl idi. Kül başına, bütün gün dediyimi eləmirəm deyə dalaşırıq.",
  },
  {
    question: "Mənə hansı rəng paltar geyinməyə icazə vermirsən?",
    placeholder: "rəngi yaz…",
    answers: ["ağ", "ag"],
    correctMessage: "DÜZGÜN! Bəli, ağ!",
    incorrectMessage:
      "Yox! Doğru cavab: ağ. Üstümə nəsə tökərəm deyə ağ geyinməyə icazə vermirsən.",
  },
  {
    question:
      "Mənə hər fürsət düşəndə verdiyin o mistik seçimli həyat sualının başlanğıc hissəsi necə idi?",
    placeholder: "sualın başlanğıcını yaz…",
    answers: ["əgər dünyada filankəs və sən qalsaydın", "eger dunyada filankes ve sen qalsaydin"],
    correctMessage: "DÜZGÜN! Bəli, o məşhur sual!",
    incorrectMessage:
      "Yox! Doğru cavab: “Əgər dünyada filankəs və sən qalsaydın...” idi. Milyon dənə insanı filankəsin yerinə qoyub səbrimi sınayıb hər dəfə yox cavabı aldığın o sual.",
  },
  {
    question: "Bu həyatdakı ən mükəmməl olan və ən çox sevdiyin şəxsin adı nədir?",
    placeholder: "adı yaz…",
    answers: ["arifə", "arife"],
    correctMessage: "Təbii ki də Arifə!",
    incorrectMessage: "Ehh Arifə olmalı idi.",
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
