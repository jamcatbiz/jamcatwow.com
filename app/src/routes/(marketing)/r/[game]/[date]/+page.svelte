<script lang="ts">
  import { onMount } from "svelte"
  import { track } from "$lib/analytics"

  let { data } = $props()

  const gameName = $derived(
    data.valid ? data.game[0].toUpperCase() + data.game.slice(1) : "JamCatWow",
  )
  const p = $derived(data.payload)
  const num = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0)

  // Spoiler-free performance lines, per game. Never reveals answers.
  const lines = $derived.by(() => {
    if (!p) return [] as { label: string; value: string }[]
    if (data.game === "numbers") {
      const pts = num(p.p)
      const stars = Math.max(0, Math.min(3, Math.floor(pts / 100)))
      return [
        { label: "Score", value: `${pts} points` },
        { label: "Stars", value: "★".repeat(stars) + "☆".repeat(3 - stars) },
      ]
    }
    // anagrams
    return [
      { label: "Score", value: `${num(p.p)} points` },
      { label: "Timed", value: `${num(p.tp)} points` },
      { label: "Found", value: `${num(p.pr)}%  ·  ${num(p.tpr)}% timed` },
    ]
  })

  const gameNumber = $derived(p ? num(p.n) : 0)

  onMount(() => {
    track("result_link_visited", {
      game: data.game,
      date: data.date,
      hasScore: !!p,
    })
  })
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content={data.description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="JamCatWow" />
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.description} />
  <meta property="og:url" content={data.pageUrl} />
  <meta property="og:image" content={data.ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.title} />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:image" content={data.ogImage} />
</svelte:head>

<div class="min-h-[70vh] flex items-center justify-center p-6">
  <div
    class="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200"
  >
    <div class="card-body items-center text-center gap-4">
      <p class="uppercase tracking-widest text-xs opacity-60">
        A JamCatWow challenge
      </p>

      <h1 class="text-3xl font-serif font-bold">
        {gameName}{#if gameNumber}<span class="opacity-50"> #{gameNumber}</span
          >{/if}
      </h1>

      {#if p}
        <p class="text-base opacity-80">Someone challenged you to beat their score:</p>
        <div class="grid grid-cols-1 gap-1 w-full my-1">
          {#each lines as line}
            <div class="flex justify-between px-2 py-1 border-b border-base-200 last:border-0">
              <span class="opacity-60">{line.label}</span>
              <span class="font-bold">{line.value}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-base opacity-80">
          Play today's puzzle and share your score.
        </p>
      {/if}

      {#if data.valid}
        <a
          href="/games/{data.game}"
          class="btn btn-wide bg-linear-to-r from-primary to-accent shadow-primary shadow-lg border-none text-primary-content"
        >
          Play {gameName}
        </a>
      {:else}
        <a
          href="/games"
          class="btn btn-wide bg-linear-to-r from-primary to-accent shadow-primary shadow-lg border-none text-primary-content"
        >
          Play JamCatWow
        </a>
      {/if}

      <p class="text-xs opacity-50">Free daily word &amp; number games.</p>
    </div>
  </div>
</div>
