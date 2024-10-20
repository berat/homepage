/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: process.env.NODE_ENV === "production" ? true : true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
      },
    ],
    domains: [
      "images.unsplash.com",
      "beratbozkurt.net",
      "www.notion.so",
      "notion.so",
      "beratbozkurt.net",
      "localhost",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
