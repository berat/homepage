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
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight dark:text-white text-black leading-10 mb-4">
          Posts
        </h2>
      </header>
      <p className="py-2 dark:text-darkText">
        My blog is a blend of <i>technical insights</i> and{" "}
        <i>personal stories</i>, a space where I share pieces of{" "}
        <b>my journey</b>. It’s like a digital scrapbook of my life! In my
        downtime, I dive into <i>indie projects</i>, sharing the creative
        process as I go. Feel free to follow along on my blog or{" "}
        <Link
          href={TWITTER}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
          target="_blank"
        >
          <Image src={XIcon} width={17} height={17} alt={"x icon"} />

          <b>account</b>
          <Image
            src={ArrowUpRight}
            width={17}
            height={17}
            alt={"open new icon"}
            className={"relative top-[3.5px] -left-1 -mr-[1px]"}
          />
        </Link>
        to stay in the loop!
      </p>
      <Suspense fallback={<BlogCardSkeleton length={6} isPage />}>
        <BlogContent isTurkish={false} />
      </Suspense>
    </main>
  );
}
