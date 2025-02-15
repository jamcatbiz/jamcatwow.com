<script lang="ts">
  import { answers, todaysGame } from "$numbers/state.svelte"

  // @ts-ignore
  import IconEmpty from "~icons/fa6-regular/star"
  // @ts-ignore
  import IconSolved from "~icons/fa6-solid/star"
</script>

<div class="flex flex-col items-center mt-4">
  <p class="text-sm font-light">Use any combination of numbers to reach the targets:</p>
  <div class="flex">
    <div class="flex font-bold text-4xl mt-3"></div>
    {#each todaysGame.goalNumbers as goalNumber}
      <div class="card bg-base-300 w-20 h-20 m-1 mt-2 p-2.5 font-bold text-3xl">
        <div class="flex flex-col">
          <div class="flex justify-center">
            <h2 class="">{goalNumber}</h2>
          </div>
          <div
            class="flex pb-1 justify-center text-sm text-accent"
          >
            <div class="">
              {#if goalNumber in answers && answers[goalNumber].solved}
                <IconSolved />
              {:else}
                <IconEmpty />
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
