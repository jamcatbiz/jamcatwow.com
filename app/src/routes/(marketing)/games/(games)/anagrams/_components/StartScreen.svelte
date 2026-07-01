<script lang="ts">
  import {
    elapsedTime,
    guesses,
    hasGameOverShown,
    hasResumed,
    isCandidate,
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
  import { track } from "$lib/analytics"

  function start(): void {
    track("game_started", { game: "anagrams", candidate: isCandidate })
    hasResumed.val = true
    hasGameOverShown.val = false
    guesses.val = {}
    points.val = 0
    progress.val = 0
    timedPoints.val = 0
    timedProgress.val = 0
    elapsedTime.val = 0
    // Candidate (creator play-ahead) plays must not touch streak/stats.
    if (!isCandidate) {
      lastPlayedDate.val = todaysDateIso
      statGamesPlayed.val = statGamesPlayed.val * 1 + 1
    }
  }

  if (isFirstVisit) {
    setTimeout(() => 2000)
  }
</script>

<div class="flex flex-col items-center m-10">
  <p class="mt-6 text-xl">Find words by reordering letters.</p>
  <button class="btn btn-wide btn-primary shadow-md mt-12" onclick={start}
    >Start</button
  >
  <a href="/subscriptions" class="flex justify-center w-full">
    <button
      class="btn btn-wide shadow-md shadow-primary mt-4"
      aria-label="subscribe"
    >
      Subscribe
    </button>
  </a>
  <div class="mt-6 text-sm font-light">
    <p>{todaysDateLocale}</p>
  </div>
</div>
