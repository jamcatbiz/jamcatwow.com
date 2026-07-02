// Shared Result landing (ADR 0003). Server-rendered (not prerendered — the ?s=
// state is unbounded) so that link crawlers, which don't run JS, receive
// per-score og/twitter meta tags in the initial HTML and unfurl the link into a
// branded card. The og:image is a static branded PNG for now; a dynamic
// per-score image is a later slice.
import type { PageLoad } from "./$types"
import { decodeResult } from "$lib/result_share"

export const ssr = true
export const prerender = false

const GAMES = ["anagrams", "numbers"]
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// @ts-expect-error TODO research if this typing can be removed
export const load: PageLoad = ({ params, url }) => {
  const game = params.game
  const valid = GAMES.includes(game)
  const payload = decodeResult(url.searchParams.get("s"))
  const name = valid ? cap(game) : "JamCatWow"

  const n = Number(payload?.n) || 0
  const pts = Number(payload?.p) || 0

  const title =
    payload && valid
      ? `${name} #${n} — ${pts} points · Beat it on JamCatWow`
      : "JamCatWow — free daily word & number games"
  const description =
    payload && valid
      ? `A JamCatWow challenge: someone scored ${pts} points on ${name} #${n}. Think you can beat it? Free daily word & number games.`
      : "Free daily word & number games. Play today's puzzle and challenge a friend."

  return {
    game,
    date: params.date,
    valid,
    payload,
    title,
    description,
    // Absolute URLs so crawlers can fetch them.
    ogImage: `${url.origin}/og-default.png`,
    pageUrl: url.href,
  }
}
