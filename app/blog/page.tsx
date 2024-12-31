import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { TWITTER } from "@/constants/social";

import { BlogContent } from "@/components/contents";
import { BlogCardSkeleton } from "@/components/skeletons/card";

import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";
import XIcon from "@/public/icons/x-blue.svg";

import "moment/locale/tr";

export const revalidate = 10800;
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
          href={TWITTER}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
          target="_blank"
        >
          <Image src={XIcon} width={17} height={17} alt={"x icon"} />
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
