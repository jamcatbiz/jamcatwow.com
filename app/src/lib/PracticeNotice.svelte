<script lang="ts">
  // Shown when a Daily couldn't be fetched and we're serving the bundled
  // fallback puzzle instead. See docs/adr/0009.
  let { gameName = "Today's puzzle" }: { gameName?: string } = $props()
</script>

<div role="alert" class="alert alert-info mx-auto my-3 max-w-md text-sm">
  <span>
    😺 {gameName} is taking a breather — here's a <strong>Practice</strong> round
    on the house. Check back soon for today's Daily.
  </span>
</div>
