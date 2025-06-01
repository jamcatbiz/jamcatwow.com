<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"
  import GamePage from "./games/GamePage.svelte"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-12">
    <div class="max-w-xl">
      <div
        class="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mb-3 md:mb-7 pb-1"
      >
        Play. Share. Wow.
      </div>

      <div
        class="text-4xl md:text-6xl font-bold px-2"
        style="line-height: 1.2;"
      >
        New
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >daily games</span
        > built for sharing!
      </div>
      <div class="mt-6 md:mt-2">
        <a href="/games/anagrams">
          <button
            class="btn btn-wide bg-linear-to-r from-primary to-accent text-primary-content shadow-md shadow-primary border-none px-6"
          >
            Play Now
          </button>
        </a>
        <a href="/subscriptions">
          <button class="btn btn-wide shadow-md shadow-primary px-6 mt-3 min-[25rem]:mt-0 mx-2"
            >Subscribe</button
          >
        </a>
      </div>
    </div>
  </div>
</div>
<GamePage />
