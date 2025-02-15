<script lang="ts">
  import {
    bottomGuesses,
    guessInput,
    hasWon,
    todaysGame,
    hintsUsed,
    topGuesses,
  } from "$ladders/state.svelte"

  const range = [...Array(todaysGame.topWord.length).keys()]
</script>

<div class="text-5xl font-mono tracking-widest mt-8 min-h-56">
  <div class="">
    <p>{todaysGame.topWord.toUpperCase()}</p>
  </div>

  <div class="">
    {#each topGuesses.val as guess, index}
      {#if index < (hintsUsed.val % 2) + Math.floor(hintsUsed.val / 2)}
        <p class="text-error">{guess}</p>
      {:else}
        <p>{guess}</p>
      {/if}
    {/each}
  </div>

  <div id="input" class="flex flex-row">
    {#if !hasWon.val}
      {#each range as i}
        <div class="">
          {#if guessInput.val.length > i}
            <div>
              {guessInput.val[i]}
            </div>
          {:else if guessInput.val.length == i}
            <div class="doesBlink">_</div>
          {:else}
            _
          {/if}
        </div>
      {/each}
    {/if}
  </div>

  <div class="">
    {#each bottomGuesses.val as guess, index}
      {#if bottomGuesses.val.length - index - 1 < Math.floor(hintsUsed.val / 2)}
        <p class="text-error">{guess}</p>
      {:else}
        <p>{guess}</p>
      {/if}
    {/each}
  </div>

  <div class="">
    <p>{todaysGame.bottomWord.toUpperCase()}</p>
  </div>
</div>
