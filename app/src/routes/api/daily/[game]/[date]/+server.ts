// Access gate for daily-game data. The app fetches Dailies through here instead
// of hitting S3 directly, so the bucket can be private and future/archive Dailies
// are gated. Compiles to a Cloudflare Pages Function. See docs/adr/0009.
import type { RequestHandler } from "./$types"
import { AwsClient } from "aws4fetch"
import { env } from "$env/dynamic/private"
import { getDate } from "$lib/get_date.svelte"
import { decideAccess } from "$lib/daily_access"

export const prerender = false

const GAMES = new Set(["anagrams", "numbers"])
const BUCKET = "jamcatwow.com.games"
const REGION = "us-east-1"
const FREE_WINDOW_DAYS = 14
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export const GET: RequestHandler = async ({ params, locals }) => {
  const { game, date } = params
  if (!GAMES.has(game) || !DATE_RE.test(date)) {
    return new Response(null, { status: 404 })
  }

  const isCreator =
    !!locals.user && locals.user.id === env.PRIVATE_CREATOR_USER_ID
  const isSupporter = false // TODO: wire to Supporter Unlock (ADR 0006)

  const { allow, reason } = decideAccess({
    today: getDate(0).iso,
    requested: date,
    freeWindowDays: FREE_WINDOW_DAYS,
    isCreator,
    isSupporter,
  })

  if (!allow) {
    // future -> hide its existence (404); archive -> exists but locked (403)
    return new Response(null, { status: reason === "future" ? 404 : 403 })
  }

  const accessKeyId = env.PRIVATE_GAMES_AWS_ACCESS_KEY_ID
  const secretAccessKey = env.PRIVATE_GAMES_AWS_SECRET_ACCESS_KEY
  if (!accessKeyId || !secretAccessKey) {
    // Misconfigured (CF env not set) -> degrade to the app's fallback, never crash.
    return new Response(null, { status: 404 })
  }
  const aws = new AwsClient({ accessKeyId, secretAccessKey, region: REGION, service: "s3" })
  const s3res = await aws.fetch(
    `https://s3.${REGION}.amazonaws.com/${BUCKET}/${game}/days/${date}.json`,
  )
  if (!s3res.ok) {
    return new Response(null, { status: 404 })
  }

  // Free-window responses are identical for everyone -> edge-cacheable.
  // Creator/archive responses vary by user -> never cache.
  const cacheControl =
    reason === "free" ? "public, max-age=300, s-maxage=3600" : "private, no-store"
  return new Response(s3res.body, {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": cacheControl },
  })
}
