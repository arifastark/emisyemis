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
  friendName: "BESTIE",
  age: 20,

  intro: {
    buttonText: "HAZIR MISIN?",
    titleTop: "HAPPY BIRTHDAY",
    titleBig: "20",
    subtitle: "küçük bir piksel macerası seni bekliyor…",
    hint: "sesi açmayı unutma 🔊",
  },

  cake: {
    title: "önce bir dilek tut…",
    subtitle: "mumları söndürmek için üfle ya da dokun!",
    blowButtonText: "ÜFLE! 🎂",
    litMessage: "mumlar yanıyor… dileğini tut!",
    blownMessage: "İYİ Kİ DOĞDUN! 🎉",
    blownSub: "dileğin yıldızlara uçtu — şimdi 20 dilek seni bekliyor",
    continueText: "20 DİLEĞE DEVAM ET →",
    // optional real recording: place file at /public/music/happy-birthday.mp3
    musicSrc: "/music/happy-birthday.mp3",
  },

  wishes: {
    title: "20 MUM • 20 DİLEK",
    subtitle: "her mumu tek tek söndür — her mumda bir dilek saklı 🕯️",
    completeTitle: "20/20! TÜM DİLEKLER AÇILDI ✨",
    completeSub: "senin için 20 küçük evren topladık",
    continueText: "OYUNA DEVAM ET →",
    musicSrc: "/music/happy-birthday.mp3",
  },

  game: {
    title: "KOŞ! BANA ULAŞ! 🏃‍♀️💨",
    subtitle: "komik kafaların üzerinden zıpla — sona ulaş, bana kavuş!",
    instructionsDesktop: "ZIPLA: SPACE / ↑",
    instructionsMobile: "ZIPLA: ekrana dokun 👆",
    goalDistance: 1200, // px-score until reunion (lower = shorter level)
    victoryTitle: "KAVUŞMA! 💖",
    victorySub: "koştun, zıpladın, hepsini atlattın — bana ulaştın!",
    continueText: "SÜRPRİZE DEVAM ET →",
    // sprites — replace with your own pixel art
    friendSprite: "/sprites/friend.png",
    meSprite: "/sprites/me.png",
    rewardPhoto: "/images/us-together.png",
    musicSrc: "/music/game-loop.mp3",
  },

  quiz: {
    title: "BFF QUIZ SHOW 🎯",
    subtitle: "10 soru • klavyeni hazırla • dürüst ol!",
    completeTitle: "10/10 EFSANE! 🏆",
    completeSub: "resmen beni benden iyi tanıyorsun",
    continueText: "ANILARA DEVAM ET →",
  },

  memories: {
    title: "ANILAR 📸",
    subtitle: "teker teker açılan küçük zaman kapsülleri",
    continueText: "SON MEKTUBA DEVAM ET →",
    musicSrc: "/music/memories.mp3",
    hint: "ilerlemek için oka bas / kaydır",
  },

  letter: {
    title: "SON BİR ZARF 💌",
    subtitle: "sana özel, el yapımı bir mektup",
    envelopeHint: "açmak için zarfa dokun 👆",
    continueText: "FİNALE GİT →",
  },

  finale: {
    title: "HAPPY 20",
    subtitle: "iyi ki doğdun, iyi ki varsın 💖",
    replayText: "↻ BAŞTAN OYNA",
  },

  music: {
    label: "🎵",
  },
} as const;

