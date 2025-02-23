<script lang="ts">
  import BackButton from "$anagrams/_components/BackButton.svelte"
  import Scoreboard from "$anagrams/_components/Scoreboard.svelte"
  import ShareButton from "$anagrams/_components/ShareButton.svelte"
</script>

<div class="flex w-full justify-center">
  <div class="px-6 pb-10">
    <BackButton />
    <h3 class="text-2xl font-semibold font-serif">How To Play</h3>
    <p class="font-medium mt-2">Find words by reordering letters.</p>
    <p class="font-medium mt-1">
      An anagram is a word created by reordering the letters of another word.
    </p>
    <div class="instructions font-light mt-1">
      <ul class="list-disc pl-10 mt-1">
        <li>Words must be 4+ letters</li>
        <li>More letters = more points</li>
        <li>Find words for 5 minutes</li>
        <li>Keep playing after to find them all</li>
        <li>New puzzles released daily, midnight est.</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-semibold font-serif mt-4">Scoring</h3>
      <Scoreboard thisProgress={82} thisPoints={280} />
      <ul class="list-disc pl-10 font-light mt-3">
        <li>Rectangle holds points, the more the better</li>
        <li>Circle holds % of words found, ~22% in five minutes is par</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-semibold font-serif mt-4">Sharing</h3>
      <p class="mt-3">
        You can share using any button that looks like the below, and you'll
        share a message that looks like the preview.
      </p>
      <div class="flex flex-col mt-4 items-center">
        <div class="chat chat-end w-80">
          <div class="chat-bubble">
            JamCatWow Anagrams #34 <br />
            ⬜️ 485 timed, 865 total <br />
            ⚪️ 20% timed, 38% total <br />
            jamcatwow.com/games/anagrams
          </div>
        </div>
        <div class="flex mt-4">
          <ShareButton />
        </div>
      </div>
    </div>
  </div>
</div>
