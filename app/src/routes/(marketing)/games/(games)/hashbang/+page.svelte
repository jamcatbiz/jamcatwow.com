<script lang="ts">
  import Board from "$hashbang/_components/Board.svelte"
  import { board, todaysGame, yesterdaysGame } from "$hashbang/state.svelte"
  import type { PageLoadData } from "$hashbang/local_types"
  let { data }: { data: PageLoadData } = $props()

  Object.assign(todaysGame, data.todaysGame)
  Object.assign(board, data.board)
  Object.assign(yesterdaysGame, data.yesterdaysGame)
</script>

<div class="flex justify-center">
  <div class="flex flex-col justify-center mt-10">
    <Board />
    <div class="flex flex-col mt-6 text-center ml-3 w-80">
      <p class="text-lg">Swap letters to make four words.</p>
      <p class="text-lg">Highlighted letters are locked in place.</p>
      <p class="mt-2 text-xl font-semibold">
        Today's solution has <span class="underline decoration-info"
          >{todaysGame.solvedSwaps.count} swaps</span
        >.
      </p>
    </div>
  </div>
</div>
