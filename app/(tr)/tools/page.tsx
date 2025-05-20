import { Suspense } from "react";

import { ToolsContent } from "@/components/contents";
import { ParagraphSkeleton } from "@/components/skeletons";

export const revalidate = 86400;
export const metadata = {
  title: "Araçlar | Berat Bozkurt",
  description:
    "Berat Bozkurt, araçlar, tools, frontend developer, photography, blogging",
};

export default function Tools() {
  return (
    <article className=" w-[96%] xl:max-w-[800px] mx-auto post-content">
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black dark:text-white leading-10 mb-4">
          Araçlar
        </h2>
      </header>
      <Suspense fallback={<ParagraphSkeleton />}>
        <ToolsContent />
      </Suspense>
    </article>
  );
}
