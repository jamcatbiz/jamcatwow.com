<script lang="ts">
  import { statGamesPlayed, statNumbersFound } from "$numbers/state.svelte"

  import ShareButton from "$numbers/_components/ShareButton.svelte"
  // @ts-ignore
  import IconBack from "~icons/fa6-solid/chevron-left"
  import BackButton from "$numbers/_components/BackButton.svelte"
</script>

<div class="flex w-full justify-center">
  <div class="flex flex-col p-6 w-3/4 space-y-4">
    <BackButton />
    <header class="text-2xl font-serif font-semibold">Stats</header>
    <p>Coming soon!</p>
    <div class="flex justify-center">
      <ShareButton />
    </div>
  </div>
</div>
