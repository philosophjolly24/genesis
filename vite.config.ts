import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "index.html",
        "genesis-192x192.png",
        "genesis-512x512.png",
      ],
      manifest: {
        name: "Genesis",
        short_name: "Genesis",
        start_url: "/",
        display: "standalone",
        background_color: "#f3f3f3",
        theme_color: "#ffb343",
        icons: [
          { src: "/genesis-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/genesis-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        globPatterns: ["index.html", "**/*.{js,css,svg,png,woff2}"], 
        navigateFallback: "/index.html", 
        runtimeCaching: [
          // API calls
          {
            urlPattern: /^https?:\/\/.*\/.*$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 24 * 60 * 60 },
              networkTimeoutSeconds: 10,
            },
          },
          // Static assets
          {
            urlPattern: /\.(?:js|css|png|jpg|svg|woff2?)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "asset-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
          // Google Fonts stylesheets
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" },
          },
          // Google Fonts font files
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
});
