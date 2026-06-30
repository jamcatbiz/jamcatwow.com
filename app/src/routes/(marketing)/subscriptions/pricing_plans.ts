export const defaultPlanId = "free"

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Always free to play daily",
    price: "$0",
    priceIntervalName: "/ month",
    stripe_price_id: null,
    stripe_product_id: null,
    features: ["New games every day", "Member discounts and newsletter"],
  },
  // Subscription tiers removed (template residue selling non-existent products).
  // The real paid product is a one-time Supporter Unlock — see ADR 0006.
]
