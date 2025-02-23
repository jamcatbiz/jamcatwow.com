// Types and Components
import type { Game, PageLoadData } from "$anagrams/local_types.ts"
import type { PageLoad } from "./$types"

import { todaysDateIso, yesterdaysDateIso } from "$anagrams/state.svelte"

// LOAD FUNCTION
// @ts-expect-error TODO research if this typing can be removed
export const load: PageLoad = async ({ fetch }) => {
  const resDate = await fetch(
    `https://s3.amazonaws.com/jamcatwow.com.games/anagrams/days/${todaysDateIso}.json`,
  )
  const game: Game = await resDate.json()

  const resYesterdaysDate = await fetch(
    `https://s3.amazonaws.com/jamcatwow.com.games/anagrams/days/${yesterdaysDateIso}.json`,
  )
  const yesterdaysGame: Game = await resYesterdaysDate.json()

  const rv: PageLoadData = {
    todaysGame: game,
    yesterdaysGame: yesterdaysGame,
  }
  return rv
}
