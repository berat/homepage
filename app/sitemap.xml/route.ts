// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { getWritingDatabaseItems } from "@/lib/notion/queries/blog";
import { SITE_URL } from "@/constants/general";


function toDateOnly(iso: string) {
  // "2025-04-19T00:00:00.000Z" -> "2025-04-19"
  return iso.slice(0, 10);
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const [tr, en] = await Promise.all([
    getWritingDatabaseItems("tr", undefined, 200, true),
    getWritingDatabaseItems("en", undefined, 200, true),
  ]);

  // postId -> slug map (eşleştirme için)
  const enByPostId = new Map<string, string>();
  for (const p of en.items) if (p.postId && p.slug) enByPostId.set(p.postId, p.slug);

  const trByPostId = new Map<string, string>();
  for (const p of tr.items) if (p.postId && p.slug) trByPostId.set(p.postId, p.slug);

  const staticUrls = [
    `${SITE_URL}/tr`,
    `${SITE_URL}/en`,
    `${SITE_URL}/tr/blog`,
    `${SITE_URL}/en/blog`,
  ];

  const urlEntries: string[] = [];

  // static
  for (const u of staticUrls) {
    urlEntries.push(`
      <url>
        <loc>${esc(u)}</loc>
        <lastmod>${toDateOnly(new Date().toISOString())}</lastmod>
      </url>
    `);
  }

  // TR posts (+ alternates)
  for (const p of tr.items) {
    const loc = `${SITE_URL}/tr/blog/${p.slug}`;
    const lastmod = toDateOnly(p.published ?? new Date().toISOString());

    const enSlug = p.postId ? enByPostId.get(p.postId) : undefined;
    const enHref = enSlug ? `${SITE_URL}/en/blog/${enSlug}` : undefined;

    urlEntries.push(`
      <url>
        <loc>${esc(loc)}</loc>
        <lastmod>${esc(lastmod)}</lastmod>
        <xhtml:link rel="alternate" hreflang="tr" href="${esc(loc)}"/>
        ${enHref ? `<xhtml:link rel="alternate" hreflang="en" href="${esc(enHref)}"/>` : ""}
      </url>
    `);
  }

  // EN posts (+ alternates)
  for (const p of en.items) {
    const loc = `${SITE_URL}/en/blog/${p.slug}`;
    const lastmod = toDateOnly(p.published ?? new Date().toISOString());

    const trSlug = p.postId ? trByPostId.get(p.postId) : undefined;
    const trHref = trSlug ? `${SITE_URL}/tr/blog/${trSlug}` : undefined;

    urlEntries.push(`
      <url>
        <loc>${esc(loc)}</loc>
        <lastmod>${esc(lastmod)}</lastmod>
        <xhtml:link rel="alternate" hreflang="en" href="${esc(loc)}"/>
        ${trHref ? `<xhtml:link rel="alternate" hreflang="tr" href="${esc(trHref)}"/>` : ""}
      </url>
    `);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${urlEntries.join("\n")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
