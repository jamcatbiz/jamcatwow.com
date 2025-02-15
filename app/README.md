# jamcatwow.com

## Tech Stack

- Web Framework: SvelteKit
- CSS / Styling
  - Framework: TailwindCSS
  - Component library: DaisyUI
- Hosting Stack
  - Host + CDN: Cloudflare Pages
  - Serverless compute: Cloudflare Workers
  - Authentication: Supabase Auth
  - Database: Supabase Postgres
- Payments
  - Stripe Checkout
  - Stripe Portal

## Performance / Best Practices

The selected tech stack creates lightning fast websites.

- Pre-rendering (static generation) for marketing pages, pricing and blog
- Instant navigation: the best of CSR + SSR in one. SSR your first page for fastest possible initial load times. For subsequent pages, the content is pre-loaded and rendered with CSR, for instant rendering.
- CDN optimized, for high edge-cache hit ratios
- Edge-functions for dynamic APIs/pages
- Svelte and Tailwind compile out unused HTML, CSS and JS at deploy time for smaller pages
- Linting to find accessibility and syntax issues

# Quick Start

## Setup Local Development

On your development machine:

```
git pull [Your Repo Created Above]
npm install
## Create an env file. You'll replace the values in this in later steps.
## Run the project locally in dev mode, and launch the browser
npm run dev -- --open
```

**Note:** some features won't work until you complete the rest of the setup steps below!

### Running Developer Tools Locally

To manually run all these tools run the following script. You can view it's contents for individual commands.

```
# first time only: chmod +x ./checks.sh
./checks.sh
```
