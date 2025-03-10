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
const defaultSwaps: Swaps = {
  count: 0,
  swaps: {},
}
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
  solvedSwaps: defaultSwaps,
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
export const points = new LocalStorage(
  "jamcat_hashbang_points",
  400,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const hasWon = new LocalStorage(
  "jamcat_hashbang_hasWon",
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
