<script lang="ts">
  import {
    timerDuration,
    elapsedTime,
    hasGameOverShown,
  } from "$anagrams/state.svelte"
  import ShareButton from "$anagrams/_components/ShareButton.svelte"

  let last_time: number = window.performance.now()
  let frame: number
  ;(function update(): void {
    frame = requestAnimationFrame(update)
    const time: number = window.performance.now()
    elapsedTime.val += Math.min(
      time - last_time,
      timerDuration - elapsedTime.val,
    )
    last_time = time

    if (!hasGameOverShown.val && elapsedTime.val >= timerDuration) {
      hasGameOverShown.val = true
      // @ts-ignore
      anagrams_time_over.showModal()
    }
  })()
</script>

<dialog id="anagrams_time_over" class="modal">
  <div class="modal-box">
    <h3 class="text-xl font-bold">Time's Up!</h3>
    <p class="mt-2">
      Share your score,
      <span
        class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
      >
        try the next game,
      </span>
      or keep playing!
    </p>
    <div class="mt-4">
      <ShareButton />
    </div>
    <div class="mt-4">
      <a href="/games/numbers">
        <button
          class="btn btn-wide btn-outline btn-primary shadow-primary shadow-md"
          aria-label="next_game"
        >
          Next Game
        </button>
      </a>
    </div>
    <p class="mt-6">
      Come back tomorrow,
      <span
        class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
      >
        new games daily.
      </span>
    </p>
    <div class="mt-4">
      <a href="/subscriptions">
        <button
          class="btn btn-wide btn-sm btn-neutral shadow-md"
          aria-label="scoreboard"
        >
          Subscribe
        </button>
      </a>
    </div>
    <div class="mt-2">
      <a href="/scoreboard">
        <button
          class="btn btn-wide btn-sm btn-neutral shadow-md"
          aria-label="scoreboard"
        >
          Scoreboard
        </button>
      </a>
    </div>
    <div class="mt-2">
      <a href="/archive">
        <button
          class="btn btn-wide btn-sm btn-neutral shadow-md"
          aria-label="archive"
        >
          Archive
        </button>
      </a>
    </div>
    <div class="mt-4 text-xs opacity-60">
      <p>Thank you for playing!</p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<div class="">
  {(((timerDuration - elapsedTime.val) / 60000) | 0).toFixed(0)}:{(
    (((timerDuration - elapsedTime.val) % 60000) / 1000) |
    0
  )
    .toFixed(0)
    .padStart(2, "0")}
</div>
<div class="">
  <progress
    class="progress progress-primary w-56"
    value={elapsedTime.val}
    max={timerDuration}
  >
  </progress>
</div>
