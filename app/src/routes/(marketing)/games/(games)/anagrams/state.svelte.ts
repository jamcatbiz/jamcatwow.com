import type { GuessesSort, Game, Guesses, KeyData, } from '$anagrams/local_types.ts';
import { LocalStorage } from '$lib/storage.svelte';
import { getDate } from '$lib/get_date.svelte';

// TODO: Change this back
const d = getDate(0);
const yd = getDate(-1)
const defaultGame: Game = {
  word: 'default',
  answers: {},
  date: '',
  gameNumber: 0,
}

export const todaysDateIso = d.iso;
export const todaysDateLocale = d.locale;
export const yesterdaysDateIso = yd.iso;
export const yesterdaysDateLocale = yd.locale;
export const todaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const yesterdaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const timerDuration = $state(1000 * 60 * 0.2);
export const currentGuess: Array<string> = $state([]);
export const hasResumed = new LocalStorage('jamcat_anagrams_hasResumed', false, true, (str: string) => {return (str === 'true')});
export const keyData: KeyData = $state({});
export const guessesSort: GuessesSort = $state({});
export const lastPlayedDate = new LocalStorage('jamcat_anagrams_lastPlayedDate', 'YYYY-MM-DD', false, (str: string) => {return str});
export const hasPlayedToday = $state(lastPlayedDate.val === todaysDateIso ? true : false);
export const isFirstVisit = $state(lastPlayedDate.val === 'YYYY-MM-DD' ? true : false);
export const elapsedTime = new LocalStorage('jamcat_anagrams_elapsedTime', 0, false, (str: string) => {return Number(str)});
export const progress = new LocalStorage('jamcat_anagrams_progress', 0, false, (str: string) => {return Number(str)});
export const timedProgress = new LocalStorage('jamcat_anagrams_timedProgress', 0, false, (str: string) => {return Number(str)});
export const points = new LocalStorage('jamcat_anagrams_points', 0, false, (str: string) => {return Number(str)});
export const timedPoints = new LocalStorage('jamcat_anagrams_timedPoints', 0, false, (str: string) => {return Number(str)});
export const guesses: LocalStorage<Guesses> = new LocalStorage('jamcat_anagrams_guesses', {}, false, (str: string) => {return JSON.parse(str)});
export const hasGameOverShown = new LocalStorage('jamcat_anagrams_hasGameOverShown', false, false, (str: string) => {return (str === 'true')});
export const statGamesPlayed = new LocalStorage('jamcat_anagrams_statGamesPlayed', 0, false, (str: string) => {return Number(str)});
export const statWordsFound = new LocalStorage('jamcat_anagrams_statWordsFound', 0, false, (str: string) => {return Number(str)});