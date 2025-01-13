import type { MetadataRoute } from "next";

import { getAllPosts } from "@/actions/post";

const DOMAIN = "https://beratbozkurt.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPosts] = await Promise.all([getAllPosts(100, false)]);

  const posts = allPosts.posts.map((post) => {
    return {
      url: `${DOMAIN}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly",
      priority: 0.5,
    };
  });

  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: DOMAIN + "/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: DOMAIN + "/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...posts,
    {
      url: DOMAIN + "/photos",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: DOMAIN + "/tools",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: DOMAIN + "/bookmarks",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
