import { renderBlocks } from "@/components/base/notion";
import { getAllWritingPosts } from "@/lib/blog";
import { getWritingPostContentBySlug } from "@/lib/notion";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWritingPostSlugByPostId, Locale } from "@/lib/notion/queries/blog";
import { RandomPosts } from "@/components/blog/RandomPosts";
import { RandomPostsSkeleton } from "@/components/suspenses/RandomPosts";
import { Metadata } from "next";
import { SITE_URL } from "@/constants/general";
import Zoom from "react-medium-image-zoom";
import { updateViewAndLike } from "@/lib/redis/views";
import { Suspense } from "react";
import { PageViews } from "@/components/views/post";
import ViewsSuspense from "@/components/suspenses/Views";
import { PageLikes } from "@/components/likes/post";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schema";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getWritingPostContentBySlug(locale, slug);
  if (!data) return {};

  const { metadata } = data;

  const canonical = `${SITE_URL}/${locale}/blog/${slug}`;
  const otherLocale: Locale = locale === "tr" ? "en" : "tr";

  let otherUrl: string | undefined;
  if (metadata.postId) {
    const otherSlug = await getWritingPostSlugByPostId(
      otherLocale,
      metadata.postId,
    );
    if (otherSlug) otherUrl = `${SITE_URL}/${otherLocale}/blog/${otherSlug}`;
  }

  return {
    title: metadata.title,
    description: metadata.excerpt,
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        ...(otherUrl ? { [otherLocale]: otherUrl } : {}),
      },
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: metadata.title,
      description: metadata.excerpt,
      images: metadata.featureImage ? [metadata.featureImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.excerpt,
      images: metadata.featureImage ? [metadata.featureImage] : undefined,
    },
  };
}

// Generate static pages at build time for all blog posts
export async function generateStaticParams(): Promise<
  { locale: Locale; slug: string }[]
> {
  const locales: Locale[] = ["tr", "en"];

  const all = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllWritingPosts(locale);
      return posts
        .filter((post) => post.slug)
        .map((post) => ({ locale, slug: post.slug as string }));
    }),
  );

  return all.flat();
}

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) => {
  const { slug, locale } = await params;

  const content = await getWritingPostContentBySlug(locale, slug);

  if (!content) {
    notFound();
  }

  updateViewAndLike("post", (locale === "tr" ? "" : "en/") + slug, "views");

  updateViewAndLike("page", (locale === "tr" ? "" : "en/") + "blog", "views");

  const { blocks, metadata } = content;

  const canonical = `${SITE_URL}/${locale}/blog/${slug}`;
  const blogLabel = locale === "tr" ? "Blog" : "Writings";

  const articleSchema = getArticleSchema({
    title: metadata.title,
    description: metadata.excerpt,
    url: canonical,
    image: metadata.featureImage,
    publishedTime: metadata.published,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${locale}` },
    { name: blogLabel, url: `${SITE_URL}/${locale}/blog` },
    { name: metadata.title, url: canonical },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div
        id="writings-detail"
        className="max-w-[85%] md:max-w-2xl mx-auto my-16 flex flex-col gap-5"
      >
      <header className="flex flex-col gap-2.5">
        <small className="flex items-center text-gray text-sm font-medium">
          <Suspense fallback={<ViewsSuspense isLike locale={locale} />}>
            <PageLikes
              type="post"
              slug={(locale === "tr" ? "" : "en/") + slug}
            />
          </Suspense>
          {metadata.published &&
            new Date(metadata.published)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .replace(/(\d{2} \w+) (\d{4})/, "$1, $2")}{" "}
          {"• "}
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageViews
              locale={locale}
              slug={"post:" + (locale === "tr" ? "" : "en/") + slug}
            />
          </Suspense>
        </small>
        <h1 className="text-3xl text-primary font-bold">{metadata.title}</h1>
        {metadata.featureImage && (
          <Zoom zoomMargin={45}>
            <Image
              src={metadata.featureImage}
              alt={metadata.title}
              width={800}
              height={450}
              className="rounded-lg mt-1.5"
            />
          </Zoom>
        )}
      </header>
      <div className="flex min-w-0 flex-col gap-4 text-lg">
        {renderBlocks(blocks)}
      </div>
      <Suspense fallback={<RandomPostsSkeleton locale={locale} />}>
        <RandomPosts locale={locale} excludeSlug={slug} />
      </Suspense>
      </div>
    </>
  );
};

export default PostDetailPage;
