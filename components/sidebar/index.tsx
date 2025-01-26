"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";

import { NAVIGATION_ITEMS, NavigationItemToIcon } from "@/utils/navigation";
import { SOCIAL_ITEMS, SocialItemToIcon } from "@/utils/social";

import { Logo } from "../base";

import ArrowUpRightIcon from "@/public/icons/arrow-up-right.svg";
import DarkIcon from "@/public/icons/moon.svg";
import SystemIcon from "@/public/icons/server.svg";
import LightIcon from "@/public/icons/sun.svg";

interface SidebarProps {
  activeTheme: string;
  handleThemeChange: (theme: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTheme,
  handleThemeChange,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (
        !event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        !event.metaKey
      ) {
        if (key === "0") {
          router.push("/");
        } else if (key >= "1" && key <= "8") {
          const targetIndex = key - 1;
          const targetItem = NAVIGATION_ITEMS[targetIndex];

          if (targetItem && !targetItem.disabled) {
            router.push("/" + targetItem.value);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside
      className={
        "hidden h-[calc(100vh-4rem)] flex-col gap-8 lg:flex lg:w-[28%] xl:w-[250px] flex-none sticky top-8"
      }
    >
      <Logo />
      <span
        className={"font-medium text-xs text-disable tracking-widest pl-21"}
      >
        SAYFALAR
      </span>
      <nav>
        <ul className={"-mt-6 flex flex-col gap-1.5"}>
          {NAVIGATION_ITEMS.map((item, index) => (
            <li
              key={index}
              className={`${
                item.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <Link
                href={item.disabled ? "/" : item.value}
                className={`flex py-1 px-3 gap-2.5 items-center hover:bg-lightGray hover:dark:bg-[#2f313a] rounded ${
                  pathname.includes(item.value) &&
                  "bg-primary" + " text-white hover:bg-primary "
                } ${
                  item.disabled
                    ? "hover:bg-inherit opacity-30 pointer-events-none"
                    : "cursor-pointer"
                }`}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : 0}
              >
                <NavigationItemToIcon
                  type={item.value}
                  isActive={pathname.includes(item.value)}
                />
                <span
                  className={"w-full text-md dark:text-darkText font-medium"}
                >
                  {item.label}
                </span>
                <small
                  className={`${
                    pathname.includes(item.value)
                      ? "bg-[#4172DE] text-white font-medium"
                      : "dark:bg-[#464750] dark:text-darkText bg-lightGray text-text"
                  } px-1.5 py-1 rounded text-xs flex w-5 justify-center`}
                >
                  {index + 1}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span
        className={"font-medium text-xs text-disable tracking-widest pl-21"}
      >
        SOSYAL MEDYA
      </span>
      <nav>
        <ul className={"-mt-6 flex flex-col gap-1.5"}>
          {SOCIAL_ITEMS.map((item, index) => {
            const className = classNames({
              "hover:bg-[#1DA1F2] rounded": item.value === "twitter",
              "hover:bg-[#000000] rounded": item.value === "instagram",
              "hover:bg-[#1D2227] rounded": item.value === "github",
              "hover:bg-[#2567C2] rounded": item.value === "linkedin",
              "hover:bg-[#0285ff] rounded": item.value === "bluesky",
            });
            return (
              <li key={index} className={className}>
                <Link
                  href={item.url}
                  className={`flex py-1 px-3 gap-2.5 items-center rounded hover:invert dark:hover:invert-0`}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                >
                  <SocialItemToIcon
                    type={item.value}
                    className="dark:invert hover:dark:invert-0 dark:opacity-75 "
                  />
                  <span
                    className={"dark:text-darkText w-full text-md font-medium "}
                  >
                    {item.label}
                  </span>
                  <small
                    className={`px-1.5 py-1 rounded text-xs text-text flex justify-center`}
                  >
                    <Image
                      src={ArrowUpRightIcon}
                      width={24}
                      height={24}
                      alt={"icon"}
                      className={"relative -right-1.5 invert dark:opacity-75"}
                    />
                  </small>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto w-[70%] flex items-center border-2 border-lightGray dark:border-[#3f3f3f] dark:bg-[#2f313a] rounded-3xl bg-white  divide-x-[1px] dark:divide-[#3f3f3f] divide-lightGray ">
        <button
          className={`flex-1 justify-items-center h-8 rounded-3xl ${activeTheme === "system" ? "bg-lightGray dark:bg-[#1a1c26]" : "bg-white dark:bg-[#2f313a] "}`}
          onClick={() => handleThemeChange("system")}
        >
          <Image
            src={SystemIcon}
            width={20}
            height={20}
            alt={"icon"}
            className={`w-full h-5 box-content block dark:invert dark:opacity-80`}
          />
        </button>
        <button
          className={`flex-1 justify-items-center h-8 rounded-3xl ${activeTheme === "light" ? "bg-lightGray dark:bg-[#1a1c26]" : "bg-white dark:bg-[#2f313a] "}`}
          onClick={() => handleThemeChange("light")}
        >
          <Image
            src={LightIcon}
            width={20}
            height={20}
            alt={"icon"}
            className={`w-full h-5 box-content block dark:invert dark:opacity-80`}
          />
        </button>
        <button
          className={`flex-1 justify-items-center h-8 rounded-3xl ${activeTheme === "dark" ? "bg-lightGray dark:bg-[#1a1c26]" : "bg-white dark:bg-[#2f313a] "}`}
          onClick={() => handleThemeChange("dark")}
        >
          <Image
            src={DarkIcon}
            width={20}
            height={20}
            alt={"icon"}
            className={`w-full h-5 box-content block dark:invert dark:opacity-80`}
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
