// "What is today" for the daily games. The rollover is fixed to Eastern
// wall-clock time (America/New_York, DST-aware) so every Player worldwide sees
// the same Daily, flipping at midnight in New York. See docs/adr/0009.

function fmt(date: Date): { iso: string; locale: string } {
  return {
    iso: date.toISOString().substring(0, 10),
    locale: date.toLocaleString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
  }
}

function utcFromIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

// `now` is injectable for testing; production callers pass nothing.
export function getDate(
  dayModifier: number,
  now: Date = new Date(),
): { iso: string; locale: string } {
  // Resolve the Eastern calendar date for this instant (DST handled by Intl).
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  const part = (type: string) =>
    Number(parts.find((p) => p.type === type)!.value)

  // Shift whole calendar days in pure UTC date-space so dayModifier never
  // re-introduces a timezone offset.
  const date = new Date(Date.UTC(part("year"), part("month") - 1, part("day")))
  date.setUTCDate(date.getUTCDate() + dayModifier)
  return fmt(date)
}

export function dateFromIso(iso: string): { iso: string; locale: string } {
  return fmt(utcFromIso(iso))
}

export function addDays(
  iso: string,
  days: number,
): { iso: string; locale: string } {
  const date = utcFromIso(iso)
  date.setUTCDate(date.getUTCDate() + days)
  return fmt(date)
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

// The Daily the page is showing: today's, unless a creator passes ?date=<date>
// (the gate only serves a future date to the authenticated creator), enabling
// blind play-ahead. See docs/adr/0009.
export function resolveActiveDate(
  now: Date,
  search: string,
): { iso: string; locale: string } {
  const requested = new URLSearchParams(search).get("date")
  if (requested && ISO_DATE_RE.test(requested)) return dateFromIso(requested)
  return getDate(0, now)
}
