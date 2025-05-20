import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { INSTAGRAM } from "@/constants/social";

import { PhotoContent } from "@/components/contents";
import { CardSlekeletons } from "@/components/skeletons";

import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";
import InstagramIcon from "@/public/icons/instagram-blue.svg";

export const revalidate = 10800;
export const metadata = {
  title: "Fotoğraflar | Berat Bozkurt",
  description:
    "Berat Bozkurt, photos, frontend developer, photography, blogging",
};

export default function Photos() {
  return (
    <main className={"text-text xl:w-[1000px] w-[95%] mx-auto"}>
      <h2 className="w-full mx-auto text-3xl font-semibold tracking-tight text-black dark:text-white leading-10 mb-4">
        Photos
      </h2>
      <p className="w-full mx-auto dark:text-darkText">
        I love capturing every stunning moment by pressing the shutter and
        watching it come alive on the screen. Freezing those moments in an
        archive feels like pausing time itself. Plus, editing those photos to
        make them my own is one of the sweetest parts of the process.
        <br /> <br />
        Photography doesn’t confine me to one style, though I find myself
        captivated by the raw energy of street scenes. A photo becomes
        meaningful when it captures a story that resonates. I share these
        moments on my{" "}
        <Link
          href={INSTAGRAM}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
          target="_blank"
        >
          <Image
            src={InstagramIcon}
            width={18}
            height={18}
            alt={"bluesky icon"}
            className={"relative top-0.5"}
          />
          <b>account</b>
          <Image
            src={ArrowUpRight}
            width={17}
            height={17}
            alt={"open new icon"}
            className={"relative top-[3px] -left-1 -mr-[1px]"}
          />
        </Link>
        {", "}
        where you can explore more of my creations.
      </p>
      <Suspense
        fallback={<CardSlekeletons.PhotoCardSkeleton length={12} isPage />}
      >
        <PhotoContent isTurkish={false} />
      </Suspense>
      <Link
        href="https://unsplash.com/@beratbozkurt0"
        target="_blank"
        className="inline-flex justify-center bg-primary hover:bg-blue-600 font-bold text-lg text-white w-full py-4 rounded-lg"
      >
        See More
      </Link>
    </main>
  );
}
