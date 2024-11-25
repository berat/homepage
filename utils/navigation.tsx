import React from "react";
import Image from "next/image";
// models
import { NavigationType } from "@/models/navigation";
// assets
import AboutIcon from "@/public/icons/user.svg";
import BlogIcon from "@/public/icons/blog.svg";
import PhotoIcon from "@/public/icons/camera.svg";
import ProjectIcon from "@/public/icons/project.svg";
import ToolsIcon from "@/public/icons/tool.svg";
import BookmarkIcon from "@/public/icons/bookmark.svg";
import SetupIcon from "@/public/icons/setup.svg";

export type NavigationItem =
  | "about"
  | "blog"
  | "photos"
  | "projects"
  | "tools"
  | "bookmarks"
  | "setup";

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
          className={isActive ? "invert" : ""}
        />
      );
    case "blog":
      return (
        <Image
          src={BlogIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : ""}
        />
      );
    case "photos":
      return (
        <Image
          src={PhotoIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : ""}
        />
      );
    case "projects":
      return (
        <Image
          src={ProjectIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : ""}
        />
      );
    case "tools":
      return (
        <Image
          src={ToolsIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : ""}
        />
      );
    case "bookmarks":
      return (
        <Image
          src={BookmarkIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : ""}
        />
      );
    case "setup":
      return (
        <Image
          src={SetupIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={isActive ? "invert" : ""}
        />
      );
    default:
      return null;
  }
};

export const NAVIGATION_ITEMS: NavigationType<NavigationItem>[] = [
  {
    label: "Hakkımda",
    value: "about",
    disabled: false,
  },
  {
    label: "Yazılar",
    value: "blog",
    disabled: false,
  },
  {
    label: "Fotoğraflar",
    value: "photos",
    disabled: false,
  },
  {
    label: "Projeler",
    value: "projects",
    disabled: false,
  },
  {
    label: "Araçlar",
    value: "tools",
    disabled: true,
  },
  {
    label: "Bookmarks",
    value: "bookmarks",
    disabled: false,
  },
  {
    label: "Setup",
    value: "setup",
    disabled: true,
  },
];
