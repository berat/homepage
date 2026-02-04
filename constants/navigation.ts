import { messages } from "@/lib/i18n";

export type NavigationItem =
    | "about"
    | "blog"
    | "photos"
    | "projects"
    | "tools"
    | "bookmarks";

export interface NavigationType<T = string> {
    label?: string,
    en?: string;
    tr?: string;
    value?: T;
    disabled?: boolean;
    url?: string;
}

export interface NavigationTypes {
    pages: NavigationType<NavigationItem>[];
    projects: NavigationType<NavigationItem>[];
}


export const NAVIGATION_ITEMS: NavigationTypes = {
    pages: [
        {
            en: messages.en.writings,
            tr: messages.tr.writings,
            value: "blog",
            disabled: false,
            url: "/blog",
        },
        {
            en: messages.en.photos,
            tr: messages.tr.photos,
            value: "photos",
            disabled: false,
            url: "/photos",
        },
        {
            en: messages.en.bookmarks,
            tr: messages.tr.bookmarks,
            value: "bookmarks",
            disabled: false,
            url: "/bookmarks",
        },
        {
            en: messages.en.tools,
            tr: messages.tr.tools,
            value: "tools",
            disabled: false,
            url: "/tools",
        },
        // {
        //     label: "Photos",
        //     value: "photos",
        //     disabled: false,
        //     url: "/photos",
        // },
        // {
        //     label: "Tools",
        //     value: "tools",
        //     url: "/tools",
        //     disabled: true,
        // },
        // {
        //     label: "Bookmarks",
        //     value: "bookmarks",
        //     url: "/bookmarks",
        //     disabled: true,
        // }
    ],
    projects: [
        {
            label: "Dreamary",
            url: "https://dreamary.netlify.app"
        },
        {
            label: "Memoque",
            url: "https://memoque.netlify.app"
        },
        {
            label: "Waitlist",
            url: "https://waitlist-landing-page.netlify.app"
        }
    ]
};