export type Song = {
  id: string;
  title: string;
  artist: string;
  mood: string;
  description: string;
  color: string;
  emoji: string;
  melody: number[];
  tempo: number;
  audioSrc?: string;
  link?: string;
};
export const songs: Song[] = [
  {
    id: "liftoff",
    title: "Midnight Snack Run",
    artist: "DJ Fridge Light",
    mood: "for chaotic car rides",
    description: "REPLACE ME: the song we scream in the car with windows down. Windows UP if neighbours are home.",
    color: "#FF6B9D",
    emoji: "🚗",
    melody: [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392.0, 523.25, 659.25, 783.99, 1046.5],
    tempo: 170,
    link: "https://open.spotify.com",
  },
  {
    id: "soft",
    title: "Golden Hour Hearts",
    artist: "The Pillow Fort Band",
    mood: "for soft park evenings",
    description: "REPLACE ME: our slow one. For lying on grass, doing nothing, being everything.",
    color: "#FFD93D",
    emoji: "🌅",
    melody: [392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 392.0, 523.25, 587.33, 523.25, 440.0, 392.0],
    tempo: 260,
  },
  {
    id: "chaos",
    title: "Kitchen Disco Panic",
    artist: "Spoon Microphonez",
    mood: "for unhinged dance breaks",
    description: "REPLACE ME: spoons up. Volume illegal. Dance like the pasta water is watching.",
    color: "#00BBF9",
    emoji: "🪩",
    melody: [659.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 523.25, 659.25, 880.0, 1046.5, 880.0],
    tempo: 140,
  },
  {
    id: "lullaby",
    title: "2AM Voice Note Blues",
    artist: "Sleep? Never Heard of Her",
    mood: "for late-night oversharing",
    description: "REPLACE ME: for the 11-minute voice notes about absolutely nothing and everything.",
    color: "#9B5DE5",
    emoji: "🌙",
    melody: [329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 261.63, 329.63, 392.0, 523.25, 392.0],
    tempo: 300,
  },
];