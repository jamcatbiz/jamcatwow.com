<script lang="ts">
  import { reset } from "$numbers/_utils/reset.svelte"
  import {
    activeNumberIndex,
    activeOperation,
    currentUserStep,
    livePlayNumbers,
    operations,
    userSteps,
  } from "$numbers/state.svelte"

  let undo_math: { [key: string]: Function } = {
    add: function (x: number, y: number) {
      return x - y
    },
    subtract: function (x: number, y: number) {
      return x + y
    },
    multiply: function (x: number, y: number) {
      return x / y
    },
    divide: function (x: number, y: number) {
      return x * y
    },
  }

  const operationClass = "btn btn-accent w-16 h-16 touch-none"

  function handleOperationClick(str: string) {
    if (activeNumberIndex.val !== -1) {
      if (activeOperation.val === str) {
        operations[str].classes = ""
        activeOperation.val = ""
        currentUserStep.operation = ""
      } else {
        if (activeOperation.val !== "") {
          operations[activeOperation.val].classes = ""
        }
        operations[str].classes = "opacity-40"
        activeOperation.val = str
        currentUserStep.operation = operations[str].icon
      }
    }
  }

  function handleUndoClick() {
    if (currentUserStep.firstNumber === "" && userSteps.length > 0) {
      let temp = userSteps.pop()
      livePlayNumbers.val[temp.firstIndex] = parseInt(temp.firstNumber)
      livePlayNumbers.val[temp.secondIndex] = parseInt(temp.secondNumber)
    } else {
      reset()
    }
    undo_math
  }
</script>

<div id="flex w-100 content-center items-center">
  <button
    class={operationClass}
    id="undo"
    aria-label="undo"
    onclick={() => handleUndoClick()}
  >
    <div class="icon icon-undo flex">
      <svg width="30" viewBox="0 0 90 90" xml:space="preserve">
        <path
          d="M45 16.4V8.6c0-2.5-3-4-5.1-2.5L17.5 20.6c-1.7 1.2-1.7 3.8 0 5l22.4 14.5c2.1 1.5 5.1 0 5.1-2.5v-8.8c12.8 0 23.2 10.2 23.2 22.6S57.8 74.1 45 74.1 21.8 63.9 21.8 51.5c0-3.4-2.9-6.2-6.4-6.2S9 48 9 51.5c0 19.3 16.1 35 36 35s36-15.7 36-35c0-19.4-16.2-35.1-36-35.1z"
          id="Symbol"
        ></path>
      </svg>
    </div>
  </button>
  <button
    class="{operationClass} {operations.add.classes}"
    id="add"
    aria-label="add"
    onclick={() => handleOperationClick("add")}
  >
    <div class="icon icon-add flex">
      <svg width="30" viewBox="0 0 90 90">
        <path
          d="M71.9 36H54V18.1c0-5-4-9.1-9-9.1s-9 4.1-9 9.1V36H18.1c-5 0-9.1 4-9.1 9s4.1 9 9.1 9H36v17.9c0 5 4 9.1 9 9.1s9-4.1 9-9.1V54h17.9c5 0 9.1-4 9.1-9s-4.1-9-9.1-9z"
          id="Symbol"
        ></path>
      </svg>
    </div>
  </button>
  <button
    class="{operationClass} {operations.subtract.classes}"
    id="subtract"
    aria-label="subtract"
    onclick={() => handleOperationClick("subtract")}
  >
    <div class="icon icon-subtract">
      <svg width="30" viewBox="0 0 90 90">
        <path
          d="M71.9 36H18.1c-5 0-9.1 4-9.1 9s4.1 9 9.1 9h53.8c5 0 9.1-4 9.1-9s-4.1-9-9.1-9z"
          id="Symbol"
        ></path>
      </svg>
    </div>
  </button>
  <button
    class="{operationClass} {operations.multiply.classes}"
    id="multiply"
    aria-label="multiply"
    onclick={() => handleOperationClick("multiply")}
  >
    <div class="icon icon-multiply">
      <svg width="30" id="Layer_1" viewBox="0 0 90 90">
        <path
          d="m57.2 45 12.2-12.2c3.4-3.4 3.4-8.9.1-12.3s-8.9-3.4-12.3 0L45 32.8 32.8 20.6c-3.4-3.4-8.9-3.4-12.3 0s-3.4 8.9 0 12.3L32.8 45 20.6 57.2c-3.4 3.4-3.4 8.9 0 12.3s8.9 3.4 12.3-.1L45 57.2l12.2 12.2c3.4 3.4 8.9 3.4 12.3.1 3.4-3.4 3.4-8.9-.1-12.3L57.2 45z"
          id="Symbol"
        ></path>
      </svg>
    </div>
  </button>
  <button
    class="{operationClass} {operations.divide.classes}"
    id="divide"
    aria-label="divide"
    onclick={() => handleOperationClick("divide")}
  >
    <div class="icon icon-divide">
      <svg width="30" viewBox="0 0 90 90">
        <g id="Symbol">
          <path
            class="st0"
            d="M71.9 36H18.1c-5 0-9.1 4-9.1 9s4.1 9 9.1 9H72c5 0 9.1-4 9.1-9s-4.2-9-9.2-9z"
          ></path>
          <circle class="st0" cx="45" cy="18" r="9"></circle>
          <circle class="st0" cx="45" cy="72" r="9"></circle>
        </g>
      </svg>
    </div>
  </button>
</div>
