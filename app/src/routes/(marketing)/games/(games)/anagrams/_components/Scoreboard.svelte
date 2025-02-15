<script lang="ts">
  let {
    thisProgress,
    thisPoints,
  }: { thisProgress: number; thisPoints: number } = $props()
</script>

<div class="flex justify-center items-center text-center space-x-4 mt-4">
  <div class="p-3 min-w-14 border-4 border-primary rounded-md text-primary font-bold">
    {thisPoints}
  </div>
  <div
    class="radial-progress text-primary font-semibold"
    style="--value:{thisProgress};--size:3.75rem"
    role="progressbar"
  >
    {thisProgress}
  </div>
</div>