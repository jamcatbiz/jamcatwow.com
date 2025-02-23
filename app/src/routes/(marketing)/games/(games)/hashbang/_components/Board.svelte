<script lang="ts">
  import { activeCell, board, swaps, todaysGame } from "$hashbang/state.svelte"

  function handleClick(i: number, j: number): MouseEventHandler {
    if (i * 10 + j in todaysGame.locks) {
      return
    }

    if (activeCell[0] == 0 && activeCell[1] == 0) {
      activeCell[0] = i
      activeCell[1] = j
    } else {
      const tmp = board[i][j]
      board[i][j] = board[activeCell[0]][activeCell[1]]
      board[activeCell[0]][activeCell[1]] = tmp
      const toKey = i * 10 + j
      const fromKey = activeCell[0] * 10 + activeCell[1]
      if (toKey in swaps.swaps && fromKey in swaps.swaps[toKey]) {
        delete swaps.swaps[toKey][fromKey]
        delete swaps.swaps[fromKey][toKey]
        swaps.count -= 1
      } else {
        if (!(toKey in swaps.swaps)) {
          swaps.swaps[toKey] = {
            colors: [],
          }
        }
        swaps.swaps[toKey].colors.push("primary")
        if (!(fromKey in swaps.swaps)) {
          swaps.swaps[fromKey] = {
            colors: [],
          }
        }
        swaps.swaps[toKey].colors.push("primary")
        swaps.count += 1
      }
      activeCell[0] = 0
      activeCell[1] = 0
    }
    return null
  }
</script>

<div class="flex flex-col">
  {#each board as row, i}
    {console.log("d")}
    <div class="flex">
      {#each row as letter, j}
        <div class="indicator">
          {#if letter == " "}
            <div class="w-16 h-16 m-1"></div>
          {:else if i * 10 + j in todaysGame.locks}
            <div
              id="{i}-{j}"
              class="border-info border-4 rounded-lg text-center content-center w-16 h-16 m-1"
            >
              {letter.toUpperCase()}
            </div>
          {:else if activeCell[0] == i && activeCell[1] == j}
            {#if swaps.includes(`${toKey}-${fromKey}`)}
              <span class="indicator-item badge badge-primary"></span>
            {/if}
            <button
              id="{i}-{j}"
              class="btn w-16 h-16 m-1"
              onclick={handleClick(i, j)}
            >
              {letter.toUpperCase()}
            </button>
          {:else}
            {#if i * 10 + j in swaps.swaps}
              <span class="indicator-item badge badge-xs badge-} m-2"></span>
            {/if}
            <button
              id="{i}-{j}"
              class="btn btn-neutral w-16 h-16 m-1"
              onclick={handleClick(i, j)}
            >
              {letter.toUpperCase()}
            </button>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>
