import { Suspense } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { getPostAndMorePosts } from "@/actions/post";

import { PostDetail, ShareButtons } from "@/components/contents";
import { PostSkeleton, ShareSkeleton } from "@/components/skeletons";

type Params = Promise<{ slug: string }>;

export const revalidate = 10800;
export async function generateMetadata({ params }: { params: Params }) {
  const { slug: paramsSlug } = await params;
  const { isEnabled } = await draftMode();

  const { post } = await getPostAndMorePosts(paramsSlug, isEnabled);

  if (!post) {
    notFound();
  }

  const { title, slug, cover } = post;

  const ogImage = cover?.url ?? `https://beratbozkurt.net/og?title=${title}`;

  return {
    title: title + " | Berat Bozkurt",
    openGraph: {
      title: title + " | Berat Bozkurt",
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
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <main className="xl:w-container w-[95%] mx-auto lg:mb-10 my-4 flex flex-col gap-6">
      <Suspense fallback={<PostSkeleton />}>
        <PostDetail slug={slug} />
      </Suspense>
      <div className="xl:w-container w-[95%] mx-auto flex flex-col gap-4">
        <hr className="w-full mx-auto border-lightGray bg-lightGray h-0.5 my-8" />
        <Suspense fallback={<ShareSkeleton />}>
          <ShareButtons slug={slug} />
        </Suspense>
      </div>
    </main>
  );
}
