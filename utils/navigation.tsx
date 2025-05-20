import React from "react";
import Image from "next/image";

import { NavigationType } from "@/models/navigation";

import BlogIcon from "@/public/icons/blog.svg";
import BookmarkIcon from "@/public/icons/bookmark.svg";
import PhotoIcon from "@/public/icons/camera.svg";
import ProjectIcon from "@/public/icons/project.svg";
import SetupIcon from "@/public/icons/setup.svg";
import AboutIcon from "@/public/icons/user.svg";

export type NavigationItem =
  | "about"
  | "blog"
  | "photos"
  | "projects"
  | "tools"
  | "bookmarks";

type Props = {
  type: NavigationItem;
  isActive?: boolean;
};

export const NavigationItemToIcon: React.FC<Props> = ({ type, isActive }) => {
  switch (type) {
    case "about":
      return (
        <Image
          src={AboutIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : "dark:invert dark:opacity-75"}
        />
      );
    case "blog":
      return (
        <Image
          src={BlogIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : "dark:invert dark:opacity-75"}
        />
      );
    case "photos":
      return (
        <Image
          src={PhotoIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : "dark:invert dark:opacity-75"}
        />
      );
    case "projects":
      return (
        <Image
          src={ProjectIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : "dark:invert dark:opacity-75"}
        />
      );
    case "tools":
      return (
        <Image
          src={SetupIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : "dark:invert dark:opacity-75"}
        />
      );
    case "bookmarks":
      return (
        <Image
          src={BookmarkIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : "dark:invert dark:opacity-75"}
        />
      );
    default:
      return null;
  }
};

export const NAVIGATION_ITEMS: NavigationType<NavigationItem>[] = [
  {
    label: "Hakkımda",
    english: "About",
    value: "about",
    disabled: false,
  },
  {
    label: "Yazılar",
    english: "Posts",
    value: "blog",
    disabled: false,
  },
  {
    label: "Fotoğraflar",
    english: "Photos",
    value: "photos",
    disabled: false,
  },
  {
    label: "Projeler",
    english: "Projects",
    value: "projects",
    disabled: false,
  },
  {
    label: "Araçlar",
    english: "Tools",
    value: "tools",
    disabled: false,
  },
  {
    label: "Yer İmleri",
    english: "Bookmarks",
    value: "bookmarks",
    disabled: false,
  },
];
