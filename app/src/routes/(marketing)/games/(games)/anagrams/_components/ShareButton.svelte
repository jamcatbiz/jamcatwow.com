<script lang="ts">
  import {
    points,
    progress,
    timedPoints,
    timedProgress,
    todaysGame,
    todaysDateIso,
  } from "$anagrams/state.svelte"
  import { track } from "$lib/analytics"
  import { resultPermalink } from "$lib/result_share"

  // @ts-ignore
  import IconShare from "~icons/fa6-regular/share-from-square"
  // @ts-ignore
  import { Toastify, type ToastifyConfigurationObject } from "toastify-js"

  // Shareable Result permalink (ADR 0003) — spoiler-free performance only.
  const permalink = $derived(
    resultPermalink(
      typeof location !== "undefined" ? location.origin : "https://jamcatwow.com",
      "anagrams",
      todaysDateIso,
      {
        v: 1,
        n: todaysGame.gameNumber,
        p: points.val,
        tp: timedPoints.val,
        pr: progress.val,
        tpr: timedProgress.val,
      },
    ),
  )

  // Text+emoji fallback for surfaces that don't unfurl the link.
  const shareMessage = $derived(`Anagrams #${todaysGame.gameNumber}

⬜️ ${timedPoints.val} timed, ${points.val} total
⚪️ ${timedProgress.val}% timed, ${progress.val}% total

${permalink}`)

  const clipboardToast: ToastifyConfigurationObject = {
    text: "Copied score to clipboard",
    duration: 2000,
    gravity: "top",
    position: "center",
    style: {},
  }

  const shareToast: ToastifyConfigurationObject = {
    text: "Thank you for sharing!",
    duration: 2000,
    gravity: "top",
    position: "center",
    style: {},
  }

  const handleShare: () => Promise<void> = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareMessage,
        })
        track("result_shared", { game: "anagrams", method: "native" })
        Toastify(shareToast).showToast()
      } catch (err) {
        handleClipboard()
      }
    } else {
      handleClipboard()
    }
  }

  async function handleClipboard(): Promise<void> {
    try {
      navigator.clipboard.writeText(shareMessage)
      track("result_shared", { game: "anagrams", method: "clipboard" })
      Toastify(clipboardToast).showToast()
    } catch (err) {
      alert(err)
    }
  }
</script>

<button
  class="btn btn-wide bg-linear-to-r from-primary to-accent shadow-primary shadow-lg border-none text-primary-content"
  onclick={handleShare}
>
  Share
</button>
