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
    continueText: "CONTINUE",
  },

  wishes: {
    title: "20 CANDLES • 20 WISHES",
    subtitle: "blow out each candle one by one — a wish hides in every flame 🕯️",
    completeTitle: "20/20! ALL WISHES UNLOCKED ✨",
    completeSub: "we collected 20 tiny universes for you",
    continueText: "CONTINUE",
  },

  game: {
    title: "RUN FROM THE BOYS! REACH ME!",
    subtitle: "Jump over the boys and escape them • reach Arifa",
    instructionsDesktop: "JUMP: SPACE / ↑",
    instructionsMobile: "JUMP: tap the screen 👆",
    goalDistance: 1000,
    friendName: "ELMIRA",
    goalName: "ARIFA",
    victoryTitle: "You escaped the boys and reached me. Well done!",
    victorySub: "You escaped the boys and reached me. Well done!",
    continueText: "CONTINUE",
    friendSprite: "/sprites/friend.png",
    meSprite: "/sprites/me.png",
    rewardPhoto: "/us.jpg",
  },

  quiz: {
    title: "BFF QUIZ SHOW 🎯",
    subtitle: "4 questions • type your answer • be honest!",
    completeTitle: "4/4 PERFECT!",
    completeSub: "",
    continueText: "CONTINUE",
  },

  memories: {
    title: "MEMORIES 📸",
    subtitle: "tiny time capsules opening one by one",
    continueText: "CONTINUE",
    hint: "press the arrow / swipe to move on",
  },

  letter: {
    title: "BIRTHDAY MESSAGES 💬",
    subtitle: "your friends got together and wrote you something",
    groupName: "Elmira's Birthday 🎂",
    groupSub: "friends • online",
    notice: "06/09/2026",
    continueText: "CONTINUE",
  },

  finale: {
    title: "HAPPY 20",
    subtitle: "happy birthday, my best best bestie",
    replayText: "↻ PLAY AGAIN",
  },

  music: {
    label: "🎵",
  },
} as const;

export const wishes: string[] = [
  "Ümid edirəm ki, 20 yaşında olduğu kimi, 40 yaşında da ən yaxın dostun mən olaram (onsuz da başqa şansın yoxdur).",
  "İnanıram ki, Arifə bir də tənbəllik edib sənin əsəblərinlə oynamayacaq.",
  "Bu yaşında mütləq o xəyalındakı möhtəşəm soyuducuya qovuşmalısan.",
  "Gündə 500 dəfə \"Oğlanlar yaramır, başını burax\" adlı romanımı sənə oxusam da, ümid edirəm ki, bu il xəyalındakı relationshipi taparsan.",
  "Tək arzum bir gün o qədər varlanmağındır ki, mənim işləməyimə ehtiyac qalmasın.",
  "Bu yaşında məni danlamağa bir az ara verəcəyinə inanıram.",
  "Bir də harasa gedəndə açarı evdə unutmayasan.",
  "Arifənin sənin dediklərini vaxtında etdiyi bir il olsun.",
  "Yeni laptopunla Aysu ilə gözəl oyunlar arzulayıram.",
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
    question: "Mənə ən çox .... olduğuma görə əsəbləşirsən. (nöqtələrin yerinə uyğun sözü yaz)",
    placeholder: "bir söz yaz…",
    answers: ["tənbəl", "tenbel"],
    correctMessage: "Düzdü, tapşırdığın şeyləri heç vaxt vaxtında etmirəm, amma bu il edəcəm.",
    incorrectMessage:
      "Səhvdi, cavab “tənbəl” olmalı idi. Kül başına, bütün gün dediyini vaxtında etmirəm deyə dalaşırıq, amma bu il edəcəm.",
  },
  {
    question: "Mənə hansı rəng paltar geyinməyə icazə vermirsən?",
    placeholder: "rəngi yaz…",
    answers: ["ağ", "ag"],
    correctMessage: "Düz, üstümə nəsə tökərəm deyə icazə vermirsən.",
    incorrectMessage:
      "Səhvdi, ağ olmalı idi. Üstümə nəsə tökərəm deyə icazə vermirsən.",
  },
  {
    question:
      "Hər dəfə fürsət düşəndə mənə verdiyin o seçim əsaslı kritik sualın başlanğıc hissəsi necə idi?",
    placeholder: "sualın başlanğıcını yaz…",
    answers: [
      "arifə, dünyada təkcə filankəs və sən qalsaydın",
      "arife, dunyada tekce filankes ve sen qalsaydin",
      "əgər dünyada filankəs və sən qalsaydın",
      "eger dunyada filankes ve sen qalsaydin",
    ],
    correctMessage: "Doğrudur!",
    incorrectMessage:
      "Səhvdi. Cavab: “Arifə, dünyada təkcə filankəs və sən qalsaydın...” olmalı idi. Hər dəfə fərqli adamı filankəsin yerinə qoymağına baxmayaraq “yox” cavabı aldığın o sual. Yox, Elmira, yoxxxxxx!",
  },
  {
    question: "Bu həyatdakı ən mükəmməl olan və ən çox sevdiyin şəxsin adı nədir?",
    placeholder: "adı yaz…",
    answers: ["arifə", "arife"],
    correctMessage: "Düzdür, təbii ki də Arifə!",
    incorrectMessage: "Başa düşmədim, mənə qarşı bu nə hərəkətdir? Cavab Arifə olmalı idi!",
  },
];

export type Memory = {
  src: string;
  caption: string;
  sticker: string;
};

