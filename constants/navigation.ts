export type NavigationItem =
    | "about"
    | "blog"
    | "photos"
    | "projects"
    | "tools"
    | "bookmarks";

export interface NavigationType<T = string> {
    label: string;
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
            label: "Writings",
            value: "blog",
            disabled: false,
            url: "/blog",
        },
        {
            label: "Photos",
            value: "photos",
            disabled: false,
            url: "/photos",
        },
        {
            label: "Tools",
            value: "tools",
            url: "/tools",
            disabled: true,
        },
        {
            label: "Bookmarks",
            value: "bookmarks",
            url: "/bookmarks",
            disabled: true,
        }
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