import { renderBlocks } from "@/components/base/notion";
import SectionTitle from "@/components/base/Title";
import { getAllWritingPosts } from "@/lib/blog";
import {
  getRandomWritingPosts,
  getWritingPostContentBySlug,
} from "@/lib/notion";
import Image from "next/image";
import { notFound } from "next/navigation";
import ListItem from "@/components/base/List";
import { getWritingPostSlugByPostId, Locale } from "@/lib/notion/queries/blog";
import { Metadata } from "next";
import { SITE_URL } from "@/constants/general";
import { messages } from "@/lib/i18n";
import Zoom from "react-medium-image-zoom";
import {  updateViewAndLike } from "@/lib/redis/views";
import { Suspense } from "react";
import { PageViews } from "@/components/views/post";
import ViewsSuspense from "@/components/suspenses/Views";

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
  const texts = messages[locale];

  // Fetch content and random posts in parallel
  const [content, randomPosts] = await Promise.all([
    getWritingPostContentBySlug(locale, slug),
    getRandomWritingPosts(locale, 5, slug),
  ]);

  if (!content) {
    notFound();
  }

  await updateViewAndLike(
    "post",
    (locale === "tr" ? "" : "en/") + slug,
    "views",
  );

  const { blocks, metadata } = content;

  return (
    <div
      id="writings-detail"
      className="max-w-[85%] md:max-w-2xl mx-auto my-16 flex flex-col gap-5"
    >
      <header className="flex flex-col gap-2.5">
        <small className="text-gray text-sm font-medium">
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
      <div className="flex flex-col gap-5 mt-14">
        <SectionTitle title={texts.readNext} />
        <ul className="flex flex-col gap-3">
          {randomPosts.map((post) => (
            <ListItem
              key={post.id}
              title={post.title}
              url={`/${locale}/blog/${post.slug}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPage;
