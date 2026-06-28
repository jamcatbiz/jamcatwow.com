// Fetches one Daily's JSON, degrading to a fallback instead of throwing when
// the file is missing, the network fails, or the body isn't valid JSON. This is
// what keeps a missing Daily from crashing the game page. See docs/adr/0009.
export async function fetchDaily<T>(
  fetch: typeof globalThis.fetch,
  url: string,
  fallback: T,
): Promise<{ game: T; isFallback: boolean }> {
  try {
    const res = await fetch(url)
    if (!res.ok) return { game: fallback, isFallback: true }
    const game = (await res.json()) as T
    return { game, isFallback: false }
  } catch {
    return { game: fallback, isFallback: true }
  }
}
