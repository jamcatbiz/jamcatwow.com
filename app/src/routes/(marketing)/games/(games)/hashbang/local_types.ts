import type { LocalStorage } from "$lib/storage.svelte"

export type Board = Array<Array<string>>

export type Swaps = {
  order: Array<{
    i: number
    j: number
  }>
  cellInfo: {
    [key: number]: {
      [key: number]: string
    }
  }
}

export type Game = {
  startBoard: Board
  solvedBoard: Board
  solvedSwaps: Swaps
  gameWords: Array<string>
  locks: Array<Array<number>>
  date: string
  gameNumber: number
}

export type KeyData = {
  [key: string]: {
    count: number
    guessCount: number
    isAvailable: boolean
  }
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
  keyData: KeyData
  hasPlayedToday: boolean
  isFirstVisit: boolean
  lastPlayedDate: LocalStorage<string>
  points: LocalStorage<number>
  hasWon: LocalStorage<boolean>
  statGamesPlayed: LocalStorage<number>
}
