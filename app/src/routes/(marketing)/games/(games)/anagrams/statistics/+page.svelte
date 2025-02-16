<script lang="ts">
  import {
    points,
    progress,
    statGamesPlayed,
    statWordsFound,
    timedPoints,
    timedProgress,
  } from "$anagrams/state.svelte"

  import Scoreboard from "$anagrams/_components/Scoreboard.svelte"
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
    <h3 class="text-2xl font-semibold font-serif">Stats</h3>

    <div class="flex justify-center">
      <div class="stats stats-vertical lg:stats-horizontal">
        <div class="stat place-items-center">
          <div class="stat-title">Days Played</div>
          <div class="stat-value">{statGamesPlayed.val}</div>
        </div>
      
        <div class="stat place-items-center">
          <div class="stat-title">Words Found</div>
          <div class="stat-value">{statWordsFound.val}</div>
        </div>
      </div>
    </div>

    <div class="divider"></div>
    <div class="flex justify-evenly">
      <div class="flex flex-col">
        <p class="">Today's timed score</p>
        <Scoreboard
          thisPoints={timedPoints.val}
          thisProgress={timedProgress.val}
        />
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="flex flex-col">
        <p>Today's total score</p>
        <Scoreboard thisPoints={points.val} thisProgress={progress.val} />
      </div>
    </div>
    <div class="divider"></div>
    <div class="flex justify-center pt-6">
      <ShareButton />
    </div>
  </div>
</div>
