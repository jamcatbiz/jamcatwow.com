import type {
  GuessesSort,
  Game,
  Guesses,
  KeyData,
  Swaps,
} from "$hashbang/local_types.ts"
import { LocalStorage } from "$lib/storage.svelte"
import { getDate } from "$lib/get_date.svelte"

// TODO: Change this back
const d = getDate(0)
const yd = getDate(-1)
const defaultGame: Game = {
  gameWords: [],
  startBoard: [
    ["", "X", "", "X", ""],
    ["X", "X", "X", "X", "X"],
    ["", "X", "", "X", ""],
    ["X", "X", "X", "X", "X"],
    ["", "X", "", "X", ""],
  ],
  locks: [
    [3, 1],
    [1, 3],
    [0, 1],
  ],
  date: "",
  solvedBoard: [],
}
const defaultSwaps: Swaps = {
  count: 0,
  swaps: {},
}

export const todaysDateIso = d.iso
export const todaysDateLocale = d.locale
export const yesterdaysDateIso = yd.iso
export const yesterdaysDateLocale = yd.locale
export const board = $state(JSON.parse(JSON.stringify(defaultGame.startBoard)))
export const swaps = $state(JSON.parse(JSON.stringify(defaultSwaps)))
export const todaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const yesterdaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const activeCell = $state([0, 0])
export const timerDuration = $state(1000 * 60 * 0.2)
export const currentGuess: Array<string> = $state([])
export const hasResumed = new LocalStorage(
  "jamcat_hashbang_hasResumed",
  false,
  true,
  (str: string) => {
    return str === "true"
  },
)
export const keyData: KeyData = $state({})
export const guessesSort: GuessesSort = $state({})
export const lastPlayedDate = new LocalStorage(
  "jamcat_hashbang_lastPlayedDate",
  "YYYY-MM-DD",
  false,
  (str: string) => {
    return str
  },
)
export const hasPlayedToday = $state(
  lastPlayedDate.val === todaysDateIso ? true : false,
)
export const isFirstVisit = $state(
  lastPlayedDate.val === "YYYY-MM-DD" ? true : false,
)
export const elapsedTime = new LocalStorage(
  "jamcat_hashbang_elapsedTime",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const progress = new LocalStorage(
  "jamcat_hashbang_progress",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const timedProgress = new LocalStorage(
  "jamcat_hashbang_timedProgress",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const points = new LocalStorage(
  "jamcat_hashbang_points",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const timedPoints = new LocalStorage(
  "jamcat_hashbang_timedPoints",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const guesses: LocalStorage<Guesses> = new LocalStorage(
  "jamcat_hashbang_guesses",
  {},
  false,
  (str: string) => {
    return JSON.parse(str)
  },
)
export const hasGameOverShown = new LocalStorage(
  "jamcat_hashbang_hasGameOverShown",
  false,
  false,
  (str: string) => {
    return str === "true"
  },
)
export const statGamesPlayed = new LocalStorage(
  "jamcat_hashbang_statGamesPlayed",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const statWordsFound = new LocalStorage(
  "jamcat_hashbang_statWordsFound",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
