// Shared Result landing (ADR 0003). Client-only, like /creator: it just decodes
// the spoiler-free result from the URL and renders a "beat my score" challenge.
// Nothing to prerender (the ?s= state is unbounded) or SSR yet — the dynamic
// OG-image unfurl is a later slice.
import type { PageLoad } from "./$types"
import { decodeResult } from "$lib/result_share"

export const ssr = false
export const prerender = false

const GAMES = ["anagrams", "numbers"]

// @ts-expect-error TODO research if this typing can be removed
export const load: PageLoad = ({ params, url }) => {
  return {
    game: params.game,
    date: params.date,
    valid: GAMES.includes(params.game),
    payload: decodeResult(url.searchParams.get("s")),
  }
}
