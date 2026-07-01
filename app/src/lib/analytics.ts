// Anonymous, first-party product analytics — docs/adr/0005. A random device tag
// in localStorage (no PII, never required to play, first-party only) is attached
// to events, giving cohort retention without accounts. Inert until a PostHog key
// is configured (PUBLIC_POSTHOG_KEY), so it's a no-op in dev / when unset.

const CLIENT_ID_KEY = "jamcat_client_id"

type MinimalStorage = Pick<Storage, "getItem" | "setItem">

export function getOrCreateClientId(
  storage: MinimalStorage,
  genId: () => string = () => crypto.randomUUID(),
): string {
  let id = storage.getItem(CLIENT_ID_KEY)
  if (!id) {
    id = genId()
    storage.setItem(CLIENT_ID_KEY, id)
  }
  return id
}

export function clientId(): string {
  if (typeof localStorage === "undefined") return ""
  return getOrCreateClientId(localStorage)
}

// Lazily loaded so posthog-js only ships/loads when a key is configured.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ph: any = null

export async function initAnalytics(opts: {
  key?: string
  host?: string
  id: string
}): Promise<void> {
  if (!opts.key || ph || typeof window === "undefined") return
  const { default: posthog } = await import("posthog-js")
  posthog.init(opts.key, {
    api_host: opts.host || "https://us.i.posthog.com",
    persistence: "localStorage", // cookieless
    bootstrap: { distinctID: opts.id },
    capture_pageview: true,
  })
  posthog.register({ client_id: opts.id })
  ph = posthog
}

export function track(event: string, props?: Record<string, unknown>): void {
  ph?.capture(event, props)
}
