<script lang="ts">
  import { sortedBlogPosts, blogInfo } from "./posts"
</script>

<svelte:head>
  <title>{blogInfo.name}</title>
  <meta name="description" content="Our blog posts." />
</svelte:head>

<div class="py-8 lg:py-12 px-6 max-w-lg mx-auto">
  <div
    class="text-3xl lg:text-5xl font-medium text-primary flex gap-3 items-baseline text-center place-content-center"
  >
    <div
      class="text-center leading-relaxed font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent"
    >
      {blogInfo.name}
    </div>
  </div>
  <div class="text-lg text-center">Yes, of course, we blog.</div>

  {#each sortedBlogPosts as post}
    <a href={post.link}>
      <div class="flex-row card bg-base-300 my-6 shadow-lg overflow-hidden">
        <div class="flex-none w-6 bg-primary"></div>
        <div class="py-6 px-6">
          <div class="text-xl font-semibold">{post.title}</div>
          <div class="text-sm text-accent">
            {post.parsedDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div class="">{post.description}</div>
        </div>
      </div>
    </a>
  {/each}
</div>
