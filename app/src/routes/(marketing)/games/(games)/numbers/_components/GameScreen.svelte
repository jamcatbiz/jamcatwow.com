<script lang="ts">
  import Timer from "$numbers/_components/Timer.svelte"
  import ExpressionList from "$numbers/_components/ExpressionList.svelte"
  import GoalNumbers from "$numbers/_components/GoalNumbers.svelte"
  import PlayNumbers from "$numbers/_components/PlayNumbers.svelte"
  import Operations from "$numbers/_components/Operations.svelte"
</script>

<div class="flex flex-col mt-8 text-center justify-center items-center">
  <Timer />
  <GoalNumbers />
  <PlayNumbers />
  <Operations />
  <ExpressionList />
</div>
