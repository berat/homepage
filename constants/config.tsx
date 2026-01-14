import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons";
import { GITHUB, INSTAGRAM, LINKEDIN, TWITTER } from "./social";

export interface NavigationType {
  label: string;
  value: unknown;
  english: string;
  disabled?: boolean;
  url?: string;
  icon: React.ReactNode;
}

export const SOCIAL_ITEMS: NavigationType[] = [
  {
    label: "X",
    value: "twitter",
    english: "X",
    icon: <XIcon />,
    url: TWITTER,
  },
  {
    label: "Instagram",
    value: "instagram",
    english: "Instagram",
    icon: <InstagramIcon />,
    url: INSTAGRAM,
  },
  {
    label: "Github",
    value: "github",
    english: "Github",
    icon: <GitHubIcon />,
    url: GITHUB,
  },
  {
    label: "LinkedIn",
    english: "LinkedIn",
    value: "linkedin",
    icon: <LinkedInIcon />,
    url: LINKEDIN,
  },
];
