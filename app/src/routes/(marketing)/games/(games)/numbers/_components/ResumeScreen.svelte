<script lang="ts">
  import {
    todaysDateLocale,
    hasResumed,
    userSteps,
  } from "$numbers/state.svelte"

  function resume() {
    userSteps.length = 0

    hasResumed.val = true
  }
</script>

<div class="flex flex-col items-center text-center m-10">
  <p class="mt-6 text-xl">Keep playing today's game?</p>
  <div class="mt-12">
    <button class="btn btn-wide btn-accent" onclick={resume}>Continue</button>
  </div>
  <div class="mt-4">
    <button class="btn btn-wide shadow-md shadow-accent">Subscribe</button>
  </div>

  <div class="mt-6 text-sm font-light">
    <p>{todaysDateLocale}</p>
  </div>
</div>
