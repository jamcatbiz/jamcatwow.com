import { LocalStorage } from '$lib/storage.svelte';
import { getDate } from '$lib/get_date.svelte';
import type { Answers, Game, Operations, Step } from '$numbers/local_types';

// TODO: Change this back
const d = getDate(0);
const yd = getDate(-1)
const defaultGame: Game = {
  goalNumbers: [123, 456, 238],
  playNumbers: [],
  solutions: {
    "123":{
      min_operations: [],
      max_operations: [],
    },
    "456":{
      min_operations: [],
      max_operations: [],
    },
    "238":{
      min_operations: [],
      max_operations: [],
    },
  },
  date: '',
  gameNumber: 122,
}
const defaultAnswers: Answers = {}
const initUserSteps: Step = {
  firstNumber: "",
  firstIndex: -1,
  operation: "",
  secondNumber: "",
  secondIndex: -1,
  solution: "",
}
const defaultOperations: Operations = {
  add: {
    classes: "",
    icon: "+",
  },
  subtract: {
    classes: "",
    icon: "-",
  },
  multiply: {
    classes: "",
    icon: "×",
  },
  divide: {
    classes: "",
    icon: "÷",
  },
}

export const todaysDateIso = d.iso;
export const todaysDateLocale = d.locale;
export const yesterdaysDateIso = yd.iso;
export const yesterdaysDateLocale = yd.locale;
export const todaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const yesterdaysGame = $state(JSON.parse(JSON.stringify(defaultGame)))
export const timerDuration = $state(1000 * 60 * 3);
export const points = $state({val: 0})
export const hasResumed = new LocalStorage('jamcat_numbers_hasResumed', false, true, (str: string) => {return (str === 'true')});
export const lastPlayedDate = new LocalStorage('jamcat_numbers_lastPlayedDate', 'YYYY-MM-DD', false, (str: string) => {return str});
export const hasPlayedToday = $state(lastPlayedDate.val === todaysDateIso ? true : false);
export const isFirstVisit = $state(lastPlayedDate.val === 'YYYY-MM-DD' ? true : false);
export const elapsedTime = new LocalStorage('jamcat_numbers_elapsedTime', 0, false, (str: string) => {return Number(str)});
export const hasGameOverShown = new LocalStorage('jamcat_numbers_hasGameOverShown', false, false, (str: string) => {return (str === 'true')});
export const statGamesPlayed = new LocalStorage('jamcat_numbers_statGamesPlayed', 0, false, (str: string) => {return Number(str)});
export const statNumbersFound = new LocalStorage('jamcat_numbers_statWordsFound', 0, false, (str: string) => {return Number(str)});

export const answers = $state(defaultAnswers)
export const livePlayNumbers = $state({val: [2,2,2,2,2,2]})
export const activeOperation = $state({val: ""})
export const activeNumberIndex = $state({val: -1})
export const userSteps = $state([JSON.parse(JSON.stringify(initUserSteps))])
export const currentUserStep = $state(JSON.parse(JSON.stringify(initUserSteps)))
export const operations = $state(defaultOperations)