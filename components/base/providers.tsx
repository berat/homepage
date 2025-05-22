"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components";
import classNames from "classnames";
import { KBarProvider } from "kbar";

import { NavigationItemToIcon } from "@/utils/navigation";
import { SocialItemToIcon } from "@/utils/social";

import { MenuPost } from "@/components/base";

import HomeIcon from "@/public/icons/home.svg";
import DarkIcon from "@/public/icons/moon.svg";
import SystemIcon from "@/public/icons/server.svg";
import LightIcon from "@/public/icons/sun.svg";

type Props = {
  isTurkish?: boolean;
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ isTurkish = true, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState<string>("system");

  const isDetail =
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/en/blog/") ||
    pathname.startsWith("/photos") ||
    pathname.startsWith("/en/photos") ||
    pathname.startsWith("/en/projects/") ||
    pathname.startsWith("/projects/");

  const classname = classNames({
    "xl:w-container lg:w-[95%] mx-auto my-4 flex gap-6": true,
    "flex-col lg:my-4": isDetail,
    "lg:flex-row flex-col lg:my-6": !isDetail,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "system" || !savedTheme) {
      applySystemTheme();
      setActiveTheme("system");
    } else {
      applyTheme(savedTheme);
      setActiveTheme(savedTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (!savedTheme || savedTheme === "system") {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const actions = [
    {
      id: "homeAction",
      name: isTurkish ? "Anasayfa" : "Homepage",
      shortcut: ["0"],
      keywords: isTurkish ? "anasayfa" : "homepage",
      icon: (
        <Image
          src={HomeIcon}
          width={20}
          height={20}
          alt="icon"
          className="dark:invert dark:opacity-80"
        />
      ),
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/"),
    },
    {
      id: "aboutAction",
      name: isTurkish ? "Hakkımda" : "About",
      shortcut: ["1"],
      keywords: isTurkish ? "hakkımda" : "about",
      icon: <NavigationItemToIcon type="about" />,
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/about"),
    },
    {
      id: "blogAction",
      name: isTurkish ? "Yazılar" : "Posts",
      shortcut: ["2"],
      keywords: isTurkish ? "yazilar" : "posts",
      icon: <NavigationItemToIcon type="blog" />,
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/blog"),
    },
    {
      id: "photosAction",
      name: isTurkish ? "Fotoğraflar" : "Photos",
      shortcut: ["3"],
      keywords: isTurkish ? "fotoğraflar" : "photos",
      icon: <NavigationItemToIcon type="photos" />,
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/photos"),
    },
    {
      id: "projectsAction",
      name: isTurkish ? "Projeler" : "Projects",
      shortcut: ["4"],
      keywords: isTurkish ? "projeler" : "projects",
      icon: <NavigationItemToIcon type="projects" />,
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/projects"),
    },
    {
      id: "toolsAction",
      name: isTurkish ? "Araçlar" : "Tools",
      shortcut: ["5"],
      keywords: isTurkish ? "araçlar" : "tools",
      icon: <NavigationItemToIcon type="tools" />,
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/tools"),
    },
    {
      id: "bookmarksAction",
      name: isTurkish ? "Yer İmleri" : "Bookmarks",
      shortcut: ["6"],
      keywords: isTurkish ? "bookmarks" : "bookmarks",
      icon: <NavigationItemToIcon type="bookmarks" />,
      section: isTurkish ? "Menüler" : "Menus",
      perform: () => router.push("/bookmarks"),
    },
    {
      id: "twitterAction",
      name: "X",
      keywords: "twitter",
      section: isTurkish ? "Sosyal Medya" : "Social Media",
      icon: (
        <SocialItemToIcon
          type="twitter"
          className="dark:invert dark:opacity-80"
        />
      ),
      perform: () => window.open("https://twitter.com/beratbozkurt0", "_blank"),
    },
    {
      id: "githubAction",
      name: "Github",
      keywords: "github",
      section: isTurkish ? "Sosyal Medya" : "Social Media",
      icon: (
        <SocialItemToIcon
          type="github"
          className="dark:invert dark:opacity-80"
        />
      ),
      perform: () => window.open("https://github.com/berat", "_blank"),
    },
    {
      id: "instagramAction",
      name: "İnstagram",
      keywords: "instagram",
      section: isTurkish ? "Sosyal Medya" : "Social Media",
      icon: (
        <SocialItemToIcon
          type="instagram"
          className="dark:invert dark:opacity-80"
        />
      ),
      perform: () =>
        window.open("https://instagram.com/beratbozkurt0", "_blank"),
    },
    {
      id: "linkedinAction",
      name: "Linkedin",
      keywords: "linkedin",
      section: isTurkish ? "Sosyal Medya" : "Social Media",
      icon: (
        <SocialItemToIcon
          type="linkedin"
          className="dark:invert dark:opacity-80"
        />
      ),
      perform: () =>
        window.open("https://www.linkedin.com/in/beratbozkurt/", "_blank"),
    },
    {
      id: "systemMode",
      name: isTurkish ? "Sistem" : "System",
      keywords: "system",
      section: isTurkish ? "Görünüm" : "Appearance",
      icon: (
        <Image
          src={SystemIcon}
          width={21}
          height={21}
          alt={"icon"}
          className={`dark:invert dark:opacity-80`}
        />
      ),
      perform: () => handleThemeChange("system"),
    },
    {
      id: "lightMode",
      name: isTurkish ? "Aydınlık" : "Light",
      keywords: "light",
      section: isTurkish ? "Görünüm" : "Appearance",
      icon: (
        <Image
          src={LightIcon}
          width={21}
          height={21}
          alt={"icon"}
          className={`dark:invert dark:opacity-80`}
        />
      ),
      perform: () => handleThemeChange("light"),
    },
    {
      id: "darkMode",
      name: isTurkish ? "Karanlık" : "Dark",
      keywords: "dark",
      section: isTurkish ? "Görünüm" : "Appearance",
      icon: (
        <Image
          src={DarkIcon}
          width={21}
          height={21}
          alt={"icon"}
          className={`dark:invert dark:opacity-80`}
        />
      ),
      perform: () => handleThemeChange("dark"),
    },
  ];

  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions.filter((item) =>
        activeTheme === "light"
          ? item.id !== "lightMode"
          : activeTheme === "dark"
            ? item.id !== "darkMode"
            : activeTheme === "system"
              ? item.id !== "systemMode"
              : item,
      )}
    >
      <div className={classname}>
        <MenuPost isDetail={isDetail} isTurkish={isTurkish} />
        {!isDetail && (
          <Sidebar
            handleThemeChange={handleThemeChange}
            activeTheme={activeTheme}
            isTurkish={isTurkish}
          />
        )}
        {children}
      </div>
    </KBarProvider>
  );
};

export default Providers;
