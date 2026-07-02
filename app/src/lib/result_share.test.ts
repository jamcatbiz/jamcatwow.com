import { describe, it, expect } from "vitest"
import {
  encodeResult,
  decodeResult,
  resultPermalink,
  type ResultPayload,
} from "./result_share"

describe("result_share", () => {
  it("round-trips a payload", () => {
    const p: ResultPayload = { v: 1, n: 5, p: 270, tp: 10, pr: 80, tpr: 40 }
    expect(decodeResult(encodeResult(p))).toEqual(p)
  })

  it("produces URL-safe output (no +, /, = or padding)", () => {
    const s = encodeResult({ v: 1, n: 12345, p: 999999, extra: "a b/c+d==" })
    expect(s).not.toMatch(/[+/=]/)
    expect(decodeResult(s)).toMatchObject({ extra: "a b/c+d==" })
  })

  it("returns null for missing / empty input", () => {
    expect(decodeResult(null)).toBeNull()
    expect(decodeResult(undefined)).toBeNull()
    expect(decodeResult("")).toBeNull()
  })

  it("returns null for tampered / malformed strings", () => {
    expect(decodeResult("!!!not-base64!!!")).toBeNull()
    expect(decodeResult(encodeResult({ v: 1 }).slice(0, -3) + "zz")).toBeNull()
  })

  it("returns null when the decoded value isn't an object", () => {
    // a valid base64url of the JSON number `5`
    expect(decodeResult(encodeResult([1, 2] as unknown as ResultPayload))).toBeNull()
  })

  it("builds a permalink from origin, game, date and payload", () => {
    const url = resultPermalink("https://jamcatwow.com", "anagrams", "2026-07-01", {
      v: 1,
      n: 5,
      p: 42,
    })
    expect(url).toMatch(/^https:\/\/jamcatwow\.com\/r\/anagrams\/2026-07-01\?s=/)
    const s = new URL(url).searchParams.get("s")
    expect(decodeResult(s)).toMatchObject({ n: 5, p: 42 })
  })
})
