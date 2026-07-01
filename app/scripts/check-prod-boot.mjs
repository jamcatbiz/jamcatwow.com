#!/usr/bin/env node
// Prod-boot smoke guard. Runs after `vite build` (wired into `npm run build`)
// and fails the build if any prerendered page's boot code imports something
// that would 404 in production and stop the app from hydrating — most notably
// a `$env/dynamic/*` `env.js` import on this prerendered ssr=false site, which
// has taken the games down before while passing local `vite dev` checks.
//
// Static, offline, deterministic: it reads the build output, no server or
// browser needed. See scripts/check_boot.js for the rules.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { join, dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { findBootViolations } from "./check_boot.js"

const appDir = join(dirname(fileURLToPath(import.meta.url)), "..")
const prerenderedDir = join(appDir, ".svelte-kit/output/prerendered")
const clientDir = join(appDir, ".svelte-kit/output/client")

/** Recursively collect files matching a predicate. */
function walk(dir, match, acc = []) {
  if (!existsSync(dir)) return acc
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, match, acc)
    else if (match(p)) acc.push(p)
  }
  return acc
}

if (!existsSync(prerenderedDir)) {
  console.error(
    `✗ prod-boot guard: no prerendered output at ${relative(appDir, prerenderedDir)}.\n` +
      `  Run \`npm run build\` first (this guard is meant to run right after it).`,
  )
  process.exit(1)
}

// A chunk path like "_app/immutable/..." exists if the file is in client output.
const chunkExists = (norm) => existsSync(join(clientDir, norm))

const pages = walk(prerenderedDir, (p) => p.endsWith(".html"))
let failed = 0
for (const page of pages) {
  const html = readFileSync(page, "utf8")
  const violations = findBootViolations(html, { chunkExists })
  if (violations.length) {
    failed++
    console.error(`\n✗ ${relative(appDir, page)}`)
    for (const v of violations) console.error(`    - ${v}`)
  }
}

if (failed) {
  console.error(
    `\n✗ prod-boot guard failed: ${failed} of ${pages.length} prerendered page(s) ` +
      `have a boot import that would 404 in production.\n`,
  )
  process.exit(1)
}

console.log(
  `✓ prod-boot guard: ${pages.length} prerendered page(s) boot cleanly (no 404-prone imports).`,
)
