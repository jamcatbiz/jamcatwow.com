import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '$anagrams': './src/routes/(marketing)/games/(games)/anagrams',
      '$numbers': './src/routes/(marketing)/games/(games)/numbers',
      '$ladders': './src/routes/(marketing)/games/(games)/ladders',
      '$hashbang': './src/routes/(marketing)/games/(games)/hashbang',
    },
    // allow up to 150kb of style to be inlined with the HTML
    // Faster FCP (First Contentful Paint) by reducing the number of requests
    inlineStyleThreshold: 150000,
  },
  preprocess: vitePreprocess(),
}

export default config
