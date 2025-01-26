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

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState<string>("system");

  const isDetail =
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/photos") ||
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
      name: "Anasayfa",
      shortcut: ["0"],
      keywords: "anasayfa",
      icon: (
        <Image
          src={HomeIcon}
          width={20}
          height={20}
          alt="icon"
          className="dark:invert dark:opacity-80"
        />
      ),
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
      id: "toolsAction",
      name: "Araçlar",
      shortcut: ["5"],
      keywords: "bookmarks",
      icon: <NavigationItemToIcon type="tools" />,
      section: "Menüler",
      perform: () => router.push("/tools"),
    },
    {
      id: "bookmarksAction",
      name: "Yer İmleri",
      shortcut: ["6"],
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
      section: "Sosyal Medya",
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
      section: "Sosyal Medya",
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
      section: "Sosyal Medya",
      icon: (
        <SocialItemToIcon
          type="linkedin"
          className="dark:invert dark:opacity-80"
        />
      ),
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
        <MenuPost
          isDetail={isDetail}
          handleThemeChange={handleThemeChange}
          activeTheme={activeTheme}
        />
        {!isDetail && (
          <Sidebar
            handleThemeChange={handleThemeChange}
            activeTheme={activeTheme}
          />
        )}
        {children}
      </div>
    </KBarProvider>
  );
};

export default Providers;
