<script lang="ts">
  import Board from "$hashbang/_components/Board.svelte"
  import { board, todaysGame, yesterdaysGame } from "$hashbang/state.svelte"
  import type { PageLoadData } from "$hashbang/local_types"
  let { data }: { data: PageLoadData } = $props()

  Object.assign(todaysGame, data.todaysGame)
  Object.assign(board, data.board)
  Object.assign(yesterdaysGame, data.yesterdaysGame)
</script>

<div class="flex flex justify-center">
  <div class="flex flex-col justify-center mt-2">
    <Board />
    <div class="flex mt-6 text-center ml-3 w-80 font-light">
      <p>
        Swap letters to make four words. The highlighted letters are locked in
        place. The fewer swaps you need, the better.
      </p>
    </div>
  </div>
</div>
