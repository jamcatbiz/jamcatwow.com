<script lang="ts">
  import { points, progress, todaysGame } from "$anagrams/state.svelte"

  import Keyboard from "$anagrams/_components/Keyboard.svelte"
  import Guess from "$anagrams/_components/Guess.svelte"
  import Timer from "$anagrams/_components/Timer.svelte"
  import Scoreboard from "$anagrams/_components/Scoreboard.svelte"
  import Word from "$anagrams/_components/Word.svelte"
  import AnswerList from "$anagrams/_components/AnswerList.svelte"
</script>

<div class="flex flex-col text-center m-10">
  <Word word={todaysGame.word} />
  <Timer />
  <Scoreboard thisProgress={progress.val} thisPoints={points.val} />
  <Guess />
  <Keyboard />
  <AnswerList />
</div>
