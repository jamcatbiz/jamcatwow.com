import type { LocalStorage } from "$lib/storage.svelte";

export type Game = {
  goalNumbers: Array<number>
  playNumbers: Array<number>;
  date: string;
  solutions: {
    [key: string]: {
      min_operations: Array<string>;
      max_operations: Array<string>;
    }
  }
  gameNumber: number;
}

export type Step = {
  firstNumber: string;
  firstIndex: number;
  operation: string;
  secondNumber: string;
  secondIndex: number;
  solution: string;
}

export type Answers = {
  [key: string]: {
    number: number;
    solved: boolean;
    steps: Array<string>;
    bonusPoints: number;
  }
}

export type Operations = {
  [key: string]: {
    classes: string;
    icon: string;
  }
}

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