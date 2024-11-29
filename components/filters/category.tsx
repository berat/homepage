"use client";

import React from "react";
import Image from "next/image";

import DownIcon from "@/public/icons/down.svg";

interface Props {
  data: string[];
  handleClickCategory: (category: string) => void;
  toggleCategory: () => void;
  hideOptions: boolean;
  selectedCategory: string[];
}

const defaultCategoryStyle =
  "bg-lightGray px-3 py-1 rounded-2xl text-sm font-medium";

const Category: React.FC<Props> = ({
  data,
  handleClickCategory,
  selectedCategory,
  hideOptions,
  toggleCategory,
}) => {
  return (
    <>
      <button
        className={`flex items-center gap-1 ${
          selectedCategory.length > 0
            ? "bg-primary text-white"
            : "bg-lightGray text-black"
        } rounded-lg px-5 py-2 ${!hideOptions ? "mb-12" : "mb-0"}`}
        onClick={toggleCategory}
      >
        <span className={"text-sm font-medium"}>Kategoriler</span>
        <Image
          src={DownIcon}
          alt={"kategori ara"}
          width={18}
          height={18}
          className={`${selectedCategory.length > 0 ? "invert" : "invert-0"}`}
        />
      </button>
      {hideOptions ? null : (
        <div className={"absolute top-[56px] flex gap-2"}>
          {data.map((category, index) => (
            <button
              key={index}
              className={`${defaultCategoryStyle} ${
                selectedCategory.includes(category)
                  ? "bg-primary text-white"
                  : "bg-lightGray"
              }`}
              onClick={() => handleClickCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default React.memo(Category);
