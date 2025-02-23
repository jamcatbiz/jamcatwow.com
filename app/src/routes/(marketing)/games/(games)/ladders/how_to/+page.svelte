<script lang="ts">
  import BackButton from "$ladders/_components/BackButton.svelte"
  import ShareButton from "$ladders/_components/ShareButton.svelte"
  import { todaysGame } from "$ladders/state.svelte"
</script>

<div class="flex w-full justify-center">
  <div class="px-6 pb-10">
    <BackButton />
    <h3 class="text-2xl font-serif font-semibold">How To Play</h3>
    <p class="mt-3 font-medium">Classic word ladders puzzle.</p>
    <div class="instructions font-light mt-1">
      <ul class="list-disc pl-10">
        <li>Change one letter at a time, step by step</li>
        <li>Work from the top or bottom word</li>
        <li>Use hints for help, at the cost of points</li>
        <li>
          Words gained from hints will show in <span
            class="text-error font-semibold">red</span
          >
        </li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Scoring</h3>
      <ul class="list-disc pl-10 mt-3">
        <li>You start with 300 potential points</li>
        <li>Each hint costs 50 points</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Sharing</h3>
      <p class="mt-3">
        You can share using any button that looks like the below, and you'll
        share a message that looks like the preview.
      </p>
      <div class="flex flex-col mt-4 items-center">
        <div class="chat chat-end w-80">
          <div class="chat-bubble">
            JamCatWow Ladders #34<br />
            {todaysGame.topWord}<br />
            ...<br />
            {todaysGame.bottomWord}<br />
            200/300 jamcatwow.com/games/ladders
          </div>
        </div>
        <div class="flex mt-4">
          <ShareButton />
        </div>
      </div>
    </div>
  </div>
</div>
