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
  <div class="mt-12">
    <button class="btn btn-wide btn-primary shadow-md" onclick={resume}>Continue</button>
  </div>
  <div class="mt-4">
    <a href="/subscriptions">
      <button 
        class="btn btn-wide shadow-md shadow-primary"
        aria-label="subscribe"
      >
        Subscribe
      </button>
    </a>
  </div>
  <div class="mt-6 text-sm font-light">
    <p>{todaysDateLocale}</p>
  </div>
</div>
