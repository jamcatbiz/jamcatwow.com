<script lang="ts">
  // Creator play-ahead dashboard: shows the next un-scored candidate per game
  // and links straight into playing it. Data comes from the creator-gated
  // /api/creator-queue endpoint. See docs/adr/0009.
  const games = ["anagrams", "numbers"]
  type Queue = {
    next: { date: string; gameNumber: number | null } | null
    scoredAhead: number
  }
  let queues = $state<Record<string, Queue | null>>({})
  let loading = $state(true)
  let creatorOnly = $state(false)

  async function load() {
    for (const game of games) {
      const r = await fetch(`/api/creator-queue/${game}`)
      if (r.status === 403) {
        creatorOnly = true
        break
      }
      queues[game] = r.ok ? await r.json() : null
    }
    loading = false
  }
  load()
</script>

<svelte:head><title>Creator queue</title></svelte:head>

<div class="min-h-[60vh] max-w-md mx-auto p-6">
  <h1 class="text-2xl font-bold mb-1">Creator queue</h1>
  <p class="opacity-60 mb-4 text-sm">Play tomorrow's puzzles blind to set the line.</p>

  {#if creatorOnly}
    <p class="opacity-70">Creator only — log in as the creator to play ahead.</p>
  {:else if loading}
    <p class="opacity-70">Loading…</p>
  {:else}
    {#each games as game}
      {@const q = queues[game]}
      <div class="card bg-base-200 p-4 my-3">
        <h2 class="text-lg font-semibold capitalize">{game}</h2>
        {#if q?.next}
          <a
            class="btn btn-primary btn-sm mt-2 w-fit"
            href="/games/{game}?date={q.next.date}"
          >
            Play next{q.next.gameNumber ? ` #${q.next.gameNumber}` : ""} ({q.next
              .date})
          </a>
          <p class="text-sm opacity-60 mt-2">
            {q.scoredAhead} day{q.scoredAhead === 1 ? "" : "s"} scored ahead
          </p>
        {:else if q}
          <p class="text-sm opacity-70 mt-2">
            All caught up — {q.scoredAhead} day{q.scoredAhead === 1 ? "" : "s"} scored
            ahead.
          </p>
        {:else}
          <p class="text-sm opacity-70 mt-2">Couldn't load.</p>
        {/if}
      </div>
    {/each}
  {/if}
</div>