export const memories: Memory[] = [
  { src: "/memories/e1.jpg", caption: "Gel ve bax, gece nece yaraşır sene", sticker: "☀️" },
  { src: "/memories/e2.jpg", caption: "2026 — bir yerde qeyd etdiyimiz ilk Yeni il", sticker: "🍟" },
  { src: "/memories/e3.jpg", caption: "Satqınlıq edib başqa komandada olduğun o Hackathon (aramızda qarlı dağlar)", sticker: "✨" },
  { src: "/memories/e4.jpg", caption: "you're my sunshine, my only sunshine", sticker: "🙈" },
  { src: "/memories/e6.jpg", caption: "Daha bir Hackathon", sticker: "💛" },
  { src: "/memories/e7.jpg", caption: "Qorxu filmi adı ile gedib, Aysu ile gülmekden yere uzandığımız o film date", sticker: "📸" },
  { src: "/memories/e8.jpg", caption: "because no one else in the world matters more to me than you do, you're my pack", sticker: "😎" },
  { src: "/memories/e10.jpg", caption: "Hackathonda uduzandan sonra boynunun borcu senin keyfini açmaq olan bir eded Arife", sticker: "💫" },
  { src: "/memories/e12.jpg", caption: "Peerstack", sticker: "🌈" },
  { src: "/memories/e14.jpg", caption: "Basketball date", sticker: "🏀" },
  { src: "/memories/e15.jpg", caption: "with Günel", sticker: "💛" },
  { src: "/memories/e16.jpg", caption: "Sema ile date", sticker: "📸" },
  { src: "/memories/e17.jpg", caption: "ohh my shaylaa", sticker: "🌈" },
  { src: "/memories/e18.jpg", caption: "with Narmin", sticker: "☀️" },
  { src: "/memories/e19.jpg", caption: "yaxşı oğlan pizza söhbeti elemez", sticker: "😎" },
  { src: "/memories/e22.jpg", caption: "😲", sticker: "😲" },
  { src: "/memories/e20.jpg", caption: "kalite kontrol", sticker: "💫" },
];

export type FriendMessage = {
  name: string;
  text: string;
  time?: string;
};

export const friendMessages: FriendMessage[] = [
  { name: "Nərmin", text: "Emişim, ürəyim, hər şeyim😌 ad günün mübarək olsun. 🎉sən mənim hər anımda hər zaman yanımda olmusan. 🫂yaxşı ki,varsan.❤️bu yaşın sənə bol uğur və çoxlu pul gətirsin hər şey ürəyincə olsun. anın tadını çıkar baby😃💋öpdüm balamı.səni sevirəm aşkım.", time: "00:00" },
  { name: "Səma", text: "Askm menim . Canim Elmiram. Seni tebrik edirem ❤️. Heyatda sene her seyin en gozelini arzu edirem. Cunki sen buna laiqsen🩷. Sen menim ucun cox deyerlisen. Men seni ozume yalniz dost , sirdas kimi yox eyni zamanda dogmam ailem bacim kimi gorurem. Bu heyatda meni evimde hissetdirecek tek tuk insanlardan biri ve demek olarki ilki sensen❤️. Mende son nefesime qeder sene ev olmaga calisacam. Seni cooox ama cooox istyrem💋. Sen menim en gözel şansimsan🧡\nYaxsiki varsan heyatim🫂", time: "00:00" },
  { name: "Günel", text: "Aşkmmmm ad günün mübarek💋💋 Bu yeni yaşında qabağına tam senin istediyin kimi birini çıxartsın və çox başarılı olasan Aminnn", time: "00:00" },
  { name: "Aysu", text: "elmıraaa,dostum ad gunun mubarek🥳yaxşı kı doğulmusan.senın gunun 💜.yenı yasında ugurlar ve xosbextlık arzulayıram🙏🏿seninle bırlıkde kıno baxmağı ve oyun oynamağı cox sevırem senıde sevırem. yenı yasında sene yenı herfler arzulayıram🤣🤣🤣.yaxsıkı varsan yoxsa gozumuzu kım açardı🥺🥺🥺🥺🥺🥺🥺🥺❤️", time: "00:00" },
  { name: "Sübhan", text: "Ad gününüz mübarək Emiş xanım, yeni kompüteriniz mübarəkdi.", time: "00:00" },
  { name: "Arifə", text: "Əslində deyiləsi elə də sözüm yoxdu. Sadəcə bunu yazanda backgroundda Paster “İnanıram” mahnısı oxunurdu. Səni ilk dəfə görəndə “Daxilində bir nur gördüm, xaricində büllur”. İndi isə “Sənlə yaşamağı öyrəndim, sənsiz ölməyə də yox meylim”. Sən mənim isti gecələrdə yastığımın soyuq tərəfisən. Səni sevirəm. Bu qədər.", time: "00:00" },
];

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

export const assets = {
  friendSprite: "/sprites/friend.png",
  meSprite: "/sprites/me.png",
  rewardPhoto: "/us.jpg",
  cakeSprite: "/images/cake.png",
} as const;

export const stages = [
  { id: 0, label: "start", emoji: "🎈" },
  { id: 1, label: "cake", emoji: "🎂" },
  { id: 2, label: "20 wishes", emoji: "🕯️" },
  { id: 3, label: "run game", emoji: "🏃‍♀️" },
  { id: 4, label: "quiz", emoji: "🎯" },
  { id: 5, label: "memories", emoji: "📸" },
  { id: 6, label: "messages", emoji: "💬" },
  { id: 7, label: "happy 20", emoji: "🎉" },
] as const;
