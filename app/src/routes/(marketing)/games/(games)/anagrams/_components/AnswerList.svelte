<script lang="ts">
  import { guesses, guessesSort } from "$anagrams/state.svelte"
</script>

<div class="divider"></div>
<div class="flex justify-center">
  {#if Object.keys(guesses.val).length == 0}
    <p>Your answers will display here</p>
  {:else}
    {#each Object.keys(guessesSort) as char}
      {#if Object.keys(guessesSort[char]).length > 0}
        <div class="text-left w-16">
          {#each Object.keys(guessesSort[char]).sort() as word}
            <a
              href="https://en.wiktionary.org/wiki/{word}"
              target="_blank"
              rel="noopener noreferrer"
              style="text-decoration:none;display:inline-block"
            >
              <div class="btn btn-sm btn-ghost">{word}</div>
            </a>
          {/each}
        </div>
      {/if}
    {/each}
  {/if}
</div>
<div class="divider"></div>
<p class="text-xs">Press a word to learn more</p>
