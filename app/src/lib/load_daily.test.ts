import { fetchDaily } from "./load_daily"

const fallback = { word: "fallback", gameNumber: 0 }

// Build a fetch-shaped function from a simple implementation.
function mockFetch(impl: () => Promise<Response>): typeof fetch {
  return impl as unknown as typeof fetch
}

describe("fetchDaily", () => {
  it("returns the parsed Daily when the response is ok", async () => {
    const game = { word: "real", gameNumber: 5 }
    const fetch = mockFetch(
      async () => new Response(JSON.stringify(game), { status: 200 }),
    )
    const result = await fetchDaily(fetch, "https://x/today.json", fallback)
    expect(result).toEqual({ game, isFallback: false })
  })

  it("falls back when the file is missing (404)", async () => {
    const fetch = mockFetch(async () => new Response("", { status: 404 }))
    const result = await fetchDaily(fetch, "https://x/today.json", fallback)
    expect(result).toEqual({ game: fallback, isFallback: true })
  })

  it("falls back when the network throws", async () => {
    const fetch = mockFetch(async () => {
      throw new Error("network down")
    })
    const result = await fetchDaily(fetch, "https://x/today.json", fallback)
    expect(result).toEqual({ game: fallback, isFallback: true })
  })

  it("falls back when the body is not valid JSON", async () => {
    const fetch = mockFetch(
      async () => new Response("not json", { status: 200 }),
    )
    const result = await fetchDaily(fetch, "https://x/today.json", fallback)
    expect(result).toEqual({ game: fallback, isFallback: true })
  })
})
