import type { LocalStorage } from "$lib/storage.svelte"

export type Board = Array<Array<string>>

export type Swaps = {
  count: number
  swaps: {
    [key: number]: {
      colors: Array<string>
    }
  }
}

export type Game = {
  startBoard: Board
  solvedBoard: Board
  gameWords: Array<string>
  locks: Array<Array<number>>
  date: string
}

export type KeyData = {
  [key: string]: {
    count: number
    guessCount: number
    isAvailable: boolean
  }
}

export type Guesses = {
  [key: string]: boolean
}

export type GuessesSort = {
  [key: string]: Guesses
}

export type PageLoadData = {
  todaysGame: Game
  yesterdaysGame: Game
  board: Board
}

export type GameData = {
  todaysDateIso: string
  todaysDateLocale: string
  todaysGame: Game
  yesterdaysGame: Game
  timerDuration: number
  currentGuess: Array<string>
  hasResumed: LocalStorage<boolean>
  keyData: KeyData
  guessesSort: GuessesSort
  hasPlayedToday: boolean
  isFirstVisit: boolean
  lastPlayedDate: LocalStorage<string>
  elapsedTime: LocalStorage<number>
  progress: LocalStorage<number>
  timedProgress: LocalStorage<number>
  points: LocalStorage<number>
  timedPoints: LocalStorage<number>
  guesses: LocalStorage<GuessesSort>
  hasGameOverShown: LocalStorage<boolean>
  statGamesPlayed: LocalStorage<number>
  statWordsFound: LocalStorage<number>
}
