import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Metadata } from "next";
import { createMetadata } from "@/lib/helpers";
import { Suspense } from "react";
import ViewsSuspense from "@/components/suspenses/Views";
import { PageViews } from "@/components/views/page";
import { getBookmarks } from "@/lib/raindrop";
import { BookmarkType } from "@/app/api/bookmarks/route";
import Link from "next/link";
import SectionTitle from "@/components/base/Title";
import { randomInt } from "crypto";
import Category from "@/components/base/Category";
import { PageLikes } from "@/components/likes/post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const texts = messages[locale];

  const title = texts.meta.bookmarksTitle;
  const description = texts.meta.bookmarksDescription;

  return createMetadata({
    title,
    description,
    path: texts.meta.bookmarksSlug,
  });
}

export default async function Bookmarks({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const { data, categories } = await getBookmarks();

  const allText = locale === "tr" ? "hepsi" : "all";
  const selectedCategory = category || allText;

  // Filter data by category
  const filteredData =
    selectedCategory === allText
      ? data
      : data.filter((post: BookmarkType) =>
          post.tags?.some(
            (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
          ),
        );

  // Group posts by year
  const postsByYear: Record<string, typeof filteredData> = {};
  filteredData.forEach((post: BookmarkType) => {
    const publishedDate = post.created;
    const year = new Date(publishedDate).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  const texts = messages[locale];

  return (
    <div
      id="bookmarks"
      className="max-w-[85%] md:max-w-[90%] xl:max-w-6xl mx-auto my-16 flex flex-col gap-10"
    >
      <header className="flex flex-col gap-2.5">
        <small className="text-gray flex gap-1 items-center text-sm font-medium">
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageLikes
              type="page"
              slug={(locale === "tr" ? "" : "en/") + "bookmarks"}
            />
          </Suspense>
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageViews
              type="page"
              locale={locale}
              increase
              slug={(locale === "tr" ? "" : "en/") + "bookmarks"}
            />
          </Suspense>
        </small>
        <h1 className="text-4xl text-primary font-bold">{texts.bookmarks}</h1>
        <Category locale={locale} categories={categories} />
      </header>
      {sortedYears.map((year) => (
        <ul key={randomInt(99999999)} className="flex flex-col gap-3">
          <SectionTitle title={year} />
          <div className="flex items-center flex-col flex-1 lg:flex-auto lg:flex-row flex-wrap gap-4">
            {postsByYear[year].map((bookmark: BookmarkType) => (
              <li key={randomInt(99999999)} className="w-full lg:w-[47%]">
                <Link
                  key={bookmark._id}
                  href={bookmark.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 flex transition-shadow duration-300 items-center"
                >
                  {bookmark.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={bookmark.cover}
                      alt={bookmark.title}
                      className="w-58 min-w-58 h-32 object-cover rounded-lg shadow-md mr-4"
                    />
                  ) : (
                    <div className="w-58 h-32 bg-lightGray dark:bg-[#2f313a] rounded-lg" />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                      {bookmark.title}
                    </h2>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {bookmark.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      ))}
    </div>
  );
}
