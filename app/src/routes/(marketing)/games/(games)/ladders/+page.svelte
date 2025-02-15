<script lang="ts">
  import type { PageLoadData } from "$ladders/local_types.ts"
  import GameScreen from "$ladders/_components/GameScreen.svelte"

  import { todaysGame, yesterdaysGame } from "$ladders/state.svelte"

  let { data }: { data: PageLoadData } = $props()

  Object.assign(todaysGame, data.todaysGame)
  Object.assign(yesterdaysGame, data.yesterdaysGame)
</script>

<GameScreen />

<style>
  :global(.doesBlink) {
    animation: blinker 1.5s linear infinite;
  }

  :global(.doesShake1) {
    animation: shake1 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  :global(.doesShake2) {
    animation: shake2 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  @keyframes shake1 {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  @keyframes shake2 {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
