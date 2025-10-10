import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public", // Service worker files go here
  register: true, // Automatically register SW
  skipWaiting: true, // Activate new SW immediately
  disable: process.env.NODE_ENV === "development", // Disable in dev
  runtimeCaching: [
    {
      urlPattern: /^\/_next\/.*/, // Next.js compiled JS/CSS
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: { maxEntries: 60 },
      },
    },
    {
      urlPattern: /^\/.*$/, // Pages and other assets
      handler: "NetworkFirst",
      options: { cacheName: "pages" },
    },
  ],
})(nextConfig);
