"use server";
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// actions
import { getSinglePost } from "@/actions/post";
// components
import { PostDetail, ShareButtons } from "@/components/contents";
import { PostSkeleton, ShareSkeleton } from "@/components/skeletons";

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
      .map((block) =>
        block.type === "paragraph"
          ? block.paragraph.rich_text[0]?.plain_text
          : ""
      )
      .join(" ")
      .slice(0, 150) + "...";

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
  return (
    <main className="xl:w-container w-[95%] mx-auto lg:mb-10 my-4 flex flex-col gap-6">
      <Suspense fallback={<PostSkeleton />}>
        <PostDetail slug={params.slug} />
      </Suspense>
      <div className="xl:w-container w-[95%] mx-auto flex flex-col gap-4">
        <hr className="w-full mx-auto border-gray bg-gray h-0.5 my-8" />
        <Suspense fallback={<ShareSkeleton />}>
          <ShareButtons slug={params.slug} />
        </Suspense>
      </div>
    </main>
  );
}
