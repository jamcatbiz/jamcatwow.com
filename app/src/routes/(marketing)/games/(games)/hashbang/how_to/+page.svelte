<script lang="ts">
  import ShareButton from "$numbers/_components/ShareButton.svelte"

  // @ts-ignore
  import IconEmpty from "~icons/fa6-regular/star"
  // @ts-ignore
  import IconSolved from "~icons/fa6-solid/star"
    // @ts-ignore
  import IconBack from "~icons/fa6-solid/chevron-left"
</script>

<div class="flex w-full justify-center">
  <div class="px-6 pb-10">
    <a href="/games/hashbang">
      <button class="btn btn-ghost btn-sm opacity-50 px-2 mb-2.5">
        <IconBack /> Back to game
      </button>
    </a>
    <h3 class="text-2xl font-serif font-semibold">How To Play</h3>
    <p class="mt-2">Race to calculate goal numbers using arithmetic.</p>
    <div class="instructions font-light">
      <ul class="list-disc pl-10">
        <li>There are 3 goal numbers</li>
        <li>There are 6 starting numbers</li>
        <li>Use addition, subtraction, multiplication, and division</li>
        <li>Find goal numbers for 3 minutes</li>
        <li>Get one star for finding a goal number</li>
        <li>Get one star for finding the shortest path to a goal number</li>
        <li>New puzzles released daily, midnight est</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Scoring</h3>
      <div class="flex justify-center">
        <div
          class="flex card w-24 justify-center p-2 m-1 font-bold text-4xl mt-4"
        >
          <div class="flex flex-col">
            <div class="flex">
              <h2 class="">123</h2>
            </div>
            <div
              class="flex text-surface-500 pb-1 justify-center text-sm text-accent"
            >
              <div class="">
                <IconSolved />
              </div>
              <div class="">
                <IconEmpty />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-disc pl-10">
        <li>Big bold number is the goal number</li>
        <li>1st star can be achieved by getting to a goal number</li>
        <li>2nd star can be achieved by finding the shortest path</li>
        <li>Above, we have found the number, but not the shortest path</li>
      </ul>
      <div class="divider"></div>

      <h3 class="text-2xl font-serif font-semibold mt-4">Sharing</h3>
      <p class="mt-2">
        You can share using any button that looks like the below, and you'll
        share a message that looks like the preview.
      </p>
      <div class="flex flex-col mt-4 items-center">
        <div class="chat chat-end w-80">
          <div class="chat-bubble">JamCatWow Anagrams #34 <br>
            ⬜️ 485 timed, 865 total <br>
            ⚪️ 20% timed, 38% total <br>
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
