// Creator Score: the Creator's (James's) recorded result on a Daily, written
// into that Daily's data to power Beat-the-Creator. Captured by playing a
// candidate ahead of release; absent = the mercy rule. See docs/adr/0009.
export type CreatorScore = {
  playedAt: string // ISO timestamp
  points: number
  durationMs: number
  detail: Record<string, unknown> // per-game extras (words found, goals solved, …)
}

// The write endpoint may persist a Creator Score only for the authenticated
// creator AND only when local write creds are configured — so the write path
// is inert in prod (where those creds are never set).
export function canWriteCreatorScore(ctx: {
  isCreator: boolean
  hasWriteCreds: boolean
}): boolean {
  return ctx.isCreator && ctx.hasWriteCreds
}

export function attachCreatorScore<T extends object>(
  daily: T,
  score: CreatorScore,
): T & { creatorScore: CreatorScore } {
  return { ...daily, creatorScore: score }
}
