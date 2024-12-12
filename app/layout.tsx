import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CommandMenu, Providers } from "@/components/base";

import "moment/locale/tr";
import "@/styles/globals.css";

import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Berat Bozkurt | frontend developer",
  description: "Berat Bozkurt, frontend developer, photography, blogging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased transition-all`}>
        <Providers>
          {children}
          <CommandMenu />
        </Providers>
        <Analytics mode={"production"} />
        <SpeedInsights />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="9304602d-e4a5-43cb-840d-79560182a0ed"
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
