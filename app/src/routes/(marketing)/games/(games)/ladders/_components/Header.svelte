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
  let base_path: string = "/games/ladders"
  console.log(base_path)
  let baseClass: string = $derived(($page.url.pathname === base_path) ? isActiveClass : "")
  let howToClass: string = $derived(($page.url.pathname === `${base_path}/how_to`) ? isActiveClass : "")
  let statisticsClass: string = $derived(($page.url.pathname === `${base_path}/statistics`) ? isActiveClass : "")
  let extrasClass: string = $derived(($page.url.pathname === `${base_path}/extras`) ? isActiveClass : "")

</script>

<div class="flex justify-between items-center m-1">
  <div class="flex items-center">
    <div class="">
      <a href="/">
        <button 
          class="btn btn-ghost rounded-b-none"
          aria-label="home"
        >
          <IconJam class="text-xs text-primary" />
          <IconCat class="text-xs text-accent" />
        </button>
      </a>
    </div>
    <div class="flex {baseClass}">
      <a href="/games/ladders">
        <button 
          class="btn btn-ghost rounded-b-none text-lg font-semibold font-serif"
          aria-label="ladders"
        >
          Ladders
        </button>
      </a>
    </div>
  </div>

  <div class="flex">
    <div class="flex {howToClass}">
      <a href="/games/ladders/how_to">
        <button 
          class="btn btn-ghost btn-square text-lg rounded-b-none"
          aria-label="ladders_how_to"
        >
          <IconHowTo />
        </button>
      </a>
    </div>

    <div class="flex {statisticsClass}">
      <a href="/games/ladders/statistics">
        <button 
          class="btn btn-ghost btn-square text-lg rounded-b-none"
          aria-label="ladders_statistics"
        >
          <IconStatistics />
        </button>
      </a>
    </div>

    <div class="flex {extrasClass}">
      <a href="/games/ladders/extras" aria-label="ladders_extras">
        <button
          class="btn btn-ghost btn-square text-lg rounded-b-none"
          aria-label="ladders_extras"
        >
          <IconExtras />
        </button>
      </a>
    </div>
  </div>
</div>
