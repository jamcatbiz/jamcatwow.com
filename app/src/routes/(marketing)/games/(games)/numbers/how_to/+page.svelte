<script lang="ts">
  import ShareButton from "$numbers/_components/ShareButton.svelte"

  // @ts-ignore
  import IconEmpty from "~icons/fa6-regular/star"
  // @ts-ignore
  import IconSolved from "~icons/fa6-solid/star"
  // @ts-ignore
  import IconBack from "~icons/fa6-solid/chevron-left"
  import { answers, todaysGame } from "$numbers/state.svelte"
  import BackButton from "$numbers/_components/BackButton.svelte"
</script>

<div class="flex w-full justify-center">
  <div class="px-6 pb-10">
    <BackButton />
    <h3 class="text-2xl font-serif font-semibold">How To Play</h3>
    <p class="mt-3">Race to calculate goal numbers using arithmetic.</p>
    <div class="instructions font-light">
      <ul class="list-disc pl-10">
        <li>There are three goal numbers</li>
        <li>There are six starting play numbers</li>
        <li>Use addition, subtraction, multiplication, and division</li>
        <li>Find goal numbers for three minutes</li>
        <li>Earn bonus points for short solutions</li>
        <li>New puzzles released daily, midnight est</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Scoring</h3>
      <div class="flex justify-center mt-3">
        <div
          class="flex card bg-base-300 w-20 h-20 p-2.5 m-1 font-bold text-3xl"
        >
          <div class="flex flex-col">
            <div class="flex justify-center">
              <h2 class="">123</h2>
            </div>
            <div class="flex pb-1 justify-center text-sm text-accent">
              <div class="">
                <IconEmpty />
              </div>
            </div>
          </div>
        </div>
        <div class="indicator">
          <span
            class="indicator-item indicator-bottom indicator-center badge badge-accent"
            >+45</span
          >
          <div
            class="flex card bg-base-300 w-20 h-20 p-2.5 m-1 font-bold text-3xl"
          >
            <div class="flex flex-col">
              <div class="flex justify-center">
                <h2 class="">456</h2>
              </div>
              <div class="flex pb-1 justify-center text-sm text-accent">
                <div class="">
                  <IconSolved />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="indicator">
          <span
            class="indicator-item indicator-bottom indicator-center badge badge-accent"
            >+15</span
          >
          <div
            class="flex card bg-base-300 w-20 h-20 p-2.5 m-1 font-bold text-3xl"
          >
            <div class="flex flex-col">
              <div class="flex justify-center">
                <h2 class="">789</h2>
              </div>
              <div class="flex pb-1 justify-center text-sm text-accent">
                <div class="">
                  <IconSolved />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-4">
        <ul class="list-disc pl-10">
          <li>Big bold number is the goal number</li>
          <li>Star can be achieved by getting to a goal number</li>
          <li>Each star is worth 100 points</li>
          <li>Shorter solutions earn bonus points</li>
        </ul>
      </div>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Sharing</h3>
      <p class="mt-3">
        You can share using any button that looks like the below, and you'll
        share a message that looks like the preview.
      </p>
      <div class="flex flex-col mt-4 items-center">
        <div class="chat chat-end w-80">
          <div class="chat-bubble">
            JamCatWow Numbers #34 <br />
            {todaysGame.goalNumbers[0]}
            {todaysGame.goalNumbers[1]}
            {todaysGame.goalNumbers[2]}<br />
            {#each todaysGame.goalNumbers as goalNumber}
              {#if goalNumber in answers && answers[goalNumber].solved}
                . ★ .
              {:else}
                . ☆ .
              {/if}
            {/each}
            <br />
            270 points<br />
            jamcatwow.com/games/numbers
          </div>
        </div>
        <div class="flex mt-4">
          <ShareButton />
        </div>
      </div>
    </div>
  </div>
</div>
