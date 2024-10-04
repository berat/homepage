import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
// components
import { Providers, CommandMenu } from "@/components/base";
// assets
import "moment/locale/tr";
import "@/styles/globals.css";

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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
