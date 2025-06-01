<script lang="ts">
  import { answers, points, todaysGame } from "$numbers/state.svelte"

  // @ts-ignore
  import IconEmpty from "~icons/fa6-regular/star"
  // @ts-ignore
  import IconSolved from "~icons/fa6-solid/star"
</script>

<div class="flex flex-col items-center mt-3">
  <p
    class="border-2 border-accent rounded-md text-accent w-16 h-8 font-semibold content-center"
  >
    {points.val}
  </p>
  <p class="text-sm font-light mt-2">
    Use any combination of numbers to reach the targets:
  </p>
  <div class="flex">
    <div class="flex font-bold text-4xl mt-3"></div>
    {#each todaysGame.goalNumbers as goalNumber}
      <div class="indicator">
        {#if goalNumber in answers && answers[goalNumber].bonusPoints > 0}
          <span
            class="indicator-item indicator-center indicator-bottom badge badge-accent"
          >
            +{answers[goalNumber].bonusPoints}
          </span>
        {/if}
        <div
          class="card bg-base-200 w-20 h-20 m-1 mt-2 p-2.5 font-bold text-3xl"
        >
          <div class="flex flex-col">
            <div class="flex justify-center">
              <h2 class="">{goalNumber}</h2>
            </div>
            <div class="flex pb-1 justify-center text-sm text-accent">
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
      </div>
    {/each}
  </div>
</div>
