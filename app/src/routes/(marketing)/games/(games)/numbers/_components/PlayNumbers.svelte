<script lang="ts">
  import { reset } from "$numbers/_utils/reset.svelte"
  import {
    activeNumberIndex,
    activeOperation,
    answers,
    currentUserStep,
    livePlayNumbers,
    points,
    todaysGame,
    userSteps,
  } from "$numbers/state.svelte"

  let do_math: { [key: string]: Function } = {
    add: function (x: number, y: number) {
      return x + y
    },
    subtract: function (x: number, y: number) {
      if (x < y) {
        reset()
        return -1
      } else return x - y
    },
    multiply: function (x: number, y: number) {
      return x * y
    },
    divide: function (x: number, y: number) {
      if (x < y || x % y !== 0) {
        reset()
        return -1
      } else return x / y
    },
  }

  function getSolutionUserSteps(solution: number): Array<string> {
    let rv: Array<string> = []
    let searchNumbers: { [key: number]: number } = {}
    searchNumbers[solution] = 0
    for (let i = userSteps.length - 1; i >= 0; i -= 1) {
      if (userSteps[i].solution in searchNumbers) {
        delete searchNumbers[userSteps[i].solution]
        rv.push(JSON.parse(JSON.stringify(userSteps[i])))
        searchNumbers[userSteps[i].firstNumber] = 0
        searchNumbers[userSteps[i].secondNumber] = 0
      }
    }
    return rv.reverse()
  }

  function checkSolution(solution: number) {
    const str = solution.toString()
    if (todaysGame.goalNumbers.includes(solution)) {
      const solutionSteps = getSolutionUserSteps(solution)
      const minSolved =
        solutionSteps.length == todaysGame.solutions[str].min_operations.length
          ? true
          : false
      if (solution in answers) {
        const dist = answers[solution].steps.length - solutionSteps.length
        if (dist > 0) {
          points.val += 15 * dist
          answers[solution].bonusPoints += 15 * dist
          answers[solution].steps = solutionSteps
        }
      } else {
        answers[str] = {
          number: solution,
          solved: true,
          steps: solutionSteps,
          bonusPoints: minSolved
            ? 45
            : 45 -
              15 *
                (solutionSteps.length -
                  todaysGame.solutions[solution].min_operations.length),
        }
        points.val += 100 + answers[str].bonusPoints
      }
    }
  }

  function handleNumberClick(i: number) {
    if (activeOperation.val === "") {
      activeNumberIndex.val = i
      currentUserStep.firstNumber = `${livePlayNumbers.val[activeNumberIndex.val]}`
      currentUserStep.firstIndex = activeNumberIndex.val
    } else if (activeNumberIndex.val !== i) {
      let temp = do_math[activeOperation.val](
        livePlayNumbers.val[activeNumberIndex.val],
        livePlayNumbers.val[i],
      )
      if (temp !== -1) {
        currentUserStep.secondNumber = `${livePlayNumbers.val[i]}`
        currentUserStep.secondIndex = i
        currentUserStep.solution = `${temp}`
        userSteps.push(JSON.parse(JSON.stringify(currentUserStep)))
        livePlayNumbers.val[i] = temp
        livePlayNumbers.val[activeNumberIndex.val] = -1
        checkSolution(temp)
        reset()
      }
    }
  }
</script>

<div class="flex flex-col mt-4 mb-8">
  <div class="flex">
    {#each livePlayNumbers.val as number, i}
      {#if i * 2 < livePlayNumbers.val.length}
        {#if number === -1}
          <div class="">
            <button
              aria-label="placeholder"
              disabled
              class="m-0.5 w-16 h-16"
              id="number-{i}"
            ></button>
          </div>
        {:else if i === activeNumberIndex.val}
          <div class="">
            <button
              class="btn btn-neutral btn-disabled m-0.5 w-16 h-16 text-lg"
              id="number-{i}"
              onclick={() => handleNumberClick(i)}
            >
              {number}
            </button>
          </div>
        {:else}
          <div class="">
            <button
              class="btn btn-neutral m-0.5 w-16 h-16 text-lg"
              id="number-{i}"
              onclick={() => handleNumberClick(i)}
            >
              {number}
            </button>
          </div>
        {/if}
      {/if}
    {/each}
  </div>
  <div class="flex">
    {#each livePlayNumbers.val as number, i}
      {#if i * 2 >= livePlayNumbers.val.length}
        {#if number === -1}
          <div class="">
            <button
              aria-label="placeholder"
              disabled
              class="m-0.5 w-16 h-16"
              id="number-{i}"
            ></button>
          </div>
        {:else if i === activeNumberIndex.val}
          <div class="">
            <button
              class="btn btn-neutral btn-disabled m-0.5 w-16 h-16 text-lg"
              id="number-{i}"
              onclick={() => handleNumberClick(i)}
            >
              {number}
            </button>
          </div>
        {:else}
          <div class="">
            <button
              class="btn btn-neutral m-0.5 w-16 h-16 text-lg"
              id="number-{i}"
              onclick={() => handleNumberClick(i)}
            >
              {number}
            </button>
          </div>
        {/if}
      {/if}
    {/each}
  </div>
</div>

<style>
</style>
