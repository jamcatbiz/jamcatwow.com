import type { RequestHandler } from "@sveltejs/kit"
import * as sitemap from "super-sitemap"
import { WebsiteBaseUrl } from "../../../config"

export const prerender = true

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: WebsiteBaseUrl,
    excludeRoutePatterns: [
      ".*\\(admin\\).*", // i.e. exclude routes within admin group
      ".*ladders.*", // Parked games (ADR 0008): code stays, off the sitemap
      ".*hashbang.*",
    ],
  })
}
