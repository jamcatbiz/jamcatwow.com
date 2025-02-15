export const blogInfo = {
  name: "JamCatBlog",
  description: "A blog about our site.",
}

export type BlogPost = {
  link: string
  date: string // date is a string 'YYYY-MM-DD'
  title: string
  description: string
  badges: Array<string>
  parsedDate?: Date // Optional because it's added dynamically
}

// Update this list with the actual blog post list
// Create a page in the "(posts)" directory for each entry
const blogPosts: BlogPost[] = [
  {
    title: "Hello World!",
    description: "A blog about this site's origin and destiny. How dramatic.",
    link: "/blog/hello_world",
    date: "2023-03-13",
    badges: [],
  },
  {
    title: "Jam Cat How?",
    description: "How does this site work? Peek behind the curtain.",
    link: "/blog/how",
    date: "2023-03-13",
    badges: [],
  },
]

// Parse post dates from strings to Date objects
for (const post of blogPosts) {
  if (!post.parsedDate) {
    const dateParts = post.date.split("-")
    post.parsedDate = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2]),
    ) // Note: months are 0-based
  }
}

export const sortedBlogPosts = blogPosts.sort(
  (a: BlogPost, b: BlogPost) =>
    (b.parsedDate?.getTime() ?? 0) - (a.parsedDate?.getTime() ?? 0),
)
