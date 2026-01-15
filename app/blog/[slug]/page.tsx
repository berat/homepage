import { renderBlocks } from "@/components/base/notion";
import SectionTitle from "@/components/base/Title";
import { getAllWritingPosts } from "@/lib/blog";
import { getRandomWritingPosts, getWritingPostContentBySlug } from "@/lib/notion";
import Image from "next/image";
import { notFound } from "next/navigation";
import ListItem from "@/components/base/List";

export const revalidate = 3600;

// Generate static pages at build time for all blog posts
export async function generateStaticParams() {
  const posts = await getAllWritingPosts();
  return posts
    .filter((post) => post.slug)
    .map((post) => ({
      slug: post.slug,
    }));
}

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  // Fetch content and random posts in parallel
  const [content, randomPosts] = await Promise.all([
    getWritingPostContentBySlug(slug),
    getRandomWritingPosts(5, slug),
  ]);

  if (!content) {
    notFound();
  }

  const { blocks, metadata } = content;

  return (
    <div
      id="writings-detail"
      className="max-w-2xl mx-auto my-16 flex flex-col gap-5"
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
          • 45 görüntülenme
        </small>
        <h1 className="text-3xl text-primary font-bold">{metadata.title}</h1>
        {metadata.featureImage && (
          <Image
            src={metadata.featureImage}
            alt={metadata.title}
            width={800}
            height={450}
            className="rounded-lg mt-1.5"
          />
        )}
      </header>
      <div className="flex min-w-0 flex-col gap-4 text-lg">
        {renderBlocks(blocks)}
      </div>
      <div className="flex flex-col gap-5 mt-14">
        <SectionTitle title="Read Next" />
        <ul className="flex flex-col gap-3">
          {randomPosts.map((post) => (
            <ListItem
              key={post.id}
              title={post.title}
              url={`/blog/${post.slug}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPage;
