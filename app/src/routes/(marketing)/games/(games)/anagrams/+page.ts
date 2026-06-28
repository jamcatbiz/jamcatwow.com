// Types and Components
import type { Game, PageLoadData } from "$anagrams/local_types.ts"
import type { PageLoad } from "./$types"

import { todaysDateIso, yesterdaysDateIso } from "$anagrams/state.svelte"
import { fetchDaily } from "$lib/load_daily"
import { fallbackGame } from "$anagrams/fallback"

const dailyUrl = (date: string) => `/api/daily/anagrams/${date}`

// LOAD FUNCTION
// @ts-expect-error TODO research if this typing can be removed
export const load: PageLoad = async ({ fetch }) => {
  const [today, yesterday] = await Promise.all([
    fetchDaily<Game>(fetch, dailyUrl(todaysDateIso), fallbackGame),
    fetchDaily<Game>(fetch, dailyUrl(yesterdaysDateIso), fallbackGame),
  ])

  const rv: PageLoadData = {
    todaysGame: today.game,
    todaysIsFallback: today.isFallback,
    yesterdaysGame: yesterday.game,
    yesterdaysIsFallback: yesterday.isFallback,
  }
  return rv
}
