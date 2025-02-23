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
      <span
        class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
      >
        Share your score,
      </span>
      keep playing for more!
    </p>
    <p class="mt-2">
      Come back tomorrow,
      <span
        class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
      >
        new games daily.
      </span>
    </p>
    <p class="mt-2">
      <span
        class="font-semibold underline decoration-secondary decoration-[2px] md:decoration-[2px]"
      >
        Subscribe
      </span>
      for access to more games and more stats!
    </p>
    <div class="mt-6">
      <ShareButton />
    </div>
    <div class="mt-3">
      <a href="/subscriptions">
        <button
          class="btn btn-wide shadow-md shadow-primary"
          aria-label="subscribe"
        >
          Subscribe
        </button>
      </a>
    </div>
    <div class="divider"></div>
    <div class="">
      <a href="/games/numbers">
        <button
          class="btn btn-wide btn-sm btn-neutral shadow-md"
          aria-label="next_game"
        >
          Next Game
        </button>
      </a>
    </div>
    <div class="mt-3">
      <a href="/scoreboard">
        <button
          class="btn btn-wide btn-sm btn-neutral shadow-md"
          aria-label="scoreboard"
        >
          Scoreboard
        </button>
      </a>
    </div>
    <div class="mt-3">
      <a href="/archive">
        <button
          class="btn btn-wide btn-sm btn-neutral shadow-md"
          aria-label="archive"
        >
          Archive
        </button>
      </a>
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
