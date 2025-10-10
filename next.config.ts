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
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /.*/, // Match all requests
        handler: "NetworkFirst", // Fetch from network first, fallback to cache
        options: {
          cacheName: "offline-cache",
          expiration: {
            maxEntries: 120, // Limit number of cached entries
          },
        },
      },
    ],
  },
})(nextConfig);
