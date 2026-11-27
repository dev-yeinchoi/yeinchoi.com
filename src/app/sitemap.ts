import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["/", ...nav.map((n) => n.href)].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
  }));
}
