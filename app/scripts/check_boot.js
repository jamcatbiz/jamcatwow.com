// Pure logic for the prod-boot smoke guard. Given a prerendered page's HTML,
// find dynamic imports in its boot code that would 404 in production and stop
// the app from ever hydrating. Two failure shapes this catches:
//
//  1. A boot `import("../_app/env.js")` (or anything under `_app/` but NOT
//     `_app/immutable/`). That module is emitted when `$env/dynamic/*` reaches
//     the client; on a prerendered ssr=false site Cloudflare has no server to
//     serve it, so it 404s, the boot promise rejects, and `kit.start()` never
//     runs. `vite dev` always serves it, so this only breaks in prod. This is
//     exactly the regression that took down every game page (see docs/adr/0009
//     / the +layout.svelte env fix).
//  2. A boot import of a hashed `_app/immutable/...` chunk that isn't present
//     in the client build output (stale/half-built deploy → 404 → dead boot).
//
// Kept dependency-free and in plain ESM so both the Node runner
// (scripts/check-prod-boot.mjs) and vitest (src/lib/check_boot.test.ts) can
// import it without a transpile step.

/**
 * @param {string} html - a prerendered page's HTML
 * @param {{ chunkExists?: (normalizedPath: string) => boolean }} [opts]
 *   chunkExists is asked whether an `_app/immutable/...` path exists in the
 *   client build output; omit it to skip the missing-chunk check.
 * @returns {string[]} human-readable violations; empty array means the boot is safe
 */
export function findBootViolations(html, opts = {}) {
  /** @type {string[]} */
  const violations = []
  const importRe = /import\(\s*["']([^"']+)["']\s*\)/g
  const seen = new Set()
  let m
  while ((m = importRe.exec(html)) !== null) {
    const spec = m[1]
    if (seen.has(spec)) continue
    seen.add(spec)

    // Normalize the specifier to an app-root path by dropping leading ./ ../
    const norm = spec.replace(/^(?:\.\.?\/)+/, "")
    if (!norm.startsWith("_app/")) continue // external/bare import — not ours

    if (!norm.startsWith("_app/immutable/")) {
      violations.push(
        `boot imports runtime module "${spec}" (resolves to /${norm}). A ` +
          `prerendered ssr=false page has no server to serve it on Cloudflare, ` +
          `so it 404s and the app never hydrates. This is almost always a ` +
          `$env/dynamic/* import reaching the client — switch it to $env/static/*.`,
      )
      continue
    }

    if (opts.chunkExists && !opts.chunkExists(norm)) {
      violations.push(
        `boot imports missing chunk "/${norm}" — it is not present in the ` +
          `client build output (stale or half-built deploy would 404 here).`,
      )
    }
  }
  return violations
}
