/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: false,
    domains: [
      "images.unsplash.com",
      "beratbozkurt.net",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
