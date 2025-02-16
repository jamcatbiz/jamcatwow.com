<script lang="ts">
  import { todaysGame, yesterdaysGame } from "$ladders/state.svelte"
  import ShareButton from "$ladders/_components/ShareButton.svelte";
    // @ts-ignore
  import IconBack from "~icons/fa6-solid/chevron-left"
</script>

<div class="flex w-full justify-center">
  <div class="px-6 pb-10">
    <a href="/games/ladders">
      <button class="btn btn-ghost btn-sm opacity-50 px-2 mb-2.5">
        <IconBack /> Back to game
      </button>
    </a>
    <h3 class="text-2xl font-serif font-semibold">Archive</h3>
    <div class="font-light mt-3">
      <p>Coming soon!</p>
    </div>
    <div class="divider"></div>

    <h3 class="text-2xl font-serif font-semibold">Yesterday's Answers</h3>
    <h5 class="font-bold mt-3">
      #{yesterdaysGame.gameNumber}
    </h5>
    <p>Coming soon!</p>
    <div class="divider"></div>
    <div class="space-y-2">
      <header class="text-2xl font-serif font-semibold">Support</header>

      <div class="font-light mt-3">
        The easiest way to support us is to share our game and play with your
        favorite people, but check out these other ways too!
      </div>

      <div class="flex flex-col justify-center items-center space-y-2 pt-4">
        <a
          class="btn btn-wide"
          href="https://www.buymeacoffee.com/jamcatbiz"
          target="_blank"
          rel="noopener noreferrer"
        >
          ☕️ Buy Me a Coffee
        </a>
        <a
          class="btn btn-wide"
          href="/subscriptions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe
        </a>
        <ShareButton />
      </div>
    </div>
  </div>
</div>
