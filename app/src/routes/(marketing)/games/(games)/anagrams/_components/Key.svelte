<script lang="ts">
  export let key: string
  export let isSelected: boolean
  export let keyPress: (key?: string) => void

  const keyClass: string =
    key == "ENTER" || key == "DEL" ? "px-10 mt-1" : "w-10"
</script>

<button
  class="btn btn-neutral h-14 rounded-xs mx-0.5 touch-manipulation {keyClass}"
  class:btn-disabled={isSelected}
  on:click={() => keyPress(key.toUpperCase())}
>
  {key.toUpperCase()}
</button>
