import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 100],

    remotePatterns: [
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "notion.so" },
      { protocol: "https", hostname: "files.notion.so" },
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.amazonaws.com" },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net"
      }
    ],
  },
  async redirects() {
    return [
      // 1️⃣ TR blog list
      {
        source: "/blog",
        destination: "/tr/blog",
        permanent: true, // 301
      },

      // 2️⃣ TR blog detail
      {
        source: "/blog/:slug",
        destination: "/tr/blog/:slug",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
