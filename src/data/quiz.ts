export type QuizQ = {
  q: string;
  options: string[];
  correct: number;
  reaction: string;
  roast: string;
};

export const quizQuestions: QuizQ[] = [
  {
    q: "What is our official emergency snack?",
    options: ["Salad (lol)", "Fries + nuggets + regret", "Just water", "Ice cubes, fancy"],
    correct: 1,
    reaction: "CORRECT. You know the food pyramid (ours is fried). 🍟",
    roast: "Salad?? In THIS friendship?? Try again, traitor.",
  },
  {
    q: "What happens if you open my fridge?",
    options: [
      "You leave immediately",
      "You sign a 3-hour stay contract",
      "Nothing",
      "You do the dishes",
    ],
    correct: 1,
    reaction: "Law is law. The fridge has spoken. 🧊",
    roast: "Wrong! Read lore #002 again, bestie.",
  },
  {
    q: "Our world-record voice note length?",
    options: ["2 min", "5 min", "11 min 47 sec of nothing", "We don't do voice notes"],
    correct: 2,
    reaction: "11:47 of pure cinema. Scorsese is shaking. 🎙️",
    roast: "Nope. We YAP professionally. Guess again.",
  },
  {
    q: "How many alarms do we need to wake up?",
    options: ["One. We're disciplined.", "Seven + one emotional support alarm", "Zero, sun wakes us", "What's an alarm?"],
    correct: 1,
    reaction: "8 alarms, 0 regrets. The bed is persuasive. ⏰",
    roast: "Disciplined?? Be serious. One more try.",
  },
];
