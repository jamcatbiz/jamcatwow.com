import type { LocalStorage } from "$lib/utils/storage.svelte";

export type Game = {
  topWord: string;
  bottomWord: string;
  date: string;
  solutions: Array<Array<string>>;
}

export type Guesses = Array<string>;

export type PageLoadData = {
  todaysGame: Game;
  yesterdaysGame: Game;
}

export type GameData = {
  todaysDateIso: string;
  todaysDateLocale: string;
  todaysGame: Game;
  yesterdaysGame: Game;
  timerDuration: number;
  currentGuess: Array<string>;
  hasResumed: LocalStorage<boolean>;
  hasPlayedToday: boolean;
  isFirstVisit: boolean;
  lastPlayedDate: LocalStorage<string>;
  elapsedTime: LocalStorage<number>;
  progress: LocalStorage<number>;
  timedProgress: LocalStorage<number>;
  points: LocalStorage<number>;
  timedPoints: LocalStorage<number>;
  hasGameOverShown: LocalStorage<boolean>;
  statGamesPlayed: LocalStorage<number>;
  statWordsFound: LocalStorage<number>;
}