<script lang="ts">
  import { currentUserStep, userSteps } from "$numbers/state.svelte"
</script>

<div class="card font-mono mt-6 text-left pl-6 pt-2">
  <div class="">
    {#each userSteps as step}
      <p>
        {step.firstNumber}
        {step.operation}
        {step.secondNumber} = {step.solution}
      </p>
    {/each}
  </div>
  <div class="">
    <p>
      {currentUserStep.firstNumber}
      {currentUserStep.operation}
      {currentUserStep.secondNumber}
    </p>
  </div>
</div>
