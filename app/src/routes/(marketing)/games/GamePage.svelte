<script lang="ts">
  import { contents } from "$lib/state.svelte"
</script>

<div class="min-h-[60vh]">
  <div class="pt-16 pb-8 px-7">
    <div class="max-w-lg mx-auto text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent pb-2"
      >
        We've got games
      </div>
      <div class="mt-4 text-xl font-bold">
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
    </div>

    <div
      class="flex gap-6 mt-12 max-w-[1064px] mx-auto place-content-center flex-wrap"
    >
      {#each contents.games as game}
        <a href={game.link} class="pb-4" target={game.newPage ? "_blank" : ""}>
          <div
            class="card bg-base-300 w-[270px] min-h-[300px] flex-none shadow-md shadow-{game.color}"
          >
            <div class="card-body items-center text-center p-[24px] pt-[32px]">
              <div>
                <!-- <svg
                  width="50px"
                  height="50px"
                  class="mb-2 mt-1 stroke-current text-primary"
                  viewBox={game.svgViewBow}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- eslint-disable-next-line svelte/no-at-html-tags --
                  {@html game.svgContent}
                </svg> -->
              </div>
              <h2 class="card-title text-{game.color} font-serif">
                {game.name}
              </h2>
              <p class="text-sm mt-4 opacity-85">
                {game.description}
              </p>
              <button
                class="btn btn-block btn-outline btn-{game.color} min-w-[100px]"
              >
                {game.linkText ? game.linkText : "Play"}
              </button>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
  <div class="flex justify-center">
    <div class="max-w-lg mx-auto mt-8 text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent pb-2"
      >
        The Archives
      </div>
      <p>
        Coming soon!
      </p>
    </div>
  </div>
  <div class="flex justify-center mb-10">
    <div class="max-w-lg mx-auto mt-8 text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent pb-2"
      >
        The Scoreboard
      </div>
      <p>
        Coming soon!
      </p>
    </div>
  </div>
</div>