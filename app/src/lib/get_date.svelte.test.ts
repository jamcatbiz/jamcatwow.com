import { getDate } from "./get_date.svelte"

describe("getDate (Eastern rollover)", () => {
  it("resolves to the Eastern calendar date, not the UTC date, near midnight in summer (EDT)", () => {
    // 2026-07-01T03:30:00Z is still 2026-06-30 23:30 in Eastern (EDT, UTC-4)
    const now = new Date("2026-07-01T03:30:00Z")
    expect(getDate(0, now).iso).toBe("2026-06-30")
  })

  it("uses the EST offset in winter, crossing a year boundary", () => {
    // 2026-01-01T04:30:00Z is 2025-12-31 23:30 in Eastern (EST, UTC-5)
    const now = new Date("2026-01-01T04:30:00Z")
    expect(getDate(0, now).iso).toBe("2025-12-31")
  })

  it("shifts whole calendar days via dayModifier (yesterday, across a month boundary)", () => {
    // Eastern 'today' is 2026-06-30; yesterday is 2026-06-29
    const now = new Date("2026-07-01T03:30:00Z")
    expect(getDate(-1, now).iso).toBe("2026-06-29")
  })

  it("formats the matching human-readable locale for the same Eastern date", () => {
    const now = new Date("2026-07-01T03:30:00Z")
    expect(getDate(0, now).locale).toBe("June 30, 2026")
  })
})
