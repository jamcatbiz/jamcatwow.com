<script lang="ts">
  import type { PageLoadData } from "$numbers/local_types.ts"

  import {
    todaysDateIso,
    lastPlayedDate,
    todaysGame,
    yesterdaysGame,
    hasResumed,
    livePlayNumbers,
  } from "$numbers/state.svelte"

  import StartScreen from "$numbers/_components/StartScreen.svelte"
  import GameScreen from "$numbers/_components/GameScreen.svelte"
  import ResumeScreen from "$numbers/_components/ResumeScreen.svelte"

  let { data }: { data: PageLoadData } = $props()

  Object.assign(todaysGame, data.todaysGame)
  Object.assign(yesterdaysGame, data.yesterdaysGame)

  for (let i = 0; i < livePlayNumbers.val.length; i++) {
    livePlayNumbers.val[i] = todaysGame.playNumbers[i]
  }
</script>

{#if lastPlayedDate.val != todaysDateIso}
  <StartScreen />
{:else if !hasResumed.val}
  <ResumeScreen />
{:else}
  <GameScreen />
{/if}
