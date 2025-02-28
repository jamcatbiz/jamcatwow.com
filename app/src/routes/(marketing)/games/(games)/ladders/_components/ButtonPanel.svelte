<script lang="ts">
  import {
    bottomGuesses,
    guessesAdded,
    hasWon,
    hintsUsed,
    points,
    todaysGame,
    topGuesses,
  } from "$ladders/state.svelte"

  function handleReset() {
    if (!hasWon) {
      topGuesses.val.length =
        (hintsUsed.val % 2) + Math.floor(hintsUsed.val / 2)
      bottomGuesses.val.splice(
        0,
        bottomGuesses.val.length - Math.floor(hintsUsed.val / 2),
      )
    }
  }

  function handleHint() {
    handleReset()
    if (hintsUsed.val < todaysGame.solutions[0].length - 3) {
      if (hintsUsed.val % 2 === 0) {
        const i = 1 + Math.floor(hintsUsed.val / 2)
        guessesAdded.val = [...guessesAdded.val, "top"]
        topGuesses.val = [
          ...topGuesses.val,
          todaysGame.solutions[0][i].toUpperCase(),
        ]
      } else {
        const i =
          todaysGame.solutions[0].length - 2 - Math.floor(hintsUsed.val / 2)
        guessesAdded.val = [...guessesAdded.val, "bottom"]
        bottomGuesses.val = [
          ...bottomGuesses.val,
          todaysGame.solutions[0][i].toUpperCase(),
        ]
      }
      hintsUsed.val = hintsUsed.val + 1
      points.val -= 50
    } else {
      const element = document.getElementById("hintButton")
      if (
        element &&
        !element.classList.replace("doesShake1", "doesShake2") &&
        !element.classList.replace("doesShake2", "doesShake1")
      ) {
        element.classList.add("doesShake1")
      }
    }
  }
</script>

<div class="flex mt-8 space-x-10 justify-evenly">
  <div class="flex">
    <button class="btn min-w-20" id="resetButton" onclick={handleReset}>
      Reset
    </button>
  </div>
  <div class="flex">
    <div class="flex">
      <div class="indicator">
        {#if hintsUsed.val > 0}
          <span class="indicator-item badge badge-sm badge-error"
            >{hintsUsed.val}</span
          >
        {/if}
        <button
          class="btn btn-error btn-outline min-w-20"
          id="hintButton"
          onclick={handleHint}
        >
          Hint
        </button>
      </div>
    </div>
  </div>
</div>
