import { SITE_CONFIG } from "@/constants/general";
import { Locale } from "./i18n";
import { Metadata } from "next";

export function getRandomPosts<T>(posts: T[], count: number): T[] {
  const shuffled = [...posts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    // youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // youtube.com/embed/VIDEO_ID
    // youtube.com/shorts/VIDEO_ID
    const match = parsedUrl.pathname.match(
      /\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/
    );

    return match ? match[2] : null;
  } catch {
    return null;
  }
}

export function getTweetId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Örn:
    // /berat/status/1731234567890123456
    // /berat/statuses/1731234567890123456
    // /i/web/status/1731234567890123456
    const match = parsed.pathname.match(/\/status(?:es)?\/(\d+)/);

    return match?.[1] ?? null;
  } catch {
    return null;
  }
}


export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/tr") ? "tr" : "en";
}


interface CreateMetadataParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
}

export function createMetadata(params: CreateMetadataParams = {}): Metadata {
  const {
    title,
    description = SITE_CONFIG.description,
    path = "",
    image,
    noIndex = false,
    publishedTime,
    modifiedTime,
    type = "website",
  } = params;

  const url = `${SITE_CONFIG.url}${path}`;

  const ogImage = image || "/img/og.png";

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      type,
      url,
      siteName: SITE_CONFIG.name,
      title: title || SITE_CONFIG.title,
      description,
      images: [
        {
          url: ogImage,
          width: SITE_CONFIG.ogImage.width,
          height: SITE_CONFIG.ogImage.height,
          alt: title || SITE_CONFIG.title,
        },
      ],
      ...(type === "article" &&
        publishedTime && {
          publishedTime,
          modifiedTime: modifiedTime || publishedTime,
          authors: [SITE_CONFIG.author.name],
        }),
    },
    twitter: {
      card: SITE_CONFIG.social.twitter.cardType,
      title: title || SITE_CONFIG.title,
      description,
      creator: SITE_CONFIG.author.twitter,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };

  return metadata;
}