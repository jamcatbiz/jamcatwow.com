<script lang="ts">
  import type { PageLoadData } from "$numbers/local_types.ts"

  import {
    todaysDateIso,
    lastPlayedDate,
    todaysGame,
    yesterdaysGame,
    hasResumed,
    livePlayNumbers,
    isCandidate,
    hasGameOverShown,
    points,
    elapsedTime,
    answers,
  } from "$numbers/state.svelte"

  import StartScreen from "$numbers/_components/StartScreen.svelte"
  import GameScreen from "$numbers/_components/GameScreen.svelte"
  import ResumeScreen from "$numbers/_components/ResumeScreen.svelte"
  import PracticeNotice from "$lib/PracticeNotice.svelte"

  let { data }: { data: PageLoadData } = $props()

  Object.assign(todaysGame, data.todaysGame)
  Object.assign(yesterdaysGame, data.yesterdaysGame)

  for (let i = 0; i < livePlayNumbers.val.length; i++) {
    livePlayNumbers.val[i] = todaysGame.playNumbers[i]
  }

  // Creator play-ahead: save the Creator Score when the creator finishes a real
  // future candidate. Endpoint re-checks creator + write creds. See ADR 0009.
  let creatorScoreSaved = false
  $effect(() => {
    if (
      hasGameOverShown.val &&
      isCandidate &&
      !data.todaysIsFallback &&
      !creatorScoreSaved
    ) {
      creatorScoreSaved = true
      fetch(`/api/creator-score/numbers/${todaysDateIso}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          playedAt: new Date().toISOString(),
          points: points.val,
          durationMs: elapsedTime.val,
          detail: {
            goalsSolved: Object.values(answers).filter(
              (a) => a && (a as { solved?: boolean }).solved,
            ).length,
          },
        }),
      })
        .then((r) => console.log("[creator-score] numbers save:", r.status))
        .catch((e) => console.error("[creator-score] save failed", e))
    }
  })
</script>

{#if data.todaysIsFallback}
  <PracticeNotice gameName="Today's Numbers" />
{/if}

{#if lastPlayedDate.val != todaysDateIso}
  <StartScreen />
{:else if !hasResumed.val}
  <ResumeScreen />
{:else}
  <GameScreen />
{/if}
