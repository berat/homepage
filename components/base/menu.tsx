"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useKBar } from "kbar";

import Image from "@/components/base/image";

import MenuIcon from "@/public/icons/menu.svg";

interface Props {
  isDetail?: boolean;
  isTurkish?: boolean;
}

const MenuPost: React.FC<Props> = ({ isDetail = false, isTurkish = true }) => {
  const { query } = useKBar();

  return (
    <div
      className={`${
        isDetail ? "lg:w-full lg:px-10" : "lg:hidden "
      } w-[96%] lg:py-3 flex gap-2.5 px-1 mx-auto items-center justify-between bg-white dark:bg-darkBlack bg-opacity-30  backdrop-filter backdrop-blur-lg`}
    >
      <div className="flex items-center gap-6">
        <Link
          href={isTurkish ? "/" : "/en"}
          className="flex items-center gap-2 hover:bg-lightGray px-2 py-2 dark:hover:bg-[#2f313a] rounded"
        >
          <Image
            src={"/berat-bozkurt.png"}
            rounded="full"
            alt={"Berat Bozkurt"}
            width={32}
            height={32}
          />
          <h2 className="font-semibold text-text dark:text-darkText">
            Berat Bozkurt
          </h2>
        </Link>
      </div>
      <button onClick={query.toggle} className="flex items-center gap-2">
        <NextImage
          src={MenuIcon}
          alt="menu"
          className="dark:invert dark:opacity-80"
          width={21}
          height={21}
        />
        <span className="font-semibold text-base dark:text-darkText text-text">
          Menu
        </span>
      </button>
    </div>
  );
};

export default MenuPost;
