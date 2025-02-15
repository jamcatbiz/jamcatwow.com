import { activeNumberIndex, activeOperation, currentUserStep, operations } from "$numbers/state.svelte"

export function reset() {
  if (activeOperation.val !== "") {
    operations[activeOperation.val].classes = ""
  }
  currentUserStep.firstNumber = ""
  currentUserStep.firstIndex = -1
  currentUserStep.operation = ""
  currentUserStep.secondNumber = ""
  currentUserStep.secondIndex = -1
  activeOperation.val = ""
  activeNumberIndex.val = -1
}