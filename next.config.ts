import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "architizer-prod.imgix.net",
      },
      {
        protocol: "https",
        hostname: "api2.athanpro.com",
      },
    ],
  },
  basePath: "/Takvapp_Web",
  assetPrefix: "",
};

export default nextConfig;
