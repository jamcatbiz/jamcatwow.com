<script lang="ts">
  import { todaysGame } from "$hashbang/state.svelte"

  // @ts-ignore
  import IconShare from "~icons/fa6-regular/share-from-square"

  // @ts-ignore
  import { Toastify, type ToastifyConfigurationObject } from "toastify-js"

  const shareMessage: string = `Hashbang #${todaysGame.gameNumber}
f

jamcatwow.com/games/hashbang`

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
      Toastify(clipboardToast).showToast()
    } catch (err) {
      alert(err)
    }
  }
</script>

<button
  class="btn btn-wide bg-gradient-to-r border-none from-primary to-accent shadow-primary shadow-md text-primary-content"
  onclick={handleShare}
>
  <span><IconShare /></span><span>Share</span>
</button>
