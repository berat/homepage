export const SITE_URL = "https://beratbozkurt.net";

export const SITE_CONFIG = {
    name: "Berat Bozkurt",
    title: "Berat Bozkurt | Frontend Developer, Indie Hacker",
    description:
        "Frontend developer living in Turkey. Currently building mobile apps.",
    url: "https://beratbozkurt.net",
    author: {
        name: "Berat Bozkurt",
        twitter: "@beratbuilds",
        twitterUrl: "https://x.com/beratbuilds",
        github: "https://github.com/berat",
    },
    social: {
        twitter: {
            handle: "@beratbuilds",
            cardType: "summary_large_image" as const,
        },
    },
    ogImage: {
        width: 1200,
        height: 630,
    },
} as const;