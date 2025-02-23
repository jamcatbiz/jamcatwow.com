export function getDate(dayModifier: number): { iso: string; locale: string } {
  var thisDate = new Date()
  const offset = thisDate.getTimezoneOffset()
  thisDate = new Date(thisDate.getTime() - offset * 60 * 1000)
  thisDate.setDate(thisDate.getDate() + dayModifier)
  return {
    iso: thisDate.toISOString().substring(0, 10),
    locale: thisDate.toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
  }
}
