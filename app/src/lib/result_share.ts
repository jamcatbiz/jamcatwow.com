// Encoding for shared Result permalinks (ADR 0003). A finished game is shared
// as a link to /r/<game>/<date>?s=<encoded>, where the encoded payload is a
// small, SPOILER-FREE summary of performance (score, progress, game number) —
// never the answers. The landing page decodes it to render a branded
// "beat my score" challenge card. Kept pure so it can be unit-tested and reused
// by both the share buttons and the landing page.

// Only primitives, and only spoiler-free performance fields, belong here.
export type ResultPayload = Record<string, string | number>

// URL-safe base64 (RFC 4648 §5), unicode-safe, works in browser and Node.
function b64urlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let bin = ""
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function b64urlDecode(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/")
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeResult(payload: ResultPayload): string {
  return b64urlEncode(JSON.stringify(payload))
}

// Returns null for anything malformed or tampered — callers show a generic
// invite rather than trusting bad input.
export function decodeResult(s: string | null | undefined): ResultPayload | null {
  if (!s) return null
  try {
    const obj = JSON.parse(b64urlDecode(s))
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      return obj as ResultPayload
    }
    return null
  } catch {
    return null
  }
}

export function resultPermalink(
  origin: string,
  game: string,
  date: string,
  payload: ResultPayload,
): string {
  return `${origin}/r/${game}/${date}?s=${encodeResult(payload)}`
}
