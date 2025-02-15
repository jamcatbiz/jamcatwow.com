<script lang="ts">
  import type {
    PageLoadData,
    GuessesSort,
    KeyData,
  } from "$anagrams/local_types.ts"

  import {
    todaysDateIso,
    lastPlayedDate,
    todaysGame,
    yesterdaysGame,
    guessesSort,
    keyData,
    hasResumed,
  } from "$anagrams/state.svelte"

  import StartScreen from "$anagrams/_components/StartScreen.svelte"
  import GameScreen from "$anagrams/_components/GameScreen.svelte"
  import ResumeScreen from "$anagrams/_components/ResumeScreen.svelte"
  import Header from "$anagrams/_components/Header.svelte"

  // @ts-ignore
  import IconShare from "~icons/fa6-solid/share-from-square"
  // @ts-ignore
  import IconSettings from "~icons/fa6-solid/gear"
  // @ts-ignore
  import IconHowTo from "~icons/fa6-solid/question"

  let { data }: { data: PageLoadData } = $props()

  function initGuessesSort(guessesSort: GuessesSort, word: string): void {
    const uniqueChars: string[] = [
      ...new Set(word.toUpperCase().split("")),
    ].sort()
    for (var i in uniqueChars) {
      guessesSort[uniqueChars[i]] = {}
    }
  }

  function initKeyData(keyData: KeyData, word: string): void {
    for (var letter of word.toUpperCase()) {
      if (letter in keyData) {
        keyData[letter].count += 1
      } else {
        keyData[letter] = { count: 1, guessCount: 0, isAvailable: true }
      }
    }
  }

  initGuessesSort(guessesSort, data.todaysGame.word)
  initKeyData(keyData, data.todaysGame.word)
  Object.assign(todaysGame, data.todaysGame)
  Object.assign(yesterdaysGame, data.yesterdaysGame)
</script>

{#if lastPlayedDate.val != todaysDateIso}
  <StartScreen />
{:else if !hasResumed.val}
  <ResumeScreen />
{:else}
  <GameScreen />
{/if}
