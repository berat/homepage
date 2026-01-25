import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Metadata } from "next";
import { createMetadata } from "@/lib/helpers";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";
import { getPhotos } from "@/lib/unsplash";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";
import { getViewAndLike } from "@/lib/redis/views";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const photoData = await getPhotos();

  const texts = messages[locale];

  let views = 0;

  try {
    const { data } = await getViewAndLike("page", "page:" +(locale === "tr" ? "" : "en/") + "photos");

    views = (data?.views ?? 0) + 1;
  } catch (e) {
    // build’i kırma
    views = 0;
  }

  return (
    <div
      id="photos"
      className="max-w-[85%] md:max-w-5xl mx-auto my-16 flex flex-col gap-10"
    >

      <header className="flex flex-col gap-2.5">
        <small className="text-gray text-sm font-medium">
          {Number(views).toLocaleString("tr-TR")} {texts.totalViews}
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
                <Image
                  src={data.urls.full}
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
