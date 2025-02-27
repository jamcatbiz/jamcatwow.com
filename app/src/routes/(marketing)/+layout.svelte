<script lang="ts">
  import { WebsiteName } from "./../../config"
  import "../../app.css"

  // @ts-ignore
  import IconJam from "~icons/fa6-solid/jar"
  // @ts-ignore
  import IconCat from "~icons/fa6-solid/cat"
  // @ts-ignore
  import IconSearch from "~icons/fa6-solid/magnifying-glass"
  // @ts-ignore
  import IconExtras from "~icons/fa6-solid/bars"
  
  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

<div class="navbar bg-base-100 container mx-auto">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl font-serif" href="/">
      <IconJam class="text-xs text-primary" />
      <IconCat class="text-xs text-accent" />
      {WebsiteName}
    </a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal space-x-1 hidden sm:flex font-bold">
      <li class="md:mx-4">
        <a href="/subscriptions" class="btn btn-neutral">Subscribe</a>
      </li>
      <li class="md:mx-2">
        <a href="/games" aria-label="Games" class="btn btn-ghost">Games</a></li>
      <li class="md:mx-2">
        <a href="/blog" aria-label="Blog" class="btn btn-ghost">Blog</a></li>
      <li class="md:mx-2">
        <a href="/account"  aria-label="Account" class="btn btn-ghost">Account</a>
      </li>
      <li class="md:mx-0">
        <a href="/search" aria-label="Search" class="btn btn-ghost btn-square">
          <IconSearch />
        </a>
      </li>
    </ul>
    <div class="dropdown dropdown-end px-1 sm:hidden">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <label tabindex="0" class="btn btn-ghost btn-square">
        <IconExtras />
      </label>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <ul
        tabindex="0"
        class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold"
      >
        <li><a href="/games" aria-label="Games" class="btn btn-ghost">Games</a></li>
        <li><a href="/blog" aria-label="Blog" class="btn btn-ghost">Blog</a></li>
        <li><a href="/account" aria-label="Account" class="btn btn-ghost">Account</a></li>
        <li><a href="/search" aria-label="Search" class="btn btn-ghost">Search</a></li>
        <li>
          <a href="/subscriptions" aria-label="Subscriptions" class="btn btn-neutral">Subscribe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="">
  {@render children?.()}
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="flex-grow"></div>
<div class="">
  <div class="border-t max-w-[1000px] mx-auto"></div>
  <footer
    class="footer p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base"
  >
    <nav>
      <span class="footer-title opacity-80">Explore</span>
      <a class="link link-hover mb-1" href="/">Home</a>
      <a class="link link-hover my-1" href="/subscriptions">Subscribe</a>
      <a class="link link-hover my-1" href="/games">Games</a>
      <a class="link link-hover my-1" href="/blog">Blog</a>
      <a class="link link-hover my-1" href="/contact_us">Contact Us</a>
    </nav>
    <aside>
      <span class="footer-title opacity-80">Sincerely</span>
      <a class="max-w-[260px]" href="/mission">
        <div class="font-bold text-3xl mb-1">JamCatWow</div>
        <div class="font-medium mb-3">Play Games Together Everyday</div>
        <div class="font-light">
          We support social connection, literacy, and math competency.
        </div>
        <div class="link text-sm font-bold mt-2">Learn More</div>
      </a>
      <a class="max-w-[260px]" href="/blog/how">
        <div class="font-mono mt-2 text-sm">v0.1.1</div>
      </a>
    </aside>
  </footer>
</div>
