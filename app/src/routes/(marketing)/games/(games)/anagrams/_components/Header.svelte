<script lang="ts">
  // @ts-ignore
  import IconHowTo from "~icons/fa6-solid/lightbulb"
  // @ts-ignore
  import IconStatistics from "~icons/fa6-solid/chart-pie"
  // @ts-ignore
  import IconExtras from "~icons/fa6-solid/bars"
  // @ts-ignore
  import IconJam from "~icons/fa6-solid/jar"
  // @ts-ignore
  import IconCat from "~icons/fa6-solid/cat"

  import { page } from "$app/stores"

  let isActiveClass: string = "border-b-4"
  let base_path: string = "/games/anagrams"
  console.log(base_path)
  let baseClass: string = $derived(
    $page.url.pathname === base_path ? isActiveClass : "",
  )
  let howToClass: string = $derived(
    $page.url.pathname === `${base_path}/how_to` ? isActiveClass : "",
  )
  let statisticsClass: string = $derived(
    $page.url.pathname === `${base_path}/statistics` ? isActiveClass : "",
  )
  let extrasClass: string = $derived(
    $page.url.pathname === `${base_path}/extras` ? isActiveClass : "",
  )
</script>

<div class="flex justify-between items-center m-1">
  <div class="flex items-center">
    <div class="">
      <a href="/">
        <button class="btn btn-ghost rounded-b-none" aria-label="home">
          <IconJam class="text-xs text-primary" />
          <IconCat class="text-xs text-accent" />
        </button>
      </a>
    </div>
    <div class="flex {baseClass}">
      <a href="/games/anagrams">
        <button
          class="btn btn-ghost rounded-b-none text-lg font-semibold font-serif"
          aria-label="anagrams"
        >
          Anagrams
        </button>
      </a>
    </div>
  </div>

  <div class="flex">
    <div class="flex {howToClass}">
      <a href="/games/anagrams/how_to">
        <button
          class="btn btn-ghost btn-square text-lg rounded-b-none"
          aria-label="anagrams_how_to"
        >
          <IconHowTo />
        </button>
      </a>
    </div>

    <div class="flex {statisticsClass}">
      <a href="/games/anagrams/statistics">
        <button
          class="btn btn-ghost btn-square text-lg rounded-b-none"
          aria-label="anagrams_statistics"
        >
          <IconStatistics />
        </button>
      </a>
    </div>

    <div class="flex {extrasClass}">
      <a href="/games/anagrams/extras" aria-label="anagrams_extras">
        <button
          class="btn btn-ghost btn-square text-lg rounded-b-none"
          aria-label="anagrams_extras"
        >
          <IconExtras />
        </button>
      </a>
    </div>
  </div>
</div>
