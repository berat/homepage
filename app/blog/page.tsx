import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
// constants
import { BLUESKY } from "@/constants/social";
// components
import { BlogContent } from "@/components/contents";
import { BlogCardSkeleton } from "@/components/skeletons/card";
// assets
import BlueSkyIcon from "@/public/icons/bluesky.svg";
import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";
import "moment/locale/tr";

export const metadata = {
  title: "Blog | Berat Bozkurt",
  description: "Berat Bozkurt, blog, frontend developer, photography, blogging",
};

export default function Blog() {
  return (
    <main
      className={"text-text w-[96%] lg:min-w-[70%] xl:max-w-[800px] mx-auto"}
    >
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black leading-10 mb-4">
          Yazılar
        </h2>
      </header>
      <p className="py-2">
        Blogumda teknik yazılarla birlikte kişisel yazılarımı paylaşıp anı
        bırakıyorum. Aslında burada hayatımın bir parçasını bulabilirsin. Boş
        kalan zamanlarımda indie projelerime ağırlık verip bunu açık bir şekilde
        paylaşıyorum. Hem blogumda hem de{" "}
        <Link
          href={BLUESKY}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
        >
          <Image
            src={BlueSkyIcon}
            width={19}
            height={19}
            alt={"bluesky icon"}
            className="relative top-[3px] -right-0.5"
          />
          <b>hesabımdan</b>
          <Image
            src={ArrowUpRight}
            width={17}
            height={17}
            alt={"open new icon"}
            className={"relative top-[3px] -left-1 -mr-1"}
          />
        </Link>
        takip ederek süreçlerden haberdar olabilirsin.
      </p>
      <Suspense fallback={<BlogCardSkeleton length={6} isPage />}>
        <BlogContent />
      </Suspense>
    </main>
  );
}
