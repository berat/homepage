import { Suspense } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { getPostAndMorePosts } from "@/actions/post";

import {
  PostDetail,
  PreviousNextPosts,
  ShareButtons,
} from "@/components/contents";
import { PostSkeleton, ShareSkeleton } from "@/components/skeletons";
import { BlogCardSkeleton } from "@/components/skeletons/card";

type Params = Promise<{ slug: string }>;

export const revalidate = 10800;
export async function generateMetadata({ params }: { params: Params }) {
  const { slug: paramsSlug } = await params;
  const { isEnabled } = await draftMode();

  const { post } = await getPostAndMorePosts(paramsSlug, isEnabled, false);

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
        <PostDetail slug={slug} isTurkish={false} />
      </Suspense>
      <div className="xl:w-[1000px] w-[95%] mx-auto flex flex-col gap-4">
        <Suspense fallback={<ShareSkeleton />}>
          <ShareButtons slug={slug} isTurkish={false} />
        </Suspense>
      </div>
      <div className="xl:w-[1000px] w-[95%] mx-auto flex flex-col gap-4">
        <hr className="w-full mx-auto border-lightGray dark:border-[#2f313a] dark:bg-[#2f313a] bg-lightGray h-0.5 my-8" />
        <Suspense fallback={<BlogCardSkeleton length={3} isPage />}>
          <PreviousNextPosts slug={slug} isTurkish={false} />
        </Suspense>
      </div>
    </main>
  );
}
