import SectionTitle from "@/components/base/Title";
import ListItem from "@/components/base/List";
import { getAllWritingPosts } from "@/lib/blog";
import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Metadata } from "next";
import { createMetadata } from "@/lib/helpers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const texts = messages[locale];

  const title = texts.meta.blogTitle;
  const description = texts.meta.blogDescription;

  return createMetadata({
    title,
    description,
    path: texts.meta.blogSlug,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = await getAllWritingPosts(locale);

  const texts = messages[locale];

  // Group posts by year
  const postsByYear: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const publishedDate = post.published || post.createdTime;
    const year = new Date(publishedDate).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div
      id="writings"
      className="max-w-[85%] md:max-w-2xl mx-auto my-16 flex flex-col gap-10"
    >
      <h1 className="text-4xl text-primary font-bold">{texts.writings}</h1>

      {sortedYears.map((year) => (
        <ul key={year} className="flex flex-col gap-3">
          <SectionTitle title={year} />
          {postsByYear[year]
            .filter((post) => post.slug) // Only show posts that have slugs
            .map((post) => (
              <ListItem
                key={post.id}
                title={post.title}
                url={`/${locale}/blog/${post.slug}`}
              />
            ))}
        </ul>
      ))}
    </div>
  );
}
