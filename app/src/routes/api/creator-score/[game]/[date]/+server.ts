// Persists the Creator's score into a Daily's JSON in S3. Creator-only, and
// only when local write creds are set (so this path is inert in prod, where
// PRIVATE_GAMES_AWS_WRITE_* are never configured). See docs/adr/0009.
import type { RequestHandler } from "./$types"
import { AwsClient } from "aws4fetch"
import { env } from "$env/dynamic/private"
import {
  canWriteCreatorScore,
  attachCreatorScore,
  type CreatorScore,
} from "$lib/creator_score"

export const prerender = false

const GAMES = new Set(["anagrams", "numbers"])
const BUCKET = "jamcatwow.com.games"
const REGION = "us-east-1"
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function isCreatorScore(v: unknown): v is CreatorScore {
  if (!v || typeof v !== "object") return false
  const s = v as Record<string, unknown>
  return (
    typeof s.playedAt === "string" &&
    typeof s.points === "number" &&
    typeof s.durationMs === "number" &&
    typeof s.detail === "object" &&
    s.detail !== null
  )
}

export const POST: RequestHandler = async ({ params, locals, request }) => {
  const { game, date } = params
  if (!GAMES.has(game) || !DATE_RE.test(date)) {
    return new Response(null, { status: 404 })
  }

  const accessKeyId = env.PRIVATE_GAMES_AWS_WRITE_ACCESS_KEY_ID
  const secretAccessKey = env.PRIVATE_GAMES_AWS_WRITE_SECRET_ACCESS_KEY
  const isCreator =
    !!locals.user && locals.user.id === env.PRIVATE_CREATOR_USER_ID

  if (!canWriteCreatorScore({ isCreator, hasWriteCreds: !!(accessKeyId && secretAccessKey) })) {
    return new Response(null, { status: 403 })
  }
  if (!accessKeyId || !secretAccessKey) return new Response(null, { status: 403 }) // narrow for TS

  const score = await request.json().catch(() => null)
  if (!isCreatorScore(score)) {
    return new Response("invalid creator score", { status: 400 })
  }

  const aws = new AwsClient({ accessKeyId, secretAccessKey, region: REGION, service: "s3" })
  const url = `https://s3.${REGION}.amazonaws.com/${BUCKET}/${game}/days/${date}.json`

  const getRes = await aws.fetch(url)
  if (!getRes.ok) return new Response("daily not found", { status: 404 })

  const updated = attachCreatorScore((await getRes.json()) as object, score)
  const putRes = await aws.fetch(url, {
    method: "PUT",
    body: JSON.stringify(updated),
    headers: { "content-type": "application/json" },
  })
  if (!putRes.ok) return new Response("write failed", { status: 502 })

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
