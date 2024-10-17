/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "images.unsplash.com",
      "beratbozkurt.net",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "www.notion.so",
      "notion.so",
      "beratbozkurt.net",
      "localhost",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
