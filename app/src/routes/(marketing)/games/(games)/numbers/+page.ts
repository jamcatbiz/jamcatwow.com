// Types and Components
import type { Game, PageLoadData } from '$numbers/local_types';
import type { PageLoad } from './$types';

import { todaysDateIso, yesterdaysDateIso} from '$numbers/state.svelte'

// LOAD FUNCTION
export const load: PageLoad = async ({ fetch }) => {
  const resDate = await fetch(`https://s3.amazonaws.com/jamcatwow.com.games/numbers/days/${todaysDateIso}.json`);
  const game: Game = await resDate.json();

  const resYesterdaysDate = await fetch(`https://s3.amazonaws.com/jamcatwow.com.games/numbers/days/${yesterdaysDateIso}.json`);
  const yesterdaysGame: Game = await resYesterdaysDate.json();
  
  const rv: PageLoadData = {
    todaysGame: game,
    yesterdaysGame: yesterdaysGame,
  }
  return rv
}