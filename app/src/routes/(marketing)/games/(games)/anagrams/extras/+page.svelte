<script lang="ts">
  import { todaysGame, yesterdaysGame } from "$anagrams/state.svelte"

  import ShareButton from "$anagrams/_components/ShareButton.svelte"
  // @ts-ignore
  import IconBack from "~icons/fa6-solid/chevron-left"
</script>

<div class="flex justify-center">
  <div class="px-6 pb-10">
    <a href="/games/anagrams">
      <button class="btn btn-ghost btn-sm opacity-50 px-2 mb-2.5">
        <IconBack /> Back to game
      </button>
    </a>
    <h3 class="text-2xl font-semibold font-serif">Archive</h3>
    <div class="font-light mt-3">
      <p>Coming soon!</p>
    </div>
    <div class="divider"></div>

    <h3 class="text-2xl font-semibold font-serif">Yesterday's Answers</h3>
    <h5 class="mt-3 font-semibold">
      #{yesterdaysGame.gameNumber}
      {yesterdaysGame.word.toUpperCase()}
    </h5>
    <p class="font-light">
      {Object.keys(yesterdaysGame.answers).length} answers
    </p>
    <div class="divider"></div>
    <div class="grid grid-cols-6 gap-2 mx-2">
      {#each Object.keys(yesterdaysGame.answers) as answer}
        <a
          href="https://en.wiktionary.org/wiki/{answer}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="btn btn-sm btn-ghost w-16">{answer}</div>
        </a>
      {/each}
    </div>
    <div class="divider"></div>
    <p class="text-xs text-center">Press a word to learn more</p>

    <div class="divider"></div>
    <div class="space-y-2">
      <header class="text-2xl font-bold font-serif">Support</header>

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
