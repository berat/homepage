"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components";
import classNames from "classnames";
import { KBarProvider } from "kbar";

import { NavigationItemToIcon } from "@/utils/navigation";
import { SocialItemToIcon } from "@/utils/social";

import { MenuPost } from "@/components/base";

import HomeIcon from "@/public/icons/home.svg";

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isDetail =
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/photos") ||
    pathname.startsWith("/projects/");

  const classname = classNames({
    "xl:w-container lg:w-[95%] mx-auto my-4 flex gap-6": true,
    "flex-col lg:my-4": isDetail,
    "lg:flex-row flex-col lg:my-6": !isDetail,
  });

  const actions = [
    {
      id: "homeAction",
      name: "Anasayfa",
      shortcut: ["0"],
      keywords: "anasayfa",
      icon: <Image src={HomeIcon} width={20} height={20} alt="icon" />,
      section: "Menüler",
      perform: () => router.push("/"),
    },
    {
      id: "aboutAction",
      name: "Hakkımda",
      shortcut: ["1"],
      keywords: "hakkımda",
      icon: <NavigationItemToIcon type="about" />,
      section: "Menüler",
      perform: () => router.push("/about"),
    },
    {
      id: "blogAction",
      name: "Yazılar",
      shortcut: ["2"],
      keywords: "yazilar",
      icon: <NavigationItemToIcon type="blog" />,
      section: "Menüler",
      perform: () => router.push("/blog"),
    },
    {
      id: "photosAction",
      name: "Fotoğraflar",
      shortcut: ["3"],
      keywords: "fotoğraflar",
      icon: <NavigationItemToIcon type="photos" />,
      section: "Menüler",
      perform: () => router.push("/photos"),
    },
    {
      id: "projectsAction",
      name: "Projeler",
      shortcut: ["4"],
      keywords: "projeler",
      icon: <NavigationItemToIcon type="projects" />,
      section: "Menüler",
      perform: () => router.push("/projects"),
    },
    {
      id: "bookmarksAction",
      name: "Bookmarks",
      shortcut: ["3"],
      keywords: "bookmarks",
      icon: <NavigationItemToIcon type="bookmarks" />,
      section: "Menüler",
      perform: () => router.push("/bookmarks"),
    },
    {
      id: "twitterAction",
      name: "X",
      keywords: "twitter",
      section: "Sosyal Medya",
      icon: <SocialItemToIcon type="twitter" />,
      perform: () => window.open("https://twitter.com/beratbozkurt0", "_blank"),
    },
    {
      id: "githubAction",
      name: "Github",
      keywords: "github",
      section: "Sosyal Medya",
      icon: <SocialItemToIcon type="github" />,
      perform: () => window.open("https://github.com/berat", "_blank"),
    },
    {
      id: "instagramAction",
      name: "İnstagram",
      keywords: "instagram",
      section: "Sosyal Medya",
      icon: <SocialItemToIcon type="instagram" />,
      perform: () =>
        window.open("https://instagram.com/beratbozkurt0", "_blank"),
    },
    {
      id: "linkedinAction",
      name: "Linkedin",
      keywords: "linkedin",
      section: "Sosyal Medya",
      icon: <SocialItemToIcon type="linkedin" />,
      perform: () =>
        window.open("https://www.linkedin.com/in/beratbozkurt/", "_blank"),
    },
  ];

  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}
    >
      <div className={classname}>
        <MenuPost isDetail={isDetail} />
        {!isDetail && <Sidebar />}
        {children}
      </div>
    </KBarProvider>
  );
};

export default Providers;
