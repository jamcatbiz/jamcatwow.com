<script lang="ts">
  import BackButton from "$hashbang/_components/BackButton.svelte"
  import ShareButton from "$hashbang/_components/ShareButton.svelte"
</script>

<div class="flex w-full justify-center">
  <div class="px-6 pb-10">
    <BackButton />
    <h3 class="text-2xl font-serif font-semibold">How To Play</h3>
    <p class="mt-2 font-medium">Solve the crossword by swapping letters.</p>
    <div class="instructions font-light">
      <ul class="list-disc pl-10">
        <li>There are four five-letter words scrambled up</li>
        <li>Highlighted squares are locked</li>
        <li>Symbol indicators help you track your swaps</li>
        <li>Aim for the target number of swaps each day</li>
        <li>Four strikes and you're out</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Scoring</h3>
      <ul class="list-disc pl-10 mt-3">
        <li>You start with 400 points</li>
        <li>Each strike loses 100 points</li>
        <li>You can keep playing after 4 strikes, it's not all about points</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Sharing</h3>
      <p class="mt-2">
        You can share using any button that looks like the below, and you'll
        share a message that looks like the preview.
      </p>
      <div class="flex flex-col mt-4 items-center">
        <div class="chat chat-end w-80">
          <div class="chat-bubble">
            JamCatWow Hashbang #34 <br />
            200/400 <br />
            jamcatwow.com/games/hashbang
          </div>
        </div>
        <div class="flex justify-center w-full mt-4">
          <ShareButton />
        </div>
      </div>
    </div>
  </div>
</div>
