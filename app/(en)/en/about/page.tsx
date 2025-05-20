import { Suspense } from "react";

import { AboutContent } from "@/components/contents";
import { ParagraphSkeleton } from "@/components/skeletons";

export const revalidate = 86400;
export const metadata = {
  title: "About | Berat Bozkurt",
  description:
    "Berat Bozkurt, about, frontend developer, photography, blogging",
};

export default function Blog() {
  return (
    <article className=" w-[96%] xl:max-w-[800px] mx-auto post-content">
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black dark:text-white leading-10 mb-4">
          About
        </h2>
      </header>
      <Suspense fallback={<ParagraphSkeleton />}>
        <AboutContent isTurkish={false} />
      </Suspense>
    </article>
  );
}
