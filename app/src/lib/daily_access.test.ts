import { decideAccess } from "./daily_access"

const base = {
  today: "2026-06-28",
  freeWindowDays: 14,
  isCreator: false,
  isSupporter: false,
}

describe("decideAccess", () => {
  it("serves today's Daily to anyone", () => {
    expect(decideAccess({ ...base, requested: "2026-06-28" })).toEqual({
      allow: true,
      reason: "free",
    })
  })

  it("serves the oldest day still in the free window (today-13) to anyone", () => {
    expect(decideAccess({ ...base, requested: "2026-06-15" })).toEqual({
      allow: true,
      reason: "free",
    })
  })

  it("treats the day just past the window (today-14) as archive", () => {
    expect(decideAccess({ ...base, requested: "2026-06-14" })).toEqual({
      allow: false,
      reason: "archive",
    })
    expect(decideAccess({ ...base, requested: "2026-06-14", isSupporter: true })).toEqual({
      allow: true,
      reason: "archive",
    })
    expect(decideAccess({ ...base, requested: "2026-06-14", isCreator: true })).toEqual({
      allow: true,
      reason: "archive",
    })
  })

  it("blocks future Dailies from everyone but the creator", () => {
    expect(decideAccess({ ...base, requested: "2026-07-15" })).toEqual({
      allow: false,
      reason: "future",
    })
    expect(decideAccess({ ...base, requested: "2026-07-15", isSupporter: true })).toEqual({
      allow: false,
      reason: "future",
    })
    expect(decideAccess({ ...base, requested: "2026-07-15", isCreator: true })).toEqual({
      allow: true,
      reason: "future",
    })
  })
})