// ─── 20 WISHES — replace with your real 20 wishes ───
// wishes[i] belongs to candle #i+1. Keep exactly 20 entries.
export const wishes: string[] = Array.from({ length: 20 }, (_, i) => {
  const placeholders = [
    "Dilek 1: Her sabah kahkahayla uyanman dileğiyle ☀️ (buraya gerçek dileğini yaz)",
    "Dilek 2: En sevdiğin şarkı çalarken dans etmen dileğiyle 🎶",
    "Dilek 3: Hayallerinin peşinden koşarken hiç yorulmaman dileğiyle 🏃‍♀️",
    "Dilek 4: Cebinde her zaman çikolata olması dileğiyle 🍫",
    "Dilek 5: Sınavlardan / işlerden hep alnının akıyla çıkman dileğiyle ⭐",
    "Dilek 6: En kötü gününde bile seni güldürecek biri olması dileğiyle 💛",
    "Dilek 7: Yeni yaşında bol bol seyahat etmen dileğiyle ✈️",
    "Dilek 8: Kalbinin hep sıcacık kalması dileğiyle 💖",
    "Dilek 9: En komik anıların bu yıl birikmesi dileğiyle 😂",
    "Dilek 10: Yarı yolda bırakmayan dostluklar dileğiyle 🤝",
    "Dilek 11: Aynaya her baktığında gülümsemen dileğiyle 🪞",
    "Dilek 12: Gece 2'de bile arayabileceğin insanlar dileğiyle 🌙",
    "Dilek 13: En sevdiğin yemeği ısmarlayan sürprizler dileğiyle 🍕",
    "Dilek 14: Gökyüzü kadar özgür hissetmen dileğiyle ☁️",
    "Dilek 15: Küçük şeylerden büyük mutluluklar dileğiyle 🌸",
    "Dilek 16: Korkularının küçülüp cesaretinin büyümesi dileğiyle 🦁",
    "Dilek 17: Her fotoğrafında gözlerinin parlaması dileğiyle 📸",
    "Dilek 18: Müzik, kahkaha ve sarılma eksik olmasın dileğiyle 🎈",
    "Dilek 19: 20'li yaşların en efsane yılların olması dileğiyle 🎂",
    "Dilek 20: İyi ki doğdun — iyi ki benim en yakın arkadaşımsın! 💖",
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
    question: "Soru 1: En sevdiğimiz acil durum atıştırmalığı nedir?",
    answers: ["cips", "fries", "patates", "nugget"],
    incorrectMessage: "Haha hayır! İpucu: kızarmış ve pişmanlık içeriyor 🍟 Tekrar dene!",
  },
  {
    question: "Soru 2: Benim buzdolabımı açarsan ne olur?",
    answers: ["3 saat kalırsın", "kalırsın", "3 saat", "gidemezsin"],
    incorrectMessage: "Yanlış! Buzdolabı kanunları açık: açan kalır 🧊",
  },
  {
    question: "Soru 3: Dünya rekoru sesli mesaj süremiz kaç?",
    answers: ["11:47", "11 dakika", "11 dakika 47", "11dk"],
    incorrectMessage: "Yok artık, biz PROFESYONEL gevezeyiz 🎙️ Bir daha düşün!",
  },
  {
    question: "Soru 4: Uyanmak için kaç alarm kurarız?",
    answers: ["8", "sekiz", "7+1", "7", "yedi"],
    incorrectMessage: "Disiplinli?? Bizi tanımıyormuş gibi yapma ⏰",
  },
  {
    question: "Soru 5: Benim kahve siparişim nedir?",
    answers: ["latte", "cappuccino", "filtre kahve", "espresso"],
    incorrectMessage: "Barista ağlıyor şu an ☕ Tekrar dene!",
  },
  {
    question: "Soru 6: İlk tanıştığımız yer neresiydi?",
    answers: ["okul", "park", "kafede", "sınıf"],
    incorrectMessage: "Hafızayı biraz zorla… o günü hatırla! 👀",
  },
  {
    question: "Soru 7: Benim en sevdiğim renk nedir?",
    answers: ["pembe", "pink", "pastel pembe"],
    incorrectMessage: "Değil! İpucu: bu sitenin her yeri o renk 🎀",
  },
  {
    question: "Soru 8: Birlikte izlediğimiz ilk film neydi?",
    answers: ["barbie", "harry potter", "titanic"],
    incorrectMessage: "Mısır patlatıp izlediğimiz o gece… 🍿",
  },
  {
    question: "Soru 9: Ben sinirliyken ne yapmalısın?",
    answers: ["çikolata", "çikolata vermek", "sarılmak", "susmak"],
    incorrectMessage: "Yanlış hamle = tehlike! 🚨 Doğru cevabı biliyorsun!",
  },
  {
    question: "Soru 10: Bu siteyi kim yaptı? (çok zor 😏)",
    answers: ["en yakın arkadaşım", "kankam", "bestiem", "sen"],
    incorrectMessage: "Aşk olsun! Bu kadar emeğe bir doğru cevap lütfen 💖",
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
  { src: "/memories/memory-1.svg", caption: "gülmekten ağladığımız gün", date: "yaz • 14:32 • hava çok sıcak", sticker: "☀️", overlay: "100% kahkaha garantili" },
  { src: "/memories/memory-2.svg", caption: "gece yarısı atıştırmalık operasyonu", date: "00:47 • uyku < cips", sticker: "🍟", overlay: "suç ortağıma selam" },
  { src: "/memories/memory-3.svg", caption: "ana karakter yürüyüşü", date: "golden hour • rüzgar: doğaçlama", sticker: "✨", overlay: "ikonik davranış" },
  { src: "/memories/memory-4.svg", caption: "asla göstermememiz gereken foto", date: "gizli • gözler yarı kapalı", sticker: "🙈", overlay: "görünce yak" },
  { src: "/memories/memory-5.svg", caption: "mutfakta dans molası", date: "yağmurlu gün • ses: son ses", sticker: "🪩", overlay: "kaşık = mikrofon" },
  { src: "/memories/memory-6.svg", caption: "biz dünyaya karşı", date: "her zaman • sonsuza dek", sticker: "💛", overlay: "dinamik ikili" },
];

// ─── FINAL LETTER — replace with your real long letter ───
export const finalLetter = {
  greeting: "Sevgili En Yakın Arkadaşım,",
  paragraphs: [
    "Mektup 1. paragraf (placeholder): 20 yaşına girdin! Bunu yazarken yüzümde kocaman bir gülümseme var, çünkü bu siteyi senin için parça parça, kahkaha ata ata yaptım. (Buraya gerçek mektubunu yapıştır — uzun olabilir, kaydırılabilir.)",
    "Mektup 2. paragraf (placeholder): İyi gününde de kötü gününde de yanında olmak istiyorum. Gece yarısı sesli mesajların, bitmeyen kahkahaların, en saçma esprilere bile gülmen… hepsi benim en sevdiğim şeyler.",
    "Mektup 3. paragraf (placeholder): 20'li yaşlar kocaman bir macera. Korkma, dene, yanıl, gül, ağla, dans et. Ben hep burada olacağım — en ön sırada seni alkışlayan kişi olarak.",
    "Mektup 4. paragraf (placeholder): İyi ki doğdun. İyi ki yollarımız kesişti. İyi ki benim en yakın arkadaşımsın. Bu küçük piksel oyunu sana olan sevgimin yanında minicik kalır, ama umarım bugün seni birazcık daha mutlu eder. 💖",
  ],
  sign: "— seni çok seven kankan 💛",
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
  { id: 0, label: "başlangıç", emoji: "🎈" },
  { id: 1, label: "pasta", emoji: "🎂" },
  { id: 2, label: "20 dilek", emoji: "🕯️" },
  { id: 3, label: "koşu oyunu", emoji: "🏃‍♀️" },
  { id: 4, label: "quiz", emoji: "🎯" },
  { id: 5, label: "anılar", emoji: "📸" },
  { id: 6, label: "mektup", emoji: "💌" },
  { id: 7, label: "happy 20", emoji: "🎉" },
] as const;
