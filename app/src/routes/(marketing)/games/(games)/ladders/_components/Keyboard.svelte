<script lang="ts">
  import Key from "$ladders/_components/Key.svelte"

  import {
    guessInput,
    topGuesses,
    bottomGuesses,
    hasWon,
    goalDistance,
    todaysGame,
    guessesAdded,
    hintsUsed,
  } from "$ladders/state.svelte"

  // Define the keyboard's keys row by row
  const row1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const row2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const row3: string[] = ["ENT", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
  const keyMap: { [key: string]: string } = {
    Backspace: "DEL",
    Delete: "DEL",
    " ": "Enter",
  }

  function hammingDistance(str1: string, str2: string) {
    if (str1.length !== str2.length) {
      return -1
    }
    let distance = 0
    for (let i = 0; i < str1.length; i += 1) {
      if (str1[i] !== str2[i]) {
        distance += 1
      }
    }
    return distance
  }

  function handleUndo(whichGuesses: string | undefined) {
    if (whichGuesses === "top") {
      topGuesses.val.pop()
    } else if (whichGuesses === "bottom") {
      bottomGuesses.val.pop()
    }
  }

  const handleDel = () => {
    if (guessInput.val.length > 0) {
      guessInput.val = guessInput.val.substring(0, guessInput.val.length - 1)
    } else if (guessesAdded.val.length > hintsUsed.val) {
      handleUndo(guessesAdded.val.pop())
    }
  }

  const handleEnter = () => {
    console.log("Enter")
    let topTarget = (
      topGuesses.val.length
        ? topGuesses.val[topGuesses.val.length - 1]
        : todaysGame.topWord
    ).toUpperCase()
    let bottomTarget = (
      bottomGuesses.val.length ? bottomGuesses.val[0] : todaysGame.bottomWord
    ).toUpperCase()
    let matchesTop = hammingDistance(guessInput.val, topTarget) === goalDistance
    let matchesBottom =
      hammingDistance(guessInput.val, bottomTarget) === goalDistance
    if (matchesTop && matchesBottom) {
      hasWon.val = true
    }
    if (matchesTop) {
      topGuesses.val = [...topGuesses.val, guessInput.val]
      guessesAdded.val = [...guessesAdded.val, "top"]
    } else if (matchesBottom) {
      bottomGuesses.val = [guessInput.val, ...bottomGuesses.val]
      guessesAdded.val = [...guessesAdded.val, "bottom"]
    } else {
      // no matches
      const element = document.getElementById("input")
      if (
        element &&
        !element.classList.replace("doesShake1", "doesShake2") &&
        !element.classList.replace("doesShake2", "doesShake1")
      ) {
        element.classList.add("doesShake1")
      }
    }
    guessInput.val = ""
  }

  const keyPress: (key?: string) => void = (key = "") => {
    if (key == "DEL") {
      return handleDel()
    }
    if (key == "ENTER" || key == "ENT") {
      return handleEnter()
    }
    if (guessInput.val.length === todaysGame.topWord.length || key.length > 1) {
      return
    }
    guessInput.val = guessInput.val + key
  }

  function handleKeydown(event: KeyboardEvent): void {
    var thisKey = event.key in keyMap ? keyMap[event.key] : event.key
    keyPress(thisKey.toUpperCase())
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="keyboard">
  <div class="row">
    {#each row1 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>

  <div class="row">
    {#each row2 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>

  <div class="row">
    {#each row3 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>
</div>

<style>
  .keyboard {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
