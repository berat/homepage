import React from "react";
import Image from "next/image";
// models
import { NavigationType } from "@/models/navigation";
// assets
import XIcon from "@/public/icons/x.svg";
import GithubIcon from "@/public/icons/github.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import LinkedinIcon from "@/public/icons/linkedin.svg";

export enum SocialItem {
  twitter = "#1DA1F2",
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
    url: "https://twitter.com/beratbozkurt0",
  },
  {
    label: "Github",
    value: "github",
    url: "https://github.com/berat",
  },
  {
    label: "Instagram",
    value: "instagram",
    url: "https://www.instagram.com/beratbozkurt0/",
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    url: "https://www.linkedin.com/in/beratbozkurt/",
  },
];
