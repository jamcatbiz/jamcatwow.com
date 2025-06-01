<script lang="ts">
  import { contents } from "$lib/state.svelte"
</script>

<div class="min-h-[60vh]">
  <div class="pt-10 pb-8 px-7">
    <div class="max-w-lg mx-auto text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent pb-2"
      >
        Games Everyday
      </div>
      <div class="mt-4 text-xl font-bold">
        Every game,
        <a
          href="/archive"
          class="underline decoration-secondary decoration-[3px] md:decoration-[4px]"
        >
          every day,
        </a>
        midnight EST
        <div class="divider m-2"></div>
        Subscribe for full access to
        <a
          href="/archive"
          class="underline decoration-secondary decoration-[3px] md:decoration-[4px]"
        >
          the archives
        </a>
        and
        <a
          href="/scoreboard"
          class="underline decoration-secondary decoration-[3px] md:decoration-[4px]"
        >
          our scoreboard
        </a>
      </div>
      <a href="/games/anagrams" class="">
        <button
          class="btn btn-wide shadow-md shadow-primary px-6 mt-6"
        >
          Random
        </button>
      </a>
    </div>

    <div
      class="flex gap-4 mt-12 max-w-[1064px] mx-auto place-content-center flex-wrap"
    >
      {#each contents.games as game}
        <a href={game.link} class="" target={game.newPage ? "_blank" : ""}>
          <div
            class="card bg-base-200 w-[300px] min-h-[180px] flex-none shadow-sm"
          >
            <figure>
            </figure>
            <div class="card-body text-center p-[18px] pt-[15px]">
              <h2 class="card-title">
                {game.name}
                {#each game.alerts as alert}
                  <div class="badge badge-accent">{alert}</div>
                {/each}
              </h2>
              <p class="text-sm opacity-80">
                {game.description}
              </p>
              <div class="card-actions justify-end">
                {#each game.labels as label}
                  <div class="badge badge-outline">{label}</div>
                {/each}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
  <div class="flex justify-center">
    <div class="max-w-lg mx-auto mt-8 text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent pb-2"
      >
        The Archives
      </div>
      <p>Coming soon!</p>
    </div>
  </div>
  <div class="flex justify-center mb-10">
    <div class="max-w-lg mx-auto mt-8 text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent pb-2"
      >
        The Scoreboard
      </div>
      <p>Coming soon!</p>
    </div>
  </div>
</div>
