import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
// components
import { HomeContent } from "@/components/contents";
import { CardSlekeletons } from "@/components/skeletons";
import { SectionTitle } from "@/components/base";
// assets
import XIcon from "@/public/icons/x-blue.svg";
import InstagramIcon from "@/public/icons/instagram-blue.svg";
import ArrowUpRight from "@/public/icons/arrow-up-right-blue.svg";

export default function Home() {
  return (
    <main
      className={"text-text w-[96%] lg:max-w-[62%] xl:max-w-[800px] mx-auto"}
    >
      <p>
        Merhaba! Ben <b>Berat</b>. 5 yıldan fazla frontend developer olarak
        çalışıyorum. Ayrıcı <i>blog yazmaktan</i> ve <i>fotoğraf çekmekten</i>{" "}
        keyif alıyorum. Bunların yanında yeni <i>şehirler/ülkeler gezmek</i> ve{" "}
        <i>kamp yapmayı</i> da ekleyebilirim.
        <br />
        <br />
        Blogumda teknik yazılarla birlikte kişisel yazılarımı paylaşıp anı
        bırakıyorum. Aslında burada hayatımın bir parçasını bulabilirsin. Boş
        kalan zamanlarımda indie projelerime ağırlık verip bunu açık bir şekilde
        paylaşıyorum. Hem blogumda hem de{" "}
        <Link
          href={"#"}
          className={
            "fill-primary text-primary inline-flex items-baseline gap-1"
          }
        >
          <Image src={XIcon} width={17} height={17} alt={"x icon"} className="w-4 h-4" />
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
      <SectionTitle title="SON YAZILAR" path="/blog">
        <Suspense fallback={<CardSlekeletons.BlogCardSkeleton length={6} />}>
          <HomeContent.PostSection />
        </Suspense>
      </SectionTitle>
      <p>
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

      <SectionTitle title="SON FOTOĞRAFLAR" path="/photos">
        <Suspense fallback={<CardSlekeletons.PhotoCardSkeleton length={6} />}>
          <HomeContent.PhotoSection />
        </Suspense>
      </SectionTitle>
    </main>
  );
}
