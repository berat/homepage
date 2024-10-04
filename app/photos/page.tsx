import Image from "next/image";
import React, { Suspense } from "react";
import Link from "next/link";
// components
import {PhotoContent} from "@/components/contents";
import { CardSlekeletons } from "@/components/skeletons";
// assets
import InstagramIcon from "@/public/icons/instagram-blue.svg";
import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";

export const metadata = {
  title: "Fotoğraflar | Berat Bozkurt",
  description:
    "Berat Bozkurt, photos, frontend developer, photography, blogging",
};

export default function Photos() {
  return (
    <main className={"text-text w-[96%] lg:max-w-[1080px] mx-auto"}>
      <h2 className="w-full lg:w-blog mx-auto text-3xl font-semibold tracking-tight text-black leading-10 mb-4">
        Fotoğraflar
      </h2>
      <p className="w-full lg:w-blog mx-auto">
        Gözüme güzel gelen her görüntüyü deklanşöre basıp ekranda görmeyi
        seviyorum. Anları ölümsüzleştirip arşive alarak zamanı
        durdurabiliyorsun. Ayrıca çekmiş olduğum bu fotoğrafları düzenleyerek
        kendimce daha iyi hale getirmek işin tatlı olan bir kısmı.
        <br /> <br />
        Fotoğraf olarak net bir alanım yok ama genel olarak sokak
        fotoğrafçılığına karşı ilgim var. Eğer çektiğim fotoğraflardaki hikayeyi
        yansıtabiliyorsam o fotoğraf benim için güzel bir fotoğraftır.
        Fotoğrafları aynı zamanda{" "}
        <Link
          href={"#"}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
        >
          <Image
            src={InstagramIcon}
            width={18}
            height={18}
            alt={"x icon"}
            className={"relative top-0.5"}
          />
          <b>hesabımdan</b>
          <Image
            src={ArrowUpRight}
            width={17}
            height={17}
            alt={"open new icon"}
            className={"relative top-[3px] -left-1 -mr-1"}
          />
        </Link>{" "}
        paylaşıyorum. Daha fazla içeriğe orada da ulaşabilirsiniz.
      </p>
      <Suspense fallback={<CardSlekeletons.PhotoCardSkeleton length={12} isPage />}>
        <PhotoContent />
      </Suspense>
      <Link
        href="#"
        target="_blank"
        className="inline-flex justify-center bg-primary hover:bg-blue-600 font-bold text-lg text-white w-full py-4 rounded-lg"
      >
        Daha Fazlasını Gör
      </Link>
    </main>
  );
}
