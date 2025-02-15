import { LocalStorage } from '$lib/storage.svelte';
import { getDate } from '$lib/get_date.svelte';
import type { Game, Guesses } from '$ladders/local_types';

// TODO: Change this back
const d = getDate(0);
const yd = getDate(-1)
const defaultGame: Game = {
  topWord: "",
  bottomWord: "",
  solutions: [],
  date: '',
}
const defaultGuesses: Guesses = []

export const todaysDateIso = d.iso;
export const todaysDateLocale = d.locale;
export const yesterdaysDateIso = yd.iso;
export const yesterdaysDateLocale = yd.locale;
export const todaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const yesterdaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const lastPlayedDate = new LocalStorage('jamcat_ladders_lastPlayedDate', 'YYYY-MM-DD', false, (str: string) => {return str});
export const hasPlayedToday = $state(lastPlayedDate.val === todaysDateIso ? true : false);
export const isFirstVisit = $state(lastPlayedDate.val === 'YYYY-MM-DD' ? true : false);
export const hasGameOverShown = new LocalStorage('jamcat_ladders_hasGameOverShown', false, false, (str: string) => {return (str === 'true')});
export const statGamesPlayed = new LocalStorage('jamcat_ladders_statGamesPlayed', 0, false, (str: string) => {return Number(str)});
export const statNumbersFound = new LocalStorage('jamcat_ladders_statWordsFound', 0, false, (str: string) => {return Number(str)});

export const guessInput = $state({'val': ''})
export const topGuesses = $state({'val': defaultGuesses})
export const bottomGuesses = $state({'val': defaultGuesses})
export const guessesAdded = $state({'val': defaultGuesses})
export const hasWon = $state({'val': false})
export const goalDistance = 1
export const hintsUsed = $state({'val': 0})

