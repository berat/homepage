import { Suspense } from "react";
// components
import { AboutContent } from "@/components/contents";
import { ParagraphSkeleton } from "@/components/skeletons";

export const metadata = {
  title: "Hakkımda | Berat Bozkurt",
  description:
    "Berat Bozkurt, hakkımda, frontend developer, photography, blogging",
};

export default function Blog() {
  return (
    <article className=" w-[96%] xl:max-w-[800px] mx-auto post-content">
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black leading-10 mb-4">
          Hakkımda
        </h2>
      </header>
      <Suspense fallback={<ParagraphSkeleton />}>
        <AboutContent />
      </Suspense>
    </article>
  );
}
