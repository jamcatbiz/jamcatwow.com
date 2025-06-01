<script lang="ts">
  import {
    todaysDateLocale,
    guessesSort,
    guesses,
    hasResumed,
  } from "$anagrams/state.svelte"

  function resume() {
    hasResumed.val = true
    for (let guess in guesses.val) {
      guessesSort[guess[0].toUpperCase()][guess] = true
    }
  }
</script>

<div class="flex flex-col items-center m-10">
  <p class="mt-6 text-xl">Keep playing today's game?</p>
  <button class="btn btn-wide btn-primary shadow-md mt-12" onclick={resume}
    >Continue</button
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
