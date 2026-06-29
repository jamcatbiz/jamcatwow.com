import { canWriteCreatorScore, attachCreatorScore, type CreatorScore } from "./creator_score"

describe("canWriteCreatorScore", () => {
  it("denies a non-creator even with write creds", () => {
    expect(canWriteCreatorScore({ isCreator: false, hasWriteCreds: true })).toBe(false)
  })

  it("allows the creator when write creds are present", () => {
    expect(canWriteCreatorScore({ isCreator: true, hasWriteCreds: true })).toBe(true)
  })

  it("denies the creator when write creds are missing (inert in prod)", () => {
    expect(canWriteCreatorScore({ isCreator: true, hasWriteCreds: false })).toBe(false)
  })
})

describe("attachCreatorScore", () => {
  const score: CreatorScore = {
    playedAt: "2026-06-28T12:00:00Z",
    points: 27,
    durationMs: 90000,
    detail: { wordsFound: 12 },
  }

  it("attaches the score without clobbering other Daily fields", () => {
    const daily = { word: "notebook", date: "2026-09-25", gameNumber: 91 }
    expect(attachCreatorScore(daily, score)).toEqual({ ...daily, creatorScore: score })
  })
})
