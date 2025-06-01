<script lang="ts">
  export let char: string
  export let keyPress: (key?: string) => void

  const keyClass: string =
    char == "ENT" || char == "DEL" ? "key special" : "key"
</script>

<button
  class="btn btn-neutral h-14 rounded-xs m-1 touch-manipulation {keyClass}"
  on:click={() => keyPress(char.toUpperCase())}
>
  {char.toUpperCase()}
</button>

<style>
  .key {
    cursor: pointer;
    margin: 0.3%;
    padding: 4% 0%;
    border-radius: 4px;
    transition: background-color 0.3s;
    font-weight: bold;
    touch-action: manipulation;
    width: 2.2rem;
  }

  .key:hover {
    background-color: rgba(var(--color-primary-300) / 1);
  }

  .special {
    padding: 4% 0%;
    width: 3.5rem;
  }

  @media (hover: none) {
    .key:hover {
      background-color: rgba(var(--color-surface) / 1);
    }
    .selected:hover {
      background-color: rgba(var(--color-primary-500) / 0.2);
    }
  }
</style>
