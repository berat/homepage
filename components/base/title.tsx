"use client";

import Link from "next/link";

import Image from "@/components/base//image";

import RightArrowIcon from "@/public/icons/arrow-right.svg";

interface Props {
  title: string;
  path: string;
  isTurkish?: boolean;
  children: React.ReactNode;
}

const SectionTitle: React.FC<Props> = ({
  title,
  path,
  isTurkish = true,
  children,
}) => {
  return (
    <section className={"my-9"}>
      <header className={"w-full mb-3 flex justify-between items-center"}>
        <span
          className={
            "font-medium text-xs text-disable dark:text-darkDisable tracking-widest pl-21"
          }
        >
          {title}
        </span>
        <Link
          href={path}
          className={
            "flex items-center gap-1 text-xs font-medium text-text dark:text-darkDisable hover:text-primary"
          }
        >
          {isTurkish ? "HEPSİNİ GÖR" : "SEE ALL"}{" "}
          <Image
            src={RightArrowIcon}
            alt={"hepsini gör"}
            width={14}
            className="dark:invert"
            height={14}
          />
        </Link>
      </header>
      {children}
    </section>
  );
};

export default SectionTitle;
