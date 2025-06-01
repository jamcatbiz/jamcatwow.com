<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("home")

  let { data } = $props()

  let { profile } = data
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<h1 class="text-2xl font-semibold font-serif">
  Hello {profile?.full_name ?? ""}!
</h1>
<div class="mt-4">
  <p>This page is a hub for your account information and management.</p>
  <p class="mt-1">Check out the navigation top-right for more options.</p>
</div>

<div class="divider"></div>
<h1 class="text-2xl font-semibold font-serif">Your Stats</h1>
<div class="my-6">
  <h1 class="text-xl font-bold mb-1">Games Played</h1>
  <div class="stats shadow-sm stats-vertical sm:stats-horizontal sm:w-[420px]">
    <div class="stat place-items-center">
      <div class="stat-title">Downloads</div>
      <div class="stat-value">31K</div>
      <div class="stat-desc">↗︎ 546 (2%)</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">Users</div>
      <div class="stat-value text-secondary">4,200</div>
      <div class="stat-desc">↗︎ 40 (2%)</div>
    </div>
  </div>
</div>
<div class="my-6">
  <h1 class="text-xl font-bold mb-1">Points Scored</h1>
  <div class="stats shadow-sm stats-vertical sm:stats-horizontal sm:w-[420px]">
    <div class="stat place-items-center">
      <div class="stat-title">New Registers</div>
      <div class="stat-value">1,200</div>
      <div class="stat-desc">↘︎ 90 (14%)</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">Churned Accounts</div>
      <div class="stat-value">42</div>
      <div class="stat-desc">↘︎ 6 (12%)</div>
    </div>
  </div>
</div>
<div class="my-6">
  <h1 class="text-xl font-bold mb-1">Scores Shared</h1>
  <div class="stats shadow-sm stats-vertical sm:stats-horizontal sm:w-[420px]">
    <div class="stat place-items-center">
      <div class="stat-title text-success">Revenue</div>
      <div class="stat-value text-success">$4200</div>
      <div class="stat-desc">↗︎ $180 (4%)</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">New Subscribers</div>
      <div class="stat-value">16</div>
      <div class="stat-desc">↘︎ 1 (%7)</div>
    </div>
  </div>
</div>
