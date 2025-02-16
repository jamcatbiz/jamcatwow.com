<script lang="ts">
  import { statGamesPlayed, statNumbersFound } from "$numbers/state.svelte"

  import ShareButton from "$numbers/_components/ShareButton.svelte"
  // @ts-ignore
  import IconBack from "~icons/fa6-solid/chevron-left"
</script>

<div class="flex w-full justify-center">
  <div class="flex flex-col p-6 w-3/4 space-y-4">
    <a href="/games/numbers">
      <button class="btn btn-ghost btn-sm opacity-50 px-2 mb-2.5">
        <IconBack /> Back to game
      </button>
    </a>
    <header class="text-2xl font-serif font-semibold">Stats</header>
    <p>Coming soon!</p>
    <div class="flex justify-center">
      <ShareButton />
    </div>
  </div>
</div>
