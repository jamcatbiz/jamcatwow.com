<script lang="ts">
  import {
    todaysGame,
    guesses,
    currentGuess,
    statWordsFound,
    points,
    timedPoints,
    progress,
    timedProgress,
    guessesSort,
    timerDuration,
    elapsedTime,
    keyData,
  } from "$anagrams/state.svelte"

  import Key from "$anagrams/_components/Key.svelte"
  // @ts-ignore
  import { Toastify, type ToastifyConfigurationObject } from "toastify-js"

  // Define toast objects to alert on invalid user inputs
  const guessTooShortToast: ToastifyConfigurationObject = {
    text: "Guess must be 4+ letters.",
    duration: 2000,
    className: "alert alert-warning absolute max-w-80 m-auto left-0 right-0",
  }

  const guessWordOfDayToast: ToastifyConfigurationObject = {
    text: "How clever... try again!",
    duration: 2000,
    className: "alert alert-warning absolute max-w-80 m-auto left-0 right-0",
  }

  const guessDuplicateToast: ToastifyConfigurationObject = {
    text: "You've already guessed that.",
    duration: 2000,
    className: "alert alert-warning absolute max-w-80 m-auto left-0 right-0",
  }

  const guessIncorrectToast: ToastifyConfigurationObject = {
    text: "Not an answer today.",
    duration: 2000,
    className: "alert alert-warning absolute max-w-80 m-auto left-0 right-0",
  }

  // Define the keyboard's keys row by row
  const row1: string[] = todaysGame.word.toUpperCase().split("")
  const row2: string[] = ["DEL", "ENTER"]
  const keyMap: { [key: string]: string } = {
    Backspace: "DEL",
    Delete: "DEL",
    " ": "Enter",
  }

  const handleDel = () => {
    var lastChar: string = currentGuess[currentGuess.length - 1]

    currentGuess.pop()

    if (!(lastChar === undefined)) {
      keyData[lastChar].guessCount -= 1
      keyData[lastChar].isAvailable = Boolean(
        keyData[lastChar].count - keyData[lastChar].guessCount,
      )
    }
  }

  const handleEnter = () => {
    if (currentGuess.length === 0) return

    const thisGuess: string = currentGuess
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")

    if (thisGuess == todaysGame.word) {
      Toastify(guessWordOfDayToast).showToast()
    } else if (thisGuess.length < 4) {
      Toastify(guessTooShortToast).showToast()
    } else if (thisGuess in guesses.val) {
      Toastify(guessDuplicateToast).showToast()
    } else if (!(thisGuess in todaysGame.answers)) {
      Toastify(guessIncorrectToast).showToast()
    } else {
      guesses.val[thisGuess] = thisGuess in todaysGame.answers
      guessesSort[currentGuess[0]][thisGuess] = thisGuess in todaysGame.answers
      statWordsFound.val = statWordsFound.val * 1 + 1
      points.val = points.val + todaysGame.answers[thisGuess].points * 10
      progress.val = Number(
        (
          (Object.keys(guesses.val).length /
            Object.keys(todaysGame.answers).length) *
          100
        ).toFixed(1),
      )

      if (elapsedTime.val < timerDuration) {
        timedPoints.val =
          timedPoints.val + todaysGame.answers[thisGuess].points * 10
        timedProgress.val = Number(
          (
            (Object.keys(guesses.val).length /
              Object.keys(todaysGame.answers).length) *
            100
          ).toFixed(1),
        )
      }
    }

    for (var key in keyData) {
      keyData[key].guessCount = 0
      keyData[key].isAvailable = true
    }

    currentGuess.length = 0
  }

  const keyPress: (key?: string) => void = (key = "") => {
    if (key == "DEL") return handleDel()
    if (key == "ENTER") return handleEnter()

    if (!(key in keyData) || keyData[key].guessCount >= keyData[key].count)
      return

    keyData[key].guessCount += 1
    keyData[key].isAvailable = Boolean(
      keyData[key].count - keyData[key].guessCount,
    )
    currentGuess.push(key)
  }

  function handleKeydown(event: KeyboardEvent): void {
    var thisKey = event.key in keyMap ? keyMap[event.key] : event.key
    keyPress(thisKey.toUpperCase())
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex flex-col">
  <div class="flex items-center justify-center">
    {#each row1 as key}
      <Key {key} isSelected={!keyData[key].isAvailable} {keyPress} />
    {/each}
  </div>

  <div class="flex items-center justify-center">
    {#each row2 as key}
      <Key {key} isSelected={false} {keyPress} />
    {/each}
  </div>
</div>
