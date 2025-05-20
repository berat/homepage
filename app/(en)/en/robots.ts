import type { MetadataRoute } from "next";

const DOMAIN = "https://beratbozkurt.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: DOMAIN + "/sitemap.xml",
  };
}
