"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useKBar } from "kbar";

import Image from "@/components/base/image";

import MenuIcon from "@/public/icons/menu.svg";
import DarkIcon from "@/public/icons/moon.svg";
import SystemIcon from "@/public/icons/server.svg";
import LightIcon from "@/public/icons/sun.svg";

interface Props {
  isDetail?: boolean;
  activeTheme: string;
  isTurkish?: boolean;
  handleThemeChange: (theme: string) => void;
}

const MenuPost: React.FC<Props> = ({
  isDetail = false,
  activeTheme,
  handleThemeChange,
  isTurkish = true,
}) => {
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
        <div className="w-40 flex items-center border-2 border-lightGray dark:border-[#3f3f3f] dark:bg-[#2f313a] rounded-3xl bg-white  divide-x-[1px] dark:divide-[#3f3f3f]">
          <button
            className={`flex-1 justify-items-center h-6 rounded-3xl ${activeTheme === "system" ? "bg-lightGray dark:bg-[#1a1c26]" : "bg-white dark:bg-[#2f313a] "}`}
            onClick={() => handleThemeChange("system")}
          >
            <Image
              src={SystemIcon}
              width={32}
              height={32}
              alt={"icon"}
              className={`w-full h-4 box-content block dark:invert dark:opacity-80`}
            />
          </button>
          <button
            className={`flex-1 justify-items-center h-6 rounded-3xl ${activeTheme === "light" ? "bg-lightGray dark:bg-[#1a1c26]" : "bg-white dark:bg-[#2f313a] "}`}
            onClick={() => handleThemeChange("light")}
          >
            <Image
              src={LightIcon}
              width={32}
              height={32}
              alt={"icon"}
              className={`w-full h-4 box-content block dark:invert dark:opacity-80`}
            />
          </button>
          <button
            className={`flex-1 justify-items-center h-6 rounded-3xl ${activeTheme === "dark" ? "bg-lightGray dark:bg-[#1a1c26]" : "bg-white dark:bg-[#2f313a] "}`}
            onClick={() => handleThemeChange("dark")}
          >
            <Image
              src={DarkIcon}
              width={32}
              height={32}
              alt={"icon"}
              className={`w-full h-4 box-content block dark:invert dark:opacity-80`}
            />
          </button>
        </div>
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
