import { getOrCreateClientId } from "./analytics"

function fakeStorage() {
  const m = new Map<string, string>()
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => {
      m.set(k, v)
    },
  }
}

describe("getOrCreateClientId", () => {
  it("creates and persists a new id when none exists", () => {
    const s = fakeStorage()
    let n = 0
    const id = getOrCreateClientId(s, () => `id-${++n}`)
    expect(id).toBe("id-1")
    expect(s.getItem("jamcat_client_id")).toBe("id-1")
  })

  it("returns the same id on subsequent calls (stable device tag)", () => {
    const s = fakeStorage()
    let n = 0
    const first = getOrCreateClientId(s, () => `id-${++n}`)
    const second = getOrCreateClientId(s, () => `id-${++n}`)
    expect(second).toBe(first)
  })
})
