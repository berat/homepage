import { Suspense } from "react";

import { BookmarkContent } from "@/components/contents";
import { BookmarkSkeleton } from "@/components/skeletons";

export const revalidate = 10800;
export const metadata = {
  title: "Yer İmleri | Berat Bozkurt",
  description:
    "Berat Bozkurt, bookmarks, frontend developer, photography, blogging",
};

export default async function Bookmarks() {
  return (
    <main
      className={"text-text w-[96%] lg:min-w-[70%] xl:max-w-[800px] mx-auto"}
    >
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black dark:text-white leading-10 mb-4">
          Yer İmleri
        </h2>
      </header>
      <p className="py-2 dark:text-darkText">
        I share web pages I stumble upon while browsing—ones that catch my eye
        or spark my curiosity, without being tied to a specific category. Think
        of this as a <b className="active">discovery hub</b>!
      </p>
      <Suspense fallback={<BookmarkSkeleton length={2} />}>
        <BookmarkContent isTurkish={false} />
      </Suspense>
    </main>
  );
}
