/* eslint-disable @next/next/no-img-element */
import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Metadata } from "next";
import { createMetadata } from "@/lib/helpers";
import { getPhotos } from "@/lib/unsplash";
import { Suspense } from "react";
import ViewsSuspense from "@/components/suspenses/Views";
import { PageViews } from "@/components/views/page";
import { PageLikes } from "@/components/likes/post";
import {
  getToolsByCategory,
  ToolCategory,
  ToolItem,
} from "@/lib/notion/queries/tools";
import Link from "next/link";

// Cache the page for 1 week (604800 seconds)
export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const texts = messages[locale];

  const title = texts.meta.toolsTitle;
  const description = texts.meta.toolsDescription;

  return createMetadata({
    title,
    description,
    path: texts.meta.toolsSlug,
    locale,
  });
}

const categoryOrder: ToolCategory[] = [
  "Accessiories",
  "Life",
  "Smartphone",
  "Productivity",
  "Coding",
  "Software",
  "AI",
];

const largeCardCategories: ToolCategory[] = ["Accessiories", "Life"];

const categoryLabels: Record<ToolCategory, Record<Locale, string>> = {
  Accessiories: { tr: "Aksesuarlar", en: "Accessories" },
  Smartphone: { tr: "Telefon Uygulamaları", en: "Smartphone Apps" },
  Productivity: { tr: "Verimlilik", en: "Productivity" },
  Coding: { tr: "Yazılım", en: "Coding" },
  Software: { tr: "Yazılımlar", en: "Software" },
  AI: { tr: "Yapay Zeka", en: "AI" },
  Life: { tr: "Yaşam", en: "Life" },
};

function LargeToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col w-[265.5px] rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors overflow-hidden"
    >
      {tool.cover ? (
        <img
          src={tool.cover}
          alt={tool.name}
          loading="lazy"
          className="w-[265.5px] h-[265.5px] rounded-xl object-cover"
        />
      ) : (
        <div className="w-[265.5px] h-[265.5px] rounded-xl bg-zinc-100 dark:bg-zinc-800" />
      )}
      <div className="flex flex-col p-3">
        <span className="font-medium text-primary truncate">{tool.name}</span>
        <span className="text-sm text-gray-500 line-clamp-2">
          {tool.description}
        </span>
      </div>
    </Link>
  );
}

function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
    >
      <div className="bg-[#EBEBEB] dark:bg-zinc-700 min-w-16 h-16 flex items-center justify-center rounded-lg">
        {tool.cover ? (
          <img
            src={tool.cover}
            alt={tool.name}
            loading="lazy"
            className="w-11 h-11 object-cover"
          />
        ) : (
          <div className="w-11 h-11" />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-primary truncate">{tool.name}</span>
        <span className="text-sm text-gray line-clamp-2">
          {tool.description}
        </span>
      </div>
    </Link>
  );
}

export default async function Tools({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  console.log("BeratLog ~ Tools ~ locale:", locale);
  const toolsByCategory = await getToolsByCategory(locale);

  const texts = messages[locale];

  return (
    <div
      id="tools"
      className="max-w-[85%] md:max-w-6xl mx-auto my-16 flex flex-col gap-10"
    >
      <header className="flex flex-col gap-2.5">
        <small className="text-gray flex gap-1 items-center text-sm font-medium">
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageLikes
              type="page"
              slug={(locale === "tr" ? "" : "en/") + "tools"}
            />
          </Suspense>
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageViews
              locale={locale}
              increase
              type="page"
              slug={(locale === "tr" ? "" : "en/") + "tools"}
            />
          </Suspense>
        </small>
        <h1 className="text-4xl text-primary font-bold">{texts.tools}</h1>
      </header>

      <div className="w-full rounded-2xl overflow-hidden">
        <img
          src={
            "https://images.unsplash.com/photo-1734361794901-76f694f3bb0a?q=80&w=2548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={"Tools hero"}
          className="w-full h-auto object-fit max-h-137"
        />
      </div>

      {categoryOrder.map((category) => {
        const tools = toolsByCategory[category];
        if (!tools || tools.length === 0) return null;

        const isLargeCard = largeCardCategories.includes(category);

        return (
          <section key={category} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-primary">
              {categoryLabels[category][locale]}
            </h2>
            {isLargeCard ? (
              <div className="flex flex-wrap gap-7">
                {tools.map((tool) => (
                  <LargeToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </section>
        );
      })}

      <footer className="mt-10 text-sm text-gray-500 italic">
        This page is dedicated to the tools that I use in web development. Wes
        Bos setup a awesome site at{" "}
        <Link
          href="https://uses.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          uses.tech
        </Link>{" "}
        that lists out other web developers pages.
      </footer>
    </div>
  );
}
