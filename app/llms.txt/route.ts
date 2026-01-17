import { SITE_CONFIG } from "./../../constants/general";
import { getAllWritingPosts } from "@/lib/blog";
import type { Locale } from "@/lib/notion/queries/blog";

function toAbs(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_CONFIG.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

export const runtime = "nodejs";
export const revalidate = 60 * 60; // 1 hour

type Post = {
  slug: string;
  title?: string | null;
  published?: string | null;
  createdTime?: string | null;
};

function isoDate(dateLike?: string | null) {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function normalize(s: string) {
  return (s || "").toLowerCase();
}

function inferTagsAndSummary(title: string, slug: string) {
  const s = normalize(`${title} ${slug}`);

  const tags: string[] = [];

  // tech
  if (s.includes("javascript") || s.includes("js") || s.includes("event-loop") || s.includes("promise"))
    tags.push("javascript");
  if (s.includes("typescript") || s.includes("ts")) tags.push("typescript");
  if (s.includes("react")) tags.push("react");
  if (s.includes("micro") && s.includes("frontend")) tags.push("micro-frontend");
  if (s.includes("frontend")) tags.push("frontend");
  if (s.includes("git")) tags.push("git");
  if (s.includes("vscode")) tags.push("vscode");
  if (s.includes("macos") || s.includes("mac")) tags.push("macos");
  if (s.includes("test")) tags.push("testing");

  // personal / travel
  if (s.includes("2024") || s.includes("2023") || s.includes("2022") || s.includes("özet") || s.includes("over"))
    tags.push("yearly");
  if (s.includes("rutini") || s.includes("routine")) tags.push("habits");
  if (s.includes("mısır") || s.includes("egypt") || s.includes("kahire") || s.includes("cairo")) tags.push("travel-egypt");
  if (s.includes("balkan")) tags.push("travel-balkans");
  if (s.includes("hissizlik") || s.includes("numbness")) tags.push("essay");

  // Make a short, deterministic one-liner summary based on tags
  const summaryByTag: Record<string, string> = {
    "micro-frontend": "Notes on micro frontend architecture and trade-offs.",
    "javascript": "JavaScript concepts with practical explanations.",
    "react": "React-focused notes and practices.",
    "frontend": "Frontend engineering notes and debugging practices.",
    "testing": "Writing tests and testing mindset.",
    "git": "Git workflows and recovery tips.",
    "macos": "macOS development setup tips.",
    "vscode": "VSCode setup and workflow notes.",
    "travel-egypt": "Travel notes from Egypt trip.",
    "travel-balkans": "First trip abroad: Balkans notes.",
    "yearly": "Yearly reflection and recap.",
    "habits": "Routine building and habit notes.",
    "essay": "Personal essay / reflection.",
  };

  const best = tags.find((t) => summaryByTag[t]) ?? "";
  const summary = best ? summaryByTag[best] : ""; // fallback empty

  // de-dup tags
  const uniqTags = Array.from(new Set(tags));
  return { tags: uniqTags, summary };
}

function pickTopPicks(posts: Post[], max = 10) {
  // score by keyword-y slugs/titles + recency
  const scored = posts.map((p) => {
    const title = p.title ?? p.slug;
    const s = normalize(`${title} ${p.slug}`);

    let score = 0;
    const boosts: Array<[RegExp, number]> = [
      [/micro.*frontend|micro-frontend/, 6],
      [/event loop|event-loop|promise|promis/, 5],
      [/javascript|typescript|react|frontend/, 4],
      [/test|testing/, 3],
      [/git|macos|vscode/, 2],
      [/egypt|mısır|cairo|kahire|balkan/, 1],
    ];
    for (const [re, w] of boosts) if (re.test(s)) score += w;

    const t = new Date(p.published || p.createdTime || 0).getTime();
    // add a little recency weight (0..3)
    const now = Date.now();
    const days = t ? Math.max(0, Math.floor((now - t) / 86400000)) : 99999;
    const recencyBonus = days < 365 ? 3 : days < 365 * 2 ? 2 : days < 365 * 4 ? 1 : 0;

    return { p, score: score + recencyBonus };
  });

  scored.sort((a, b) => b.score - a.score);
  const picked: Post[] = [];
  const seen = new Set<string>();

  for (const x of scored) {
    if (picked.length >= max) break;
    const key = x.p.slug;
    if (seen.has(key)) continue;
    picked.push(x.p);
    seen.add(key);
  }
  return picked;
}

function groupByTopic(posts: Post[]) {
  const groups: Record<string, Post[]> = {
    "Frontend / JavaScript": [],
    "React / Testing": [],
    "Tooling (Git/Mac/VSCode)": [],
    "Personal essays / Yearly": [],
    "Travel": [],
    "Other": [],
  };

  for (const p of posts) {
    const title = p.title ?? p.slug;
    const s = normalize(`${title} ${p.slug}`);

    const isTravel = /(mısır|egypt|kahire|cairo|aswan|luxor|balkan|sharm)/.test(s);
    const isYearlyOrEssay = /(özet|summarize|year|202[0-9]|hissizlik|numbness|sharing|paylaşmak|gelip|come and go)/.test(s);
    const isTooling = /(git|macos|github|vscode)/.test(s);
    const isReactOrTesting = /(react|test)/.test(s);
    const isFEJS = /(javascript|typescript|frontend|event-loop|promise|immutable|mutable|micro.*frontend)/.test(s);

    if (isTravel) groups["Travel"].push(p);
    else if (isReactOrTesting) groups["React / Testing"].push(p);
    else if (isTooling) groups["Tooling (Git/Mac/VSCode)"].push(p);
    else if (isYearlyOrEssay) groups["Personal essays / Yearly"].push(p);
    else if (isFEJS) groups["Frontend / JavaScript"].push(p);
    else groups["Other"].push(p);
  }

  // sort each group newest first
  for (const k of Object.keys(groups)) {
    groups[k] = groups[k].sort((a, b) => {
      const da = new Date(a.published || a.createdTime || 0).getTime();
      const db = new Date(b.published || b.createdTime || 0).getTime();
      return db - da;
    });
  }

  return groups;
}

export async function GET() {
  const locales: Locale[] = ["tr", "en"];

  const postsByLocale = await Promise.all(
    locales.map(async (locale) => {
      const posts = (await getAllWritingPosts(locale)) as Post[];
      return { locale, posts };
    })
  );

  const lines: string[] = [];

  const today = new Date().toISOString().slice(0, 10);

  lines.push(`# ${SITE_CONFIG.url}`);
  lines.push(`Last updated: ${today}`);
  lines.push(``);
  lines.push(`## About this site`);
  lines.push(
    `Personal site & blog by Berat Bozkurt. Topics: frontend engineering (JS/TS, React, micro frontends), notes, personal essays, travel.`
  );
  lines.push(`Languages: TR and EN. Prefer EN links for English queries, TR links for Turkish queries.`);
  lines.push(``);
  lines.push(`## Citation & attribution`);
  lines.push(`Please cite as: “Berat Bozkurt — beratbozkurt.net” and include the canonical URL.`);
  lines.push(`Contact: me@beratbozkurt.net`);
  lines.push(``);

  lines.push(`## Key pages`);
  lines.push(`- [Home](${toAbs("/")})`);
  lines.push(`- [Blog (TR)](${toAbs("/tr/blog")})`);
  lines.push(`- [Blog (EN)](${toAbs("/en/blog")})`);
  lines.push(`- [Sitemap](${toAbs("/sitemap.xml")})`);
  lines.push(``);

  for (const { locale, posts } of postsByLocale) {
    const sorted = [...posts].sort((a, b) => {
      const da = new Date(a.published || a.createdTime || 0).getTime();
      const db = new Date(b.published || b.createdTime || 0).getTime();
      return db - da;
    });

    lines.push(`## Start here (${locale.toUpperCase()})`);
    const top = pickTopPicks(sorted, 10);
    for (const post of top) {
      const title = post.title ?? post.slug;
      const url = `/${locale}/blog/${post.slug}`;
      const { tags, summary } = inferTagsAndSummary(title, post.slug);
      const date = isoDate(post.published || post.createdTime) || "";
      const meta = [
        summary ? summary : "",
        tags.length ? `Tags: ${tags.join(", ")}` : "",
        date ? `Date: ${date}` : "",
      ].filter(Boolean);
      lines.push(`- [${title}](${toAbs(url)})${meta.length ? ` — ${meta.join(" | ")}` : ""}`);
    }
    lines.push(``);

    lines.push(`## Topics (${locale.toUpperCase()})`);
    const groups = groupByTopic(sorted);

    for (const [topic, items] of Object.entries(groups)) {
      if (!items.length) continue;
      // keep topic lists short to stay “curated”
      const slice = items.slice(0, 8);
      lines.push(`### ${topic}`);
      for (const post of slice) {
        const title = post.title ?? post.slug;
        const url = `/${locale}/blog/${post.slug}`;
        const { tags, summary } = inferTagsAndSummary(title, post.slug);
        lines.push(`- [${title}](${toAbs(url)})${summary ? ` — ${summary}` : ""}${tags.length ? ` (Tags: ${tags.join(", ")})` : ""}`);
      }
      lines.push(``);
    }

    lines.push(`## Full index (${locale.toUpperCase()})`);
    for (const post of sorted) {
      const title = post.title ?? post.slug;
      const url = `/${locale}/blog/${post.slug}`;
      const { tags } = inferTagsAndSummary(title, post.slug);
      // full index = no long summaries (keeps file lighter)
      lines.push(`- [${title}](${toAbs(url)})${tags.length ? ` (Tags: ${tags.join(", ")})` : ""}`);
    }
    lines.push(``);
  }

  lines.push(`## Clean Markdown (recommended for AI)`);
  lines.push(`- Consider serving a clean Markdown version of each post by appending ".md" (e.g., /tr/blog/my-post.md).`);
  lines.push(`- If you implement it, also add: /tr/blog.md and /en/blog.md as markdown indexes.`);
  lines.push(``);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
