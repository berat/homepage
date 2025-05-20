/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["tr", "en-US"],
    defaultLocale: "tr",
  },
  reactStrictMode: false,
  images: {
    imageSizes: [600, 800, 1000, 1200, 1400, 1600],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "images.unsplash.com",
      "images.ctfassets.net",
      "beratbozkurt.net",
      "www.notion.so",
      "notion.so",
      "beratbozkurt.net",
      "localhost",
    ],
  },
};

export default nextConfig;
