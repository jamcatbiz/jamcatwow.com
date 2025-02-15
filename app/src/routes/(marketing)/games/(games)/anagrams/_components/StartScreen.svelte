<script lang="ts">
  import {
    elapsedTime,
    guesses,
    hasGameOverShown,
    hasResumed,
    isFirstVisit,
    lastPlayedDate,
    points,
    progress,
    statGamesPlayed,
    timedPoints,
    timedProgress,
    todaysDateIso,
    todaysDateLocale,
  } from "$anagrams/state.svelte"

  function start(): void {
    hasResumed.val = true
    lastPlayedDate.val = todaysDateIso
    hasGameOverShown.val = false
    guesses.val = {}
    points.val = 0
    progress.val = 0
    timedPoints.val = 0
    timedProgress.val = 0
    elapsedTime.val = 0
    statGamesPlayed.val = statGamesPlayed.val * 1 + 1
  }

  if (isFirstVisit) {
    setTimeout(() => 2000)
  }
</script>

<div class="flex flex-col items-center m-10">
  <p class="mt-6 text-xl">Find words by reordering letters.</p>
  <div class="mt-12">
    <button class="btn btn-wide btn-primary shadow-md" onclick={start}>Start</button>
  </div>
  <div class="mt-4">
    <a href="/subscriptions">
      <button 
        class="btn btn-wide shadow-md shadow-primary"
        aria-label="subscribe"
      >
        Subscribe
      </button>
    </a>  </div>
  <div class="mt-6 text-sm font-light">
    <p>{todaysDateLocale}</p>
  </div>
</div>
