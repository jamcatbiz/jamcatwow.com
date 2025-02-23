<script lang="ts">
  import {
    elapsedTime,
    hasGameOverShown,
    hasResumed,
    isFirstVisit,
    lastPlayedDate,
    todaysDateIso,
    todaysDateLocale,
    userSteps,
  } from "$numbers/state.svelte"

  function start(): void {
    userSteps.length = 0

    lastPlayedDate.val = todaysDateIso
    hasGameOverShown.val = false
    elapsedTime.val = 0
    hasResumed.val = true
  }

  if (isFirstVisit) {
    setTimeout(() => 2000)
  }
</script>

<div class="flex flex-col items-center text-center m-10">
  <p class="mt-6 text-xl">Use arithmetic to make goal numbers.</p>
  <div class="mt-12">
    <button class="btn btn-wide btn-accent" onclick={start}>Start</button>
  </div>
  <div class="mt-4">
    <button class="btn btn-wide shadow-md shadow-accent">How To</button>
  </div>

  <div class="mt-6 text-sm font-light">
    <p>{todaysDateLocale}</p>
  </div>
</div>

