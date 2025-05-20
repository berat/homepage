"use server";

import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getProjectAndMoreProjects } from "@/actions/project";

import { ShareButtons } from "@/components/contents";
import { ProjectDetail } from "@/components/contents/project";
import { PostSkeleton, ShareSkeleton } from "@/components/skeletons";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug: paramsSlug } = await params;

  const { project } = await getProjectAndMoreProjects(paramsSlug, false, false);

  if (!project) {
    notFound();
  }

  const { title, slug, summary, cover } = project;

  const description = summary;

  const ogImage = cover.url;

  return {
    title: title + " | Berat Bozkurt",
    description,
    openGraph: {
      title: title + " | Berat Bozkurt",
      description,
      type: "article",
      url: `https://beratbozkurt.net/projects/${slug}`,
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

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <main className="xl:w-container w-[95%] mx-auto lg:mb-10 my-4 flex flex-col gap-6">
      <Suspense fallback={<PostSkeleton />}>
        <ProjectDetail slug={slug} isTurkish={false} />
      </Suspense>
      <div className="xl:w-container w-[95%] mx-auto flex flex-col gap-4">
        <hr className="w-full mx-auto border-lightGray bg-lightGray dark:border-[#2f313a] dark:bg-[#2f313a] h-0.5 my-8" />
        <Suspense fallback={<ShareSkeleton />}>
          <ShareButtons category="project" slug={slug} isTurkish={false} />
        </Suspense>
      </div>
    </main>
  );
}
