"use server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// actions
import { getSinglePost, likedPost, updateViewPost } from "@/actions/post";
// components
import { PostDetail } from "@/components/contents";
import { ShareButtons } from "@/components/base";

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = await getSinglePost(params.slug);

  if (!post || !post.post) {
    notFound();
  }

  const { title, slug, cover } = post.post;

  const description =
    post.content
      .splice(0, 5)
      .map((block) => {
        if (block.type === "paragraph") {
          return block.paragraph.rich_text[0]?.plain_text;
        }
        return "";
      })
      .join(" ")
      .slice(0, 240) + "...";

  const ogImage = cover ?? `https://beratbozkurt.net/og?title=${title}`;

  return {
    title: title + " | Berat Bozkurt",
    description,
    openGraph: {
      title: title + " | Berat Bozkurt",
      description,
      type: "article",
      url: `https://beratbozkurt.net/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | Berat Bozkurt",
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug);

  if (!post || !post.post) {
    notFound();
  }

  const updateLike = async (count: number) => {
    "use server";
    const liked = await likedPost(post.post.id, count);
    return liked;
  };

  const updateView = async () => {
    "use server";
    if (process.env.NODE_ENV === "production") {
      const viewed = await updateViewPost(post.post.id, post.post.view + 1);
      return viewed;
    }
    return false;
  };

  return (
    <main className="xl:w-container lg:w-[95%] mx-auto lg:mb-10 my-4 flex flex-col gap-6">
      <PostDetail post={post} updateView={updateView} />
      <div className="xl:w-container w-[95%] mx-auto flex flex-col gap-4">
        <hr className="w-full mx-auto border-gray bg-gray h-0.5 my-8" />
        <ShareButtons
          likeCount={post.post.like}
          title={post.post.title}
          handleLikeRequest={updateLike}
        />
      </div>
    </main>
  );
}
