// Creator play-ahead queue: finds the soonest future Daily that doesn't yet
// have a Creator Score, plus how many days are already scored ahead (the
// creator-scored surplus). Creator-only. See docs/adr/0009.
import type { RequestHandler } from "./$types"
import { AwsClient } from "aws4fetch"
import { env } from "$env/dynamic/private"
import { getDate, addDays } from "$lib/get_date.svelte"

export const prerender = false

const GAMES = new Set(["anagrams", "numbers"])
const BUCKET = "jamcatwow.com.games"
const REGION = "us-east-1"
const MAX_LOOKAHEAD = 120

export const GET: RequestHandler = async ({ params, locals }) => {
  const { game } = params
  if (!GAMES.has(game)) return new Response(null, { status: 404 })

  const isCreator =
    !!locals.user && locals.user.id === env.PRIVATE_CREATOR_USER_ID
  if (!isCreator) return new Response(null, { status: 403 })

  const accessKeyId = env.PRIVATE_GAMES_AWS_ACCESS_KEY_ID
  const secretAccessKey = env.PRIVATE_GAMES_AWS_SECRET_ACCESS_KEY
  if (!accessKeyId || !secretAccessKey) return new Response(null, { status: 503 })
  const aws = new AwsClient({ accessKeyId, secretAccessKey, region: REGION, service: "s3" })

  // Walk forward from tomorrow; the first existing Daily without a creatorScore
  // is next to play. Bounded by the buffer end (404) or MAX_LOOKAHEAD.
  let scoredAhead = 0
  let next: { date: string; gameNumber: number | null } | null = null
  let date = addDays(getDate(0).iso, 1).iso
  for (let i = 0; i < MAX_LOOKAHEAD; i++) {
    const res = await aws.fetch(
      `https://s3.${REGION}.amazonaws.com/${BUCKET}/${game}/days/${date}.json`,
    )
    if (!res.ok) break // reached the end of the buffer
    const daily = await res.json()
    if (daily && daily.creatorScore) {
      scoredAhead++
    } else {
      next = { date, gameNumber: daily?.gameNumber ?? null }
      break
    }
    date = addDays(date, 1).iso
  }

  return new Response(JSON.stringify({ next, scoredAhead }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "private, no-store" },
  })
}
