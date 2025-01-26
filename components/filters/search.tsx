"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";

import { useDebounce } from "@/hooks/useDebounce";

import SearchIcon from "@/public/icons/search.svg";

interface Props {
  visible: boolean;
  toggleSearch: (visible: boolean) => void;
  onSearch: (query: string) => void;
}

const Search: React.FC<Props> = ({ visible, toggleSearch, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce'lu search fonksiyonu
  const debouncedSearch = useDebounce(onSearch, 300);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  return (
    <div className="relative flex flex-col items-start">
      <button
        className={`bg-lightGray dark:bg-[#464750] px-3 py-1.5 rounded-2xl `}
        onClick={() => {
          handleSearch({
            target: { value: "" },
          } as React.ChangeEvent<HTMLInputElement>);
          toggleSearch(!visible);
        }}
      >
        <Image
          src={SearchIcon}
          alt={"search"}
          className="dark:invert dark:opacity-80"
          width={18}
          height={18}
        />
      </button>
      {!visible ? null : (
        <div className={"absolute top-12"}>
          <input
            type="text"
            className={"relative bg-lightGray rounded-lg w-[400px] px-2 py-2"}
            placeholder={"Ara"}
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Search);
