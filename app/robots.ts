import type { MetadataRoute } from "next";

const SITE_URL = "https://beratbozkurt.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
