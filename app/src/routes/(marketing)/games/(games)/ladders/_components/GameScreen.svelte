<script lang="ts">
  import { hasWon } from "$ladders/state.svelte"

  import Keyboard from "$ladders/_components/Keyboard.svelte"
  import WordList from "./WordList.svelte"
  import ButtonPanel from "$ladders/_components/ButtonPanel.svelte"
  import Header from "$ladders/_components/Header.svelte"
</script>

<div class="">
  <div class="flex flex-col items-center">
    <WordList />

    <ButtonPanel />

    <div class="mt-8">
      {#if hasWon.val}
        <p>YOU WON!</p>
      {/if}
    </div>
    <div class="basis-28">
      <Keyboard />
    </div>
  </div>
</div>
