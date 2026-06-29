import type {
  GuessesSort,
  Game,
  Guesses,
  KeyData,
} from "$anagrams/local_types.ts"
import { LocalStorage } from "$lib/storage.svelte"
import { getDate, resolveActiveDate, addDays } from "$lib/get_date.svelte"

// The Daily being played: today by default, or a creator's ?date= candidate
// (the gate only serves a future date to the authenticated creator). Per-daily
// state is scoped to this date so candidate play-ahead (and later archive
// replay) never collide with normal play; cumulative stats stay global.
// See docs/adr/0009.
const active =
  typeof window !== "undefined"
    ? resolveActiveDate(new Date(), window.location.search)
    : getDate(0)
const yd = addDays(active.iso, -1)
const dailyKey = (name: string) => `jamcat_anagrams_${name}_${active.iso}`

const defaultGame: Game = {
  word: "default",
  answers: {},
  date: "",
  gameNumber: 0,
}

export const todaysDateIso = active.iso
export const todaysDateLocale = active.locale
export const yesterdaysDateIso = yd.iso
export const yesterdaysDateLocale = yd.locale
// True when showing a date other than the real today (creator play-ahead).
// Used to keep candidate plays out of the player's streak/stats.
export const isCandidate = active.iso !== getDate(0).iso

export const todaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const yesterdaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const timerDuration = $state(1000 * 60 * 5)
export const currentGuess: Array<string> = $state([])
export const hasResumed = new LocalStorage(
  dailyKey("hasResumed"),
  false,
  true,
  (str: string) => {
    return str === "true"
  },
)
export const keyData: KeyData = $state({})
export const guessesSort: GuessesSort = $state({})
export const lastPlayedDate = new LocalStorage(
  "jamcat_anagrams_lastPlayedDate",
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
  dailyKey("elapsedTime"),
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const progress = new LocalStorage(
  dailyKey("progress"),
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const timedProgress = new LocalStorage(
  dailyKey("timedProgress"),
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const points = new LocalStorage(
  dailyKey("points"),
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const timedPoints = new LocalStorage(
  dailyKey("timedPoints"),
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const guesses: LocalStorage<Guesses> = new LocalStorage(
  dailyKey("guesses"),
  {},
  false,
  (str: string) => {
    return JSON.parse(str)
  },
)
export const hasGameOverShown = new LocalStorage(
  dailyKey("hasGameOverShown"),
  false,
  false,
  (str: string) => {
    return str === "true"
  },
)
export const statGamesPlayed = new LocalStorage(
  "jamcat_anagrams_statGamesPlayed",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
export const statWordsFound = new LocalStorage(
  "jamcat_anagrams_statWordsFound",
  0,
  false,
  (str: string) => {
    return Number(str)
  },
)
