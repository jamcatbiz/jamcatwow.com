<script lang="ts">
  import { currentGuess } from "$anagrams/state.svelte"
</script>

<div class="flex justify-center mt-1">
  {#each currentGuess as char, i (i)}
    <div class="flex items-center text-2xl font-extrabold pr-1.5">{char}</div>
  {/each}
  <div class="cursor">|</div>
</div>

<style>
  .cursor {
    padding-bottom: 0.5rem;
    display: flex;
    font-weight: 100;
    align-items: center;
    font-size: 40px;
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>
