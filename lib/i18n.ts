import { SITE_CONFIG } from "@/constants/general";

export type Locale = "tr" | "en";

export const messages = {
    tr: {
        projects: "Projeler",
        works: "Tecrübe",
        photos: "Fotoğraflar",
        writings: "Blog",
        bookmarks: "Yer İmleri",
        views: "görüntülenme",
        totalViews: "toplam görüntülenme",
        sum: (count: number) => `Toplam  ${count} yazı`,
        readNext: "Sonraki Yazılar",
        about: () => `
        Türkiye'de lead frontend developer olarak çalışıyorum. Şu anda mobil uygulamalar geliştiriyorum.`,
        pages: "Sayfalar",
        homepage: "Anasayfa",
        likes: "beğeni",

        captions: {
            writings: "Yazdığım notlar ve diğer içerikler",
            photos: "Fark ettiğim anlar, mekânlar ve küçük detaylar",
            bookmarks: "Notlar, bağlantılar ve ilham kıvılcımları",
            dreamary: "Yapay zeka detekli rüya günlüğü ve analizi",
            memoque: "Flash kartlarla kelime öğrenme",
        },

        dates: {
            osf: "Ara 2021 - Şu An",
            bigdata: "Eyl 2020 - Ara 2021",
            davetiyem: "Oca 2019 - Eyl 2020"
        },

        meta: {
            blogTitle: "Blog | " + SITE_CONFIG.name,
            blogDescription: "Düşünceler, notlar ve üretim üzerine. Yazdığım notlar ve diğer içerikler.",
            blogSlug: "/tr/blog",

            photosTitle: "Fotoğraflar | " + SITE_CONFIG.name,
            photosDescription: "Fark ettiğim anlar, mekânlar ve küçük detaylar.",
            photosSlug: "/tr/photos",

            bookmarksTitle: "Yer İmleri | " + SITE_CONFIG.name,
            bookmarksDescription: "Notlar, bağlantılar ve ilham kıvılcımları",
            bookmarksSlug: "/tr/bookmarks",

            homeDescription: "Türkiye'de yaşayan bir frontend developer. Şu anda mobil uygulamalar geliştiriyorum.",
        },

        suspense: {
            views: "görüntülenme yükleniyor...",
            likes: "beğenmeler yükleniyor..."
        }
    },
    en: {
        projects: "Projects",
        works: "Works",
        photos: "Photos",
        writings: "Writings",
        bookmarks: "Bookmarks",
        views: "views",
        totalViews: "total views",
        sum: (count: number) => `Total ${count} posts`,
        readNext: "Read Next",
        about: () => `
        I’m a lead frontend developer living in Türkiye. I’m currently making mobile applications.`,
        pages: "Pages",
        homepage: "Homepage",
        likes: "likes",

        captions: {
            writings: "Notes and other things which are I wrote",
            photos: "Moments, places, and small details I noticed",
            bookmarks: "Notes, links, and sparks of inspiration",
            dreamary: "AI dream journal with analysis",
            memoque: "Learn vocabulary with flashcards"
        },

        dates: {
            osf: "Dec 2021 - Current",
            bigdata: "Sep 2020 - Nov 2021",
            davetiyem: "Jan 2019 - Sep 2020"
        },

        meta: {
            blogTitle: "Writings | " + SITE_CONFIG.name,
            blogDescription: "Thoughts on notes, building, and creation. Essays and other writings.",
            blogSlug: "/en/blog",

            photosTitle: "Photos | " + SITE_CONFIG.name,
            photosDescription: "Moments, places, and small details I noticed.",
            photosSlug: "/en/photos",

            bookmarksTitle: "Bookmarks | " + SITE_CONFIG.name,
            bookmarksDescription: "Notes, links, and sparks of inspiration",
            bookmarksSlug: "/en/bookmarks",


            homeDescription: SITE_CONFIG.description,
        },

        suspense: {
            views: "loading views...",
            likes: "loading likes..."
        }
    },
} as const;

export function t<L extends Locale>(
    locale: L,
    key: (typeof messages)[L],
) {
    return key;
}
