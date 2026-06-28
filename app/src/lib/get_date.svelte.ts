// "What is today" for the daily games. The rollover is fixed to Eastern
// wall-clock time (America/New_York, DST-aware) so every Player worldwide sees
// the same Daily, flipping at midnight in New York. See docs/adr/0009.
//
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
