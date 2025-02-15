<script lang="ts">
  let { word }: { word: string } = $props()
</script>

<div class="flex justify-center my-2 text-3xl font-bold tracking-widest">
  {word.toUpperCase()}
</div>
