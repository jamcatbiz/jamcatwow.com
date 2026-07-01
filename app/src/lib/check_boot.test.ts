import { describe, it, expect } from "vitest"
// @ts-expect-error plain-JS tooling module, no types needed
import { findBootViolations } from "../../scripts/check_boot.js"

// The real boot shapes SvelteKit emits, minus the surrounding markup.
const BROKEN_BOOT = `
  __sveltekit_x = { base: new URL("..", location).pathname.slice(0, -1), env: null };
  const element = document.currentScript.parentElement;
  import("../_app/env.js").then(({ env }) => {
    __sveltekit_x.env = env;
    Promise.all([
      import("../_app/immutable/entry/start.BzjivmsE.js"),
      import("../_app/immutable/entry/app.Cf8rp1Tt.js")
    ]).then(([kit, app]) => { kit.start(app, element); });
  });
`

const FIXED_BOOT = `
  __sveltekit_x = { base: new URL("..", location).pathname.slice(0, -1), env: null };
  const element = document.currentScript.parentElement;
  Promise.all([
    import("../_app/immutable/entry/start.BK37_d6N.js"),
    import("../_app/immutable/entry/app.COkfBjmM.js")
  ]).then(([kit, app]) => { kit.start(app, element); });
`

// Every immutable chunk either boot references — as prod actually had them:
// the chunks were served fine, only env.js 404'd. So with this predicate the
// broken boot yields exactly one violation (env.js), not phantom missing-chunk
// noise.
const presentChunks = new Set([
  "_app/immutable/entry/start.BK37_d6N.js",
  "_app/immutable/entry/app.COkfBjmM.js",
  "_app/immutable/entry/start.BzjivmsE.js",
  "_app/immutable/entry/app.Cf8rp1Tt.js",
])
const chunkExists = (p: string) => presentChunks.has(p)

describe("findBootViolations", () => {
  it("flags the $env/dynamic env.js boot import (the prod-down regression)", () => {
    const v = findBootViolations(BROKEN_BOOT, { chunkExists })
    expect(v).toHaveLength(1)
    expect(v[0]).toContain("_app/env.js")
    expect(v[0]).toContain("$env/static")
  })

  it("passes a clean boot that only imports present immutable chunks", () => {
    expect(findBootViolations(FIXED_BOOT, { chunkExists })).toEqual([])
  })

  it("flags a boot chunk that is missing from the build output", () => {
    const v = findBootViolations(FIXED_BOOT, { chunkExists: () => false })
    expect(v).toHaveLength(2)
    expect(v[0]).toContain("missing chunk")
  })

  it("skips the missing-chunk check when no predicate is given", () => {
    expect(findBootViolations(FIXED_BOOT)).toEqual([])
  })

  it("ignores external / bare imports and dedupes repeats", () => {
    const html = `
      import("https://cdn.example.com/thing.js");
      import("posthog-js");
      import("../_app/env.js");
      import("../_app/env.js");
    `
    // one violation despite two identical env.js imports; externals ignored
    expect(findBootViolations(html)).toHaveLength(1)
  })
})
