<script lang="ts">
  import { todaysGame, yesterdaysGame } from "$hashbang/state.svelte"
  import ShareButton from "$hashbang/_components/ShareButton.svelte";
</script>

<div class="flex w-full justify-center">
  <div class="p-6 space-y-4">
    <h3 class="text-2xl font-serif font-semibold">Archive</h3>
    <div class="font-light">
      <p>Coming soon!</p>
    </div>
    <div class="divider"></div>

    <h3 class="text-2xl font-serif font-semibold">Yesterday's Answers</h3>
    <h5 class="font-bold">
      #{yesterdaysGame.gameNumber}
    </h5>
    <p>Coming soon!</p>
    <div class="divider"></div>
    <div class="space-y-2">
      <header class="text-2xl font-serif font-semibold">Support</header>

      <div class="font-light">
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

<style>
  ul {
    margin: 0.5rem 0rem;
  }

  .answerContainer {
    min-height: 15rem;
    max-height: 20rem;
    overflow: auto;
  }

  .answerList {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
    column-count: 4;
    column-gap: 0.5rem;
    text-align: left;
  }

  .answer {
    margin-bottom: 0.25rem;
    font-size: 15px;
    padding-right: 1rem;
    transition: color 0.3s;
  }

  .answer:hover {
    color: rgba(var(--color-primary-400) / 1);
  }

  .exitContainer {
    justify-content: right;
    display: flex;
  }

  .exit {
    font-size: 15px;
  }
</style>
