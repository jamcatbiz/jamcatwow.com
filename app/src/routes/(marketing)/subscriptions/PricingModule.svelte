<script lang="ts">
  import { pricingPlans } from "./pricing_plans"

  interface Props {
    // Module context
    highlightedPlanId?: string
    callToAction: string
    currentPlanId?: string
    center?: boolean
  }

  let {
    highlightedPlanId = "",
    callToAction,
    currentPlanId = "",
    center = true,
  }: Props = $props()
</script>

<div
  class="flex flex-col lg:flex-row gap-10 {center
    ? 'place-content-center'
    : ''} flex-wrap"
>
  {#each pricingPlans as plan}
    <div
      class="flex-none card card-bordered {plan.id === highlightedPlanId
        ? 'border-error shadow-error'
        : 'border-slate-300'} shadow-lg flex-1 grow min-w-[260px] max-w-[310px] p-6"
    >
      <div class="flex flex-col h-full">
        <div class="text-xl font-bold">{plan.name}</div>
        <p class="mt-2 text-sm font-medium opacity-80 leading-relaxed">
          {plan.description}
        </p>
        <div class="mt-auto pt-4 text-sm font-light opacity-80">
          Plan Includes:
          <ul class="list-disc list-inside mt-2 space-y-1">
            {#each plan.features as feature}
              <li class="">{feature}</li>
            {/each}
            <ul></ul>
          </ul>
        </div>
        <div class="pt-8">
          <span class="text-4xl font-bold">{plan.price}</span>
          <span class="opacity-40">{plan.priceIntervalName}</span>
          <div class="mt-6 pt-4 flex-1 flex flex-row items-center">
            {#if plan.id === currentPlanId}
              <div
                class="btn btn-outline btn-success no-animation w-[80%] mx-auto cursor-default"
              >
                Current Plan
              </div>
            {:else}
              <a
                href={"/account/subscribe/" +
                  (plan?.stripe_price_id ?? "free_plan")}
                class="btn btn-error w-[80%] mx-auto"
              >
                {callToAction}
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
