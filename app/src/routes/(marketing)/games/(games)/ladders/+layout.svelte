<script lang="ts">
  let { children } = $props()

  import Header from "$ladders/_components/Header.svelte"
</script>

<Header />

{@render children()}
