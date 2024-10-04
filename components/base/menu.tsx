"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useKBar } from "kbar";
// components
import Image from "./image";
// assets
import MenuIcon from "@/public/icons/menu.svg";

interface Props {
  isDetail?: boolean;
}

const MenuPost: React.FC<Props> = ({ isDetail = false }) => {
  const { query } = useKBar();

  return (
    <div
      className={`${
        isDetail ? "lg:w-full lg:px-10" : "lg:hidden "
      } w-[96%] lg:py-3 flex gap-2.5 px-1 mx-auto items-center justify-between bg-white bg-opacity-30  backdrop-filter backdrop-blur-lg`}
    >
      <Link
        href="/"
        className="flex items-center gap-2 hover:bg-gray px-2 py-2 rounded"
      >
        <Image
          src={"/berat-bozkurt.png"}
          rounded="full"
          alt={"Berat Bozkurt"}
          width={32}
          height={32}
        />
        <h2 className="font-semibold text-text">Berat Bozkurt</h2>
      </Link>
      <button onClick={query.toggle} className="flex items-center gap-2">
        <NextImage src={MenuIcon} alt="menu" width={21} height={21} />
        <span className="font-semibold text-base text-text">Menu</span>
      </button>
    </div>
  );
};

export default MenuPost;
