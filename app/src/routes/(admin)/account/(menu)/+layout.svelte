<script lang="ts">
  import "../../../../app.css"
  import { writable } from "svelte/store"
  import { setContext } from "svelte"
  import { WebsiteName } from "../../../../config"

  // @ts-ignore
  import IconJam from "~icons/fa6-solid/jar"
  // @ts-ignore
  import IconCat from "~icons/fa6-solid/cat"
  // @ts-ignore
  import IconBack from "~icons/fa6-solid/arrow-left"
  // @ts-ignore
  import IconHome from "~icons/fa6-solid/house"
  // @ts-ignore
  import IconBilling from "~icons/fa6-solid/receipt"
  // @ts-ignore
  import IconSettings from "~icons/fa6-solid/gear"
  // @ts-ignore
  import IconSignOut from "~icons/fa6-solid/signs-post"
  // @ts-ignore
  import IconExtras from "~icons/fa6-solid/bars"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()

  const adminSectionStore = writable("")
  setContext("adminSection", adminSectionStore)
  let adminSection: string | undefined = $state()
  adminSectionStore.subscribe((value) => {
    adminSection = value
  })

  function closeDrawer(): void {
    const adminDrawer = document.getElementById(
      "admin-drawer",
    ) as HTMLInputElement
    adminDrawer.checked = false
  }
</script>

<div class="drawer lg:drawer-open">
  <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <div class="navbar bg-base-100 lg:hidden">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">
          <IconJam class="text-xs text-primary" />
          <IconCat class="text-xs text-accent" />
          {WebsiteName}
        </a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label for="admin-drawer" class="btn btn-ghost btn-square">
            <IconExtras />
          </label>
        </div>
      </div>
    </div>
    <div class="container px-6 lg:px-12 py-3 lg:py-6">
      {@render children?.()}
    </div>
  </div>

  <div class="drawer-side">
    <label for="admin-drawer" class="drawer-overlay"></label>
    <ul class="menu menu-lg p-4 w-80 min-h-full bg-base-100 lg:border-r">
      <li>
        <div
          class="normal-case menu-title text-xl font-bold text-primary flex flex-row"
        >
          <a href="/" class="grow">
            <div class="flex items-center space-x-2">
              <IconJam class="text-xs text-primary" />
              <IconCat class="text-xs text-accent" />
              <div class="text-base-content">{WebsiteName}</div>
            </div>
          </a>
          <label
            for="admin-drawer"
            class="lg:hidden ml-3 text-base-content opacity-70"
          >
            <IconBack />
          </label>
        </div>
      </li>
      <li>
        <a
          href="/account"
          class={adminSection === "home" ? "active" : ""}
          onclick={closeDrawer}
        >
          <IconHome class="mr-2" />
          Home
        </a>
      </li>
      <li>
        <a
          href="/account/billing"
          class={adminSection === "billing" ? "active" : ""}
          onclick={closeDrawer}
        >
          <IconBilling class="mr-2 w-6 h-6" />
          Billing
        </a>
      </li>
      <li>
        <a
          href="/account/settings"
          class={adminSection === "settings" ? "active" : ""}
          onclick={closeDrawer}
        >
          <IconSettings class="mr-2" />
          Settings
        </a>
      </li>

      <li class="mt-auto">
        <a href="/account/sign_out" class="mt-auto text-base">
          <IconSignOut class="mr-2" />
          Sign Out
        </a>
      </li>
    </ul>
  </div>
</div>
