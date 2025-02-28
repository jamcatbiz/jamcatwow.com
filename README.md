# Jam Cat Wow

Welcome to the home of jamcatwow.com!

Jamcatwow is a web SaaS platform for hosting games and fostering a community around the pleasure of playing fun word, number, and logic games together with your favorite people, everyday.

In this README we will go over the components of this platform, their change management, their hosting, and their deployment.

## Tech Stack

* Web Framework: SvelteKit
* CSS / Styling
  * Framework: TailwindCSS
  * Component Library: DaisyUI
* Hosting
  * Host + CDN: Cloudflare Pages
  * Serverless compute: Cloudflare Workers
  * Authentication: Supabase Auth
  * Database: Supabase Postgres
* Payments
  * Stripe Checkout
  * Stripe Portal
* Software Delivery
  * Continuous Integration: GitHub Action
  * Continuous Deployment: Cloudflare Pages -> `main`
* Admin Scripting Language: Python

## Web Application

The entire Svelte/SvelteKit web app is found in `app/`. See its README for details on usage, install, build, dev tools, etc.

## Game Management

The `mgmt/` dir contains a dir for every game. Each of these game dirs contains two python scripts, a `solver.py` to produce game solutions and a `generator.py` to create games, solve them, validate them, and publish them.

Currently these scripts are run manually on a local machine, but we would like to better automate this process.

## CI/CD

This repository uses the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification).

All `pull_request` events to `main` result in the following:
* Linting, Format Checking, Build Testing, Unit Testing. (coming soon...)

All `push` events to `main` result in the following:
* A Cloudflare Pages Deployment is automatically invoked (configured in the CloudFlare web console); which includes build, deploy, cache-busting, and DNS for their serverless hosting solution.
* A GitHub Release is created using [release-please](https://github.com/googleapis/release-please) via its [GitHub Action here](https://github.com/googleapis/release-please-action). This is done by `.github/workflows/release.yml`

## Contributing

We are only accepting contributions in the form of [Issues](https://github.com/jamcatbiz/jamcatwow.com/issues) at this time.