"use client";
import Link from "next/link";
// components
import Image from "../base/image";
// assets
import RightArrowIcon from "@/public/icons/arrow-right.svg";

interface Props {
  title: string;
  path: string;
  children: React.ReactNode;
}

const SectionTitle: React.FC<Props> = ({
  title,
  path,
  children,
}) => {
  return (
    <section className={"my-9"}>
      <header className={"w-full mb-3 flex justify-between items-center"}>
        <span
          className={"font-medium text-xs text-disable tracking-widest pl-21"}
        >
          {title}
        </span>
        <Link
          href={path}
          className={
            "flex items-center gap-1 text-xs font-medium text-text hover:text-primary"
          }
        >
          HEPSİNİ GÖR{" "}
          <Image
            src={RightArrowIcon}
            alt={"hepsini gör"}
            width={14}
            height={14}
          />
        </Link>
      </header>
      {children}
    </section>
  );
};

export default SectionTitle;
