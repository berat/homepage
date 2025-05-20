import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { TWITTER } from "@/constants/social";

import ProjectContent from "@/components/contents/project";
import { ProjectCardSkeleton } from "@/components/skeletons/card";

import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";
import XIcon from "@/public/icons/x-blue.svg";

import "moment/locale/tr";

export const revalidate = 86400;
export const metadata = {
  title: "Projects | Berat Bozkurt",
  description:
    "Berat Bozkurt, project, frontend developer, photography, blogging",
};

export default function Blog() {
  return (
    <main
      className={"text-text w-[96%] lg:min-w-[70%] xl:max-w-[800px] mx-auto"}
    >
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black dark:text-white leading-10 mb-4">
          Projects
        </h2>
      </header>
      <p className="py-2 dark:text-darkText">
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
      <Suspense fallback={<ProjectCardSkeleton />}>
        <ProjectContent isTurkish={false} />
      </Suspense>
    </main>
  );
}
