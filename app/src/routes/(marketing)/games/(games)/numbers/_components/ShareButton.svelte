<script lang="ts">
  import { points, todaysGame, todaysDateIso } from "$numbers/state.svelte"
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
      "numbers",
      todaysDateIso,
      { v: 1, n: todaysGame.gameNumber, p: points.val },
    ),
  )

  // Stars derive from points (each goal reached = 1 star = 100 pts, max 3).
  const stars = $derived(Math.max(0, Math.min(3, Math.floor(points.val / 100))))

  // Text+emoji fallback for surfaces that don't unfurl the link.
  const shareMessage = $derived(`JamCatWow Numbers #${todaysGame.gameNumber}
${"★".repeat(stars)}${"☆".repeat(3 - stars)}
${points.val} points
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
        track("result_shared", { game: "numbers", method: "native" })
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
      track("result_shared", { game: "numbers", method: "clipboard" })
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
