/* eslint-disable @next/next/no-img-element */
import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Metadata } from "next";
import { createMetadata } from "@/lib/helpers";
import Zoom from "react-medium-image-zoom";
import { getPhotos } from "@/lib/unsplash";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, Suspense } from "react";
import ViewsSuspense from "@/components/suspenses/Views";
import { PageViews } from "@/components/views/page";
import { PageLikes } from "@/components/likes/post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const texts = messages[locale];

  const title = texts.meta.photosTitle;
  const description = texts.meta.photosDescription;

  return createMetadata({
    title,
    description,
    path: texts.meta.photosSlug,
  });
}

export default async function Photos({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const photoData = await getPhotos();

  const texts = messages[locale];

  return (
    <div
      id="photos"
      className="max-w-[85%] md:max-w-6xl mx-auto my-16 flex flex-col gap-10"
    >
      <header className="flex flex-col gap-2.5">
        <small className="text-gray flex gap-1 items-center text-sm font-medium">
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageLikes
              type="page"
              slug={(locale === "tr" ? "" : "en/") + "photos"}
            />
          </Suspense>
          <Suspense fallback={<ViewsSuspense locale={locale} />}>
            <PageViews
              locale={locale}
              increase
              type="page"
              slug={(locale === "tr" ? "" : "en/") + "photos"}
            />
          </Suspense>
        </small>
        <h1 className="text-4xl text-primary font-bold">{texts.photos}</h1>
      </header>
      <div className="columns-1 sm:columns-3 lg:columns-4 gap-4">
        {photoData.map(
          (data: {
            id: Key | null | undefined;
            urls: { full: string | StaticImport };
            alt_description: string;
          }) => (
            <article
              key={data.id}
              className="masonry-item mb-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Zoom zoomMargin={45}>
                <img
                  src={data.urls.full as string}
                  alt={data.alt_description ?? ""}
                  width={800}
                  height={450}
                  className="rounded-lg mt-1.5"
                />
              </Zoom>
            </article>
          ),
        )}
      </div>
    </div>
  );
}
