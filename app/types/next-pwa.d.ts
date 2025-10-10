declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface PWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    runtimeCaching?: Array<{
      urlPattern: RegExp | string;
      handler: "NetworkFirst" | "CacheFirst" | "StaleWhileRevalidate";
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
        };
      };
    }>;
  }

  export default function withPWA(
    options: PWAOptions
  ): (config: NextConfig) => NextConfig;
}
