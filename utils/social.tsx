import React from "react";
import Image from "next/image";

import { NavigationType } from "@/models/navigation";

import {
  BLUESKY,
  GITHUB,
  INSTAGRAM,
  LINKEDIN,
  TWITTER,
} from "@/constants/social";

import BlueSkyIcon from "@/public/icons/bluesky-black.svg";
import GithubIcon from "@/public/icons/github.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import LinkedinIcon from "@/public/icons/linkedin.svg";
import XIcon from "@/public/icons/x.svg";

export enum SocialItem {
  twitter = "#1DA1F2",
  bluesky = "#0285ff",
  github = "#1D2227",
  instagram = "#000000",
  linkedin = "#2567C2",
}

type Props = {
  type: keyof typeof SocialItem;
  className?: string;
};

export const SocialItemToIcon: React.FC<Props> = ({ type, className }) => {
  switch (type) {
    case "twitter":
      return (
        <Image
          src={XIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={"w-5 h-5 " + className}
        />
      );
    case "bluesky":
      return (
        <Image
          src={BlueSkyIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={"w-5 h-5 " + className}
        />
      );
    case "github":
      return (
        <Image
          src={GithubIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={className}
        />
      );
    case "instagram":
      return (
        <Image
          src={InstagramIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={className}
        />
      );
    case "linkedin":
      return (
        <Image
          src={LinkedinIcon}
          width={20}
          height={20}
          alt={"icon"}
          className={className}
        />
      );
    default:
      return null;
  }
};

export const SOCIAL_ITEMS: NavigationType<keyof typeof SocialItem>[] = [
  {
    label: "X",
    value: "twitter",
    english: "X",
    url: TWITTER,
  },
  {
    label: "BlueSky",
    value: "bluesky",
    english: "BlueSky",
    url: BLUESKY,
  },
  {
    label: "Github",
    value: "github",
    english: "Github",
    url: GITHUB,
  },
  {
    label: "Instagram",
    value: "instagram",
    english: "Instagram",
    url: INSTAGRAM,
  },
  {
    label: "LinkedIn",
    english: "LinkedIn",
    value: "linkedin",
    url: LINKEDIN,
  },
];
