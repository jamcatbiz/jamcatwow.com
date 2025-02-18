<script lang="ts">
  import PricingModule from "./PricingModule.svelte"
  import { WebsiteName } from "../../../config"
  import PricingHelp from "./PricingHelp.svelte"
</script>

<svelte:head>
  <title>Pricing</title>
  <meta name="description" content="Pricing - {WebsiteName}" />
</svelte:head>

<div class="min-h-[70vh] pb-8 pt-[5vh] px-4">
  <h1 class="text-3xl font-bold text-center">Treat Yo' Self</h1>
  <h2 class="text-xl text-center opacity-50 mt-1 pb-3">
    And support your favorite games too!
  </h2>

  <div class="w-full my-8">
    <PricingModule callToAction="Get Started" highlightedPlanId="subscriber" />
    <PricingHelp />
  </div>
</div>
