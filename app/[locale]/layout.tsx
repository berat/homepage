import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/TopBar";
import { notFound } from "next/navigation";
import "react-medium-image-zoom/dist/styles.css";
import { SITE_CONFIG } from "@/constants/general";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { getPersonSchema, getWebSiteSchema } from "@/lib/schema";
import { OpenToWorkFixed } from "@/components/base/OpenToWork";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const locales = ["tr", "en"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function generateMetadata(): Promise<Metadata> {
  const url = SITE_CONFIG.url;

  return {
    metadataBase: new URL(url),
    title: {
      default: SITE_CONFIG.title,
      template: `%s`,
    },
    description: SITE_CONFIG.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [
        {
          url: "/og.jpg",
          width: SITE_CONFIG.ogImage.width,
          height: SITE_CONFIG.ogImage.height,
          alt: SITE_CONFIG.title,
        },
      ],
    },
    twitter: {
      card: SITE_CONFIG.social.twitter.cardType,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      creator: SITE_CONFIG.author.twitter,
      images: ["/og.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "16x16 32x32" }],
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="rgb(10, 10, 10)"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Berat Bozkurt - Blog RSS Feed"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />
      </head>
      <body className={`antialiased`}>
        <TopBar />
        {children}
        <Analytics mode={"production"} />
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="9304602d-e4a5-43cb-840d-79560182a0ed"
          />
        )}
        <OpenToWorkFixed />
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        )}
      </body>
    </html>
  );
}
