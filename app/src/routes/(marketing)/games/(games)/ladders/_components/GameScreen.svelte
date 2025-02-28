<script lang="ts">
  import { hasWon, points } from "$ladders/state.svelte"

  import Keyboard from "$ladders/_components/Keyboard.svelte"
  import WordList from "./WordList.svelte"
  import ButtonPanel from "$ladders/_components/ButtonPanel.svelte"
  import ShareButton from "$ladders/_components/ShareButton.svelte"
</script>

<div class="">
  <div class="flex flex-col items-center">
    <WordList />
    <ButtonPanel />
    <div class="flex flex-col items-center mt-4">
      {#if hasWon.val}
        <p class="text-lg font-semibold">
          <span class="underline decoration-error decoration-2">
            You win! Nice work!
          </span>
        </p>
        <p
          class="mt-2 border-2 border-error rounded-md text-error w-16 h-8 font-semibold text-center content-center"
        >
          {points.val}
        </p>
        <p class="mt-4">
          Share your score,
          <span
            class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
          >
            try the next game,
          </span>
          or keep playing!
        </p>
        <div class="mt-4">
          <ShareButton />
        </div>
        <div class="mt-4">
          <a href="/games/numbers">
            <button
              class="btn btn-wide btn-neutral shadow-md"
              aria-label="next_game"
            >
              Next Game
            </button>
          </a>
        </div>
        <p class="mt-6">
          Come back tomorrow,
          <span
            class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
          >
            new games daily.
          </span>
        </p>
        <div class="mt-4">
          <a href="/subscriptions">
            <button
              class="btn btn-wide btn-sm btn-neutral shadow-md"
              aria-label="scoreboard"
            >
              Subscribe
            </button>
          </a>
        </div>
        <div class="mt-2">
          <a href="/scoreboard">
            <button
              class="btn btn-wide btn-sm btn-neutral shadow-md"
              aria-label="scoreboard"
            >
              Scoreboard
            </button>
          </a>
        </div>
        <div class="mt-2">
          <a href="/archive">
            <button
              class="btn btn-wide btn-sm btn-neutral shadow-md"
              aria-label="archive"
            >
              Archive
            </button>
          </a>
        </div>
        <div class="my-4 text-xs opacity-60">
          <p>Thank you for playing!</p>
        </div>
      {:else}
        <p class="text-lg font-medium">Swap one letter at a time.</p>
        <div class="basis-28 mt-4">
          <Keyboard />
        </div>
      {/if}
    </div>
  </div>
</div>
