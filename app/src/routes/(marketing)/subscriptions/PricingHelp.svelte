<script lang="ts">
  type PlanFeatureRow = {
    name: string
    freeIncluded?: boolean
    subscriberIncluded?: boolean
    premierIncluded?: boolean
    freeString?: string
    subscriberString?: string
    premierString?: string
    header?: boolean
  }

  const planFeatures: PlanFeatureRow[] = [
    {
      name: "Games",
      header: true,
    },
    {
      name: "Daily Games",
      freeIncluded: true,
      subscriberIncluded: true,
      premierIncluded: true,
    },
    {
      name: "Play this week's games",
      freeIncluded: false,
      subscriberIncluded: true,
      premierIncluded: true,
    },
    {
      name: "Unlimited archive access",
      freeIncluded: false,
      subscriberIncluded: false,
      premierIncluded: true,
    },
    {
      name: "Play unreleased games early",
      freeIncluded: false,
      subscriberIncluded: false,
      premierIncluded: true,
    },
    {
      name: "Data",
      header: true,
    },
    {
      name: "Game Stat Dashboards",
      freeIncluded: false,
      subscriberIncluded: true,
      premierIncluded: true,
    },
    {
      name: "Friend Leaderboards",
      freeIncluded: false,
      subscriberIncluded: true,
      premierIncluded: true,
    },
  ]
</script>

<h1 class="text-2xl font-bold text-center mt-24">Pricing FAQ</h1>
<div class="flex place-content-center">
  <div class="join join-vertical max-w-xl py-6 mx-auto">
    <div class="collapse collapse-arrow join-item border border-error">
      <input type="radio" name="faq-accordion" />
      <div class="collapse-title text-lg font-medium">
        Are these games free?
      </div>
      <div class="collapse-content">
        <p>
          Yup! The games published on this website are free to play daily.
          However, we offer some fun features like game archives and data
          visualization to our subscribers and premium supporters. You can read
          more about those features below.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-error">
      <input type="radio" name="faq-accordion" />
      <div class="collapse-title text-lg font-medium">
        Why do we need money?
      </div>
      <div class="collapse-content">
        <p>
          We aim to become profitable and support literacy, math competency, and
          early education through daily socialized fun! See <a
            class="font-bold underline text-error"
            href="/mission">our mission</a
          >!
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-error">
      <input type="radio" name="faq-accordion" />
      <div class="collapse-title text-lg font-medium">
        How do we make money?
      </div>
      <div class="collapse-content">
        <p>
          We make money via ads,
          <a href="/shop" class="font-bold underline text-error">merch</a>,
          <a href="/subscriptions" class="font-bold underline text-error"
            >subscriptions</a
          >, and
          <a
            href="https://www.buymeacoffee.com/jamcatbiz"
            class="font-bold underline text-error">donations</a
          >.
        </p>
      </div>
    </div>
  </div>
</div>

<svg style="display:none" version="2.0">
  <defs>
    <symbol
      id="checkcircle"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-4.105-4.498a.791.791 0 0 0-1.082.29l-3.828 6.63-1.733-2.08a.791.791 0 1 0-1.216 1.014l2.459 2.952a.792.792 0 0 0 .608.285.83.83 0 0 0 .068-.003.791.791 0 0 0 .618-.393L12.6 6.866a.791.791 0 0 0-.29-1.081z"
      />
    </symbol>
  </defs>
</svg>

<svg style="display:none" version="2.0">
  <defs>
    <symbol id="nocircle" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4,11H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z"
      />
    </symbol>
  </defs>
</svg>

<h1 class="text-2xl font-bold text-center mt-16">Plan Features</h1>

<div class="overflow-visible mx-auto max-w-xl mt-4">
  <table class="table">
    <thead
      class="text-lg sticky top-0 bg-base-100 bg-opacity-50 z-10 backdrop-blur-sm"
    >
      <tr>
        <th></th>
        <th class="text-center">Free</th>
        <th class="text-center">Subscriber</th>
        <th class="text-center">Premium</th>
      </tr>
    </thead>
    <tbody>
      {#each planFeatures as feature}
        {#if feature.header}
          <tr class="bg-base-200 font-bold">
            <td colspan="4">{feature.name} </td>
          </tr>
        {:else}
          <tr class="relative">
            <td>{feature.name} </td>
            <td class="text-center">
              {#if feature.freeString}
                {feature.freeString}
              {:else if feature.freeIncluded}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 ml-2 inline text-success"
                >
                  <use href="#checkcircle" />
                </svg>
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[26px] h-[26px] inline text-base-200"
                >
                  <use href="#nocircle" />
                </svg>
              {/if}
            </td>
            <td class="text-center">
              {#if feature.subscriberString}
                {feature.subscriberString}
              {:else if feature.subscriberIncluded}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 ml-2 inline text-success"
                >
                  <use href="#checkcircle" />
                </svg>
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[26px] h-[26px] inline text-base-200"
                >
                  <use href="#nocircle" />
                </svg>
              {/if}
            </td>
            <td class="text-center">
              {#if feature.premierString}
                {feature.premierString}
              {:else if feature.premierIncluded}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 ml-2 inline text-success"
                >
                  <use href="#checkcircle" />
                </svg>
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[26px] h-[26px] inline text-base-200"
                >
                  <use href="#nocircle" />
                </svg>
              {/if}
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
