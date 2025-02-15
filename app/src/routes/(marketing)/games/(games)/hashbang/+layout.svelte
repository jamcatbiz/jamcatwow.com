<script lang="ts">
  let { children } = $props()

  import Header from "$hashbang/_components/Header.svelte"
</script>

<Header />

{@render children()}
