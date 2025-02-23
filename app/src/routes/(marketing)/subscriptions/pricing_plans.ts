export const defaultPlanId = "free"

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Always free to play daily",
    price: "$0",
    priceIntervalName: "/ month",
    stripe_price_id: null,
    features: ["New games every day", "Member discounts and newsletter"],
  },
  {
    id: "subscriber",
    name: "Subscriber",
    description: "Never miss a game",
    price: "$3",
    priceIntervalName: "/ month",
    stripe_price_id: "price_1NkdZCHMjzZ8mGZnRSjUm4yA",
    stripe_product_id: "prod_OXj1CcemGMWOlU",
    features: [
      "Access to the last week of games",
      "Full access to The Scoreboard",
    ],
  },
  {
    id: "enterprise",
    name: "Premium",
    description: "Every feature we have, always.",
    price: "$12",
    priceIntervalName: "/ month",
    stripe_price_id: "price_1Nkda2HMjzZ8mGZn4sKvbDAV",
    stripe_product_id: "prod_OXj20YNpHYOXi7",
    features: [
      "Everything in Subscriber",
      "Unlimited access to The Archives",
      "Early access to new games!",
    ],
  },
]
