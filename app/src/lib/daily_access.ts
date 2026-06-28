// The access gate's pure decision: given today (Eastern), a requested Daily
// date, the free-window length, and who's asking, decide whether to serve it.
//
//   future  (requested > today)            -> creator only (spoiler protection)
//   free    (today back through the window) -> anyone
//   archive (older than the window)         -> Supporter or creator
//
// See docs/adr/0009.
export type AccessReason = "free" | "future" | "archive"

export type AccessDecision = { allow: boolean; reason: AccessReason }

function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number)
  const [by, bm, bd] = b.split("-").map(Number)
  return Math.round((Date.UTC(ay, am - 1, ad) - Date.UTC(by, bm - 1, bd)) / 86400000)
}

export function decideAccess(params: {
  today: string
  requested: string
  freeWindowDays: number
  isCreator: boolean
  isSupporter: boolean
}): AccessDecision {
  const { today, requested, freeWindowDays, isCreator, isSupporter } = params
  const diff = dayDiff(requested, today)

  if (diff > 0) return { allow: isCreator, reason: "future" }
  if (diff > -freeWindowDays) return { allow: true, reason: "free" }
  return { allow: isSupporter || isCreator, reason: "archive" }
}
