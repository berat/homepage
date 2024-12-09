import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { BLUESKY } from "@/constants/social";

import ProjectContent from "@/components/contents/project";
import { ProjectCardSkeleton } from "@/components/skeletons/card";

import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";
import BlueSkyIcon from "@/public/icons/bluesky.svg";

import "moment/locale/tr";

export const revalidate = 86400;
export const metadata = {
  title: "Projeler | Berat Bozkurt",
  description:
    "Berat Bozkurt, project, frontend developer, photography, blogging",
};

export default function Blog() {
  return (
    <main
      className={"text-text w-[96%] lg:min-w-[70%] xl:max-w-[800px] mx-auto"}
    >
      <header className="w-full xl:w-blog mx-auto pb-4">
        <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black leading-10 mb-4">
          Projeler
        </h2>
      </header>
      <p className="py-2">
        Boş zamanlarımda proje geliştirmekten keyif alıyorum. Bu projelerin bir
        kısmını open-source ile geliştiriyorum. Bir kısmını ise indie-project
        ile geliştirip pasif gelir elde etmeyi planlıyorum. Bu proje süreçlerini
        <Link
          href={BLUESKY}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
          target="_blank"
        >
          <Image
            src={BlueSkyIcon}
            width={19}
            height={19}
            alt={"bluesky icon"}
            className="relative top-[3px] -right-0.5"
          />
          <b>hesabım</b>
          <Image
            src={ArrowUpRight}
            width={17}
            height={17}
            alt={"open new icon"}
            className={"relative top-[3px] -left-1 -mr-1"}
          />
        </Link>{" "}
        üzerinden açık bir şekilde paylaşarak takipçilerle geliştirmeyi
        seviyorum.
      </p>
      <Suspense fallback={<ProjectCardSkeleton />}>
        <ProjectContent />
      </Suspense>
    </main>
  );
}
