"use client";

import Image from "next/image";
import React from "react";
// assets
import SearchIcon from "@/public/icons/search.svg";

interface Props {
  hideSearch: boolean;
  toggleSearch: () => void;
}

const Search: React.FC<Props> = ({ hideSearch, toggleSearch }) => {
  return (
    <>
      <button
        className={`bg-gray rounded-lg px-2 py-2 ${
          !hideSearch ? "mb-12" : "mb-0"
        }`}
        onClick={toggleSearch}
      >
        <Image src={SearchIcon} alt={"search"} width={18} height={18} />
      </button>
      {hideSearch ? null : (
        <div className={"absolute top-[50px] flex gap-2"}>
          <input
            type="text"
            className={"relative bg-gray rounded-lg w-[300px] px-2 py-2"}
            placeholder={"Ara"}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(Search);
