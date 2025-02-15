<script lang="ts">
  let { children } = $props()

  import Header from "$anagrams/_components/Header.svelte"
</script>

<Header />

{@render children()}
