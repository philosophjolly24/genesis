import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Note: Ensure you have installed the required package:
// npm install @ducanh2912/next-pwa

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Other Next.js 15 configuration goes here (e.g., experimental features)
};

export default withPWA({
  dest: "public",
  register: true,
  // Disable in development to prevent caching issues during local testing
  disable: process.env.NODE_ENV === "development",

  // CRITICAL for App Router offline support: serves /_offline when navigation fails
  fallbacks: {
    document: "/~offline",
    // You can add an image fallback here if you need one, e.g., image: "/static/offline.png"
  },

  // NOTE: skipWaiting and runtimeCaching are moved back to the top level.
  // This resolves the runtime build error from the Workbox GenerateSW plugin.
  skipWaiting: true,

  runtimeCaching: [
    // Cache static assets (JS, CSS, fonts, images) - Use CacheFirst for performance
    {
      urlPattern: /\.(?:js|css|woff2?|png|jpg|jpeg|svg|gif|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },

    // Cache Next.js build output (/_next/static/*) - Essential for offline app shell
    {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },

    // Since you use Dexie, we DO NOT need rules for /api/ or generic NetworkFirst/CacheFirst
    // rules for all pages, as the 'fallbacks' option handles page shell loading.
  ],
})(nextConfig);
