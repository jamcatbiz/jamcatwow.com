<script lang="ts">
  import { activeCell, board, todaysGame } from "$hashbang/state.svelte"

  function handleClick(i: number, j: number): void {
    if (i * 10 + j in todaysGame.locks) {
      return
    }

    if (activeCell[0] == 0 && activeCell[1] == 0) {
      activeCell[0] = i
      activeCell[1] = j
    } else {
      let tmp = board[i][j]
      board[i][j] = board[activeCell[0]][activeCell[1]]
      board[activeCell[0]][activeCell[1]] = tmp
      activeCell[0] = 0
      activeCell[1] = 0
    }
  }
</script>

<div class="flex flex-col">
  {#each board as row, i}
    {console.log("d")}
    <div class="flex">
      {#each row as letter, j}
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
          <button
            id="{i}-{j}"
            class="btn w-16 h-16 m-1"
            onclick={handleClick(i, j)}
          >
            {letter.toUpperCase()}
          </button>
        {:else}
          <button
            id="{i}-{j}"
            class="btn btn-neutral w-16 h-16 m-1"
            onclick={handleClick(i, j)}
          >
            {letter.toUpperCase()}
          </button>
        {/if}
      {/each}
    </div>
  {/each}
</div>
