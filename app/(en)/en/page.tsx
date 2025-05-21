import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { INSTAGRAM, TWITTER } from "@/constants/social";

import { SectionTitle } from "@/components/base";
import { HomeContent } from "@/components/contents";
import { CardSlekeletons } from "@/components/skeletons";

import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";
import InstagramIcon from "@/public/icons/instagram-blue.svg";
import XIcon from "@/public/icons/x-blue.svg";

export const revalidate = 10800;

export default async function Home() {
  return (
    <main
      className={
        "text-text dark:text-darkText w-[96%] lg:max-w-[62%] xl:max-w-[800px] mx-auto"
      }
    >
      <p>
        Hey there! {"I'm"} <b>Berat</b>, a frontend developer with over five
        years of experience. Beyond coding, I find joy in{" "}
        <i>writing blog posts</i> and capturing moments through{" "}
        <i>photography</i>. I also love{" "}
        <i>exploring new cities and countries</i>, and there’s nothing quite
        like the serenity of <i>camping</i> under a starry sky.
        <br />
        <br />
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
      <SectionTitle title="RECENT POSTS" path="/en/blog" isTurkish={false}>
        <Suspense fallback={<CardSlekeletons.BlogCardSkeleton length={6} />}>
          <HomeContent.PostSection isTurkish={false} />
        </Suspense>
      </SectionTitle>

      <p className="py-2">
        I love building projects, in my free time. I develop them as{" "}
        <b>open-source</b>
        or <b>indie projects</b>, which lets me collaborate with the community.
        I’m usually inspired by ideas that <i>make life easier</i> or spark some
        fun.
        <br />
        <br />
        Experimenting with new technologies keeps me motivated, and tackling
        challenges sharpens my problem-solving skills. I share{" "}
        <b>my project journey</b> on my{" "}
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
        {", "}
        engaging with followers. The feedback loop helps me refine and improve
        my work.
      </p>
      <SectionTitle title="PROJECTS" path="/en/projects" isTurkish={false}>
        <Suspense fallback={<CardSlekeletons.ProjectCardSkeleton />}>
          <HomeContent.ProjectSection isTurkish={false} />
        </Suspense>
      </SectionTitle>
      <p>
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

      <SectionTitle title="RECENT PHOTOS" path="/en/photos" isTurkish={false}>
        <Suspense fallback={<CardSlekeletons.PhotoCardSkeleton length={6} />}>
          <HomeContent.PhotoSection />
        </Suspense>
      </SectionTitle>
    </main>
  );
}
