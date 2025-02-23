<script lang="ts">
  import PricingHelp from "../../../(marketing)/subscriptions/PricingHelp.svelte"
  import PricingModule from "../../../(marketing)/subscriptions/PricingModule.svelte"
</script>

<svelte:head>
  <title>Select a Plan</title>
</svelte:head>

<div class="min-h-[70vh] pb-8 pt-[5vh] px-4">
  <h1 class="text-3xl font-bold text-center">Treat Yo' Self</h1>
  <h2 class="text-xl text-center opacity-50 mt-1 pb-3">
    And support your favorite games too!
  </h2>
  <div class="flex flex-col w-full px-6">
    <div>
      <h1 class="text-2xl font-bold mb-2">Select a Plan</h1>
      <PricingModule
        callToAction="Get Started"
        highlightedPlanId="subscriber"
      />
      <PricingHelp />
    </div>
  </div>
</div>
