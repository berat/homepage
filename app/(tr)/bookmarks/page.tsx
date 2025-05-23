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
        İnternette gezinirken öğrendiğim, hoşuma giden, ilgimi çeken; belli bir
        kategorisi olmayan web sayfalarını burada paylaşıyorum. Burayı bir{" "}
        <b className="active">keşif</b> alanı olarak da düşenebilirsiniz.
      </p>
      <Suspense fallback={<BookmarkSkeleton length={2} />}>
        <BookmarkContent />
      </Suspense>
    </main>
  );
}
