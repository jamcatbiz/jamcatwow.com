<script lang="ts">
  let { children } = $props()

  import Header from "$numbers/_components/Header.svelte"
</script>

<Header />

{@render children()}
