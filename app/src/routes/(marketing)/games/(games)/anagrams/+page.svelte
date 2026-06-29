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
    isCandidate,
    hasGameOverShown,
    points,
    timedPoints,
    progress,
    elapsedTime,
    guesses,
  } from "$anagrams/state.svelte"

  import StartScreen from "$anagrams/_components/StartScreen.svelte"
  import GameScreen from "$anagrams/_components/GameScreen.svelte"
  import ResumeScreen from "$anagrams/_components/ResumeScreen.svelte"
  import Header from "$anagrams/_components/Header.svelte"
  import PracticeNotice from "$lib/PracticeNotice.svelte"

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

  // Creator play-ahead: when the creator finishes a real future candidate
  // (the gate only serves it to them), save their Creator Score. The endpoint
  // re-checks creator + write creds, so this is safe to attempt. See ADR 0009.
  let creatorScoreSaved = false
  $effect(() => {
    if (
      hasGameOverShown.val &&
      isCandidate &&
      !data.todaysIsFallback &&
      !creatorScoreSaved
    ) {
      creatorScoreSaved = true
      fetch(`/api/creator-score/anagrams/${todaysDateIso}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          playedAt: new Date().toISOString(),
          points: points.val,
          durationMs: elapsedTime.val,
          detail: {
            wordsFound: Object.keys(guesses.val).length,
            timedPoints: timedPoints.val,
            progress: progress.val,
          },
        }),
      })
        .then((r) => console.log("[creator-score] anagrams save:", r.status))
        .catch((e) => console.error("[creator-score] save failed", e))
    }
  })
</script>

{#if data.todaysIsFallback}
  <PracticeNotice gameName="Today's Anagrams" />
{/if}

{#if lastPlayedDate.val != todaysDateIso}
  <StartScreen />
{:else if !hasResumed.val}
  <ResumeScreen />
{:else}
  <GameScreen />
{/if}
