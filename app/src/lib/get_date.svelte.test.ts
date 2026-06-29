import { getDate, resolveActiveDate, addDays } from "./get_date.svelte"

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

describe("resolveActiveDate", () => {
  // 2026-07-01T03:30:00Z -> Eastern today = 2026-06-30
  const now = new Date("2026-07-01T03:30:00Z")

  it("defaults to today's Eastern date when there is no ?date=", () => {
    expect(resolveActiveDate(now, "").iso).toBe("2026-06-30")
  })

  it("uses a valid ?date= override (creator play-ahead)", () => {
    const d = resolveActiveDate(now, "?date=2026-09-26")
    expect(d.iso).toBe("2026-09-26")
    expect(d.locale).toBe("September 26, 2026")
  })

  it("ignores a malformed ?date= and falls back to today", () => {
    expect(resolveActiveDate(now, "?date=garbage").iso).toBe("2026-06-30")
  })
})

describe("addDays", () => {
  it("computes the day before an iso date (for the yesterday recap)", () => {
    expect(addDays("2026-09-26", -1).iso).toBe("2026-09-25")
  })

  it("crosses month boundaries", () => {
    expect(addDays("2026-07-01", -1).iso).toBe("2026-06-30")
  })
})
