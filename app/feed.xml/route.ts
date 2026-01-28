import { NextResponse } from "next/server";
import { getWritingDatabaseItems } from "@/lib/notion/queries/blog";
import { SITE_URL, SITE_CONFIG } from "@/constants/general";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRFC822(iso: string) {
  const d = new Date(iso);
  return d.toUTCString();
}

export async function GET() {
  const [tr, en] = await Promise.all([
    getWritingDatabaseItems("tr", undefined, 50, true),
    getWritingDatabaseItems("en", undefined, 50, true),
  ]);

  const allPosts = [
    ...tr.items.map((p) => ({ ...p, locale: "tr" as const })),
    ...en.items.map((p) => ({ ...p, locale: "en" as const })),
  ].sort((a, b) => {
    const da = new Date(a.published || a.createdTime || 0).getTime();
    const db = new Date(b.published || b.createdTime || 0).getTime();
    return db - da;
  });

  const items = allPosts.slice(0, 50).map((post) => {
    const url = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
    const pubDate = post.published || post.createdTime || new Date().toISOString();

    return `
    <item>
      <title>${esc(post.title || post.slug)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${toRFC822(pubDate)}</pubDate>
      <description>${esc(post.excerpt || "")}</description>
      <author>${esc(SITE_CONFIG.author.name)}</author>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_CONFIG.name)} - Blog</title>
    <link>${SITE_URL}</link>
    <description>${esc(SITE_CONFIG.description)}</description>
    <language>en-tr</language>
    <lastBuildDate>${toRFC822(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
