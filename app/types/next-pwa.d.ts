declare module "next-pwa" {
  import type { NextConfig } from "next";

  // Define the structure for a single runtime caching entry
  interface RuntimeCacheEntry {
    urlPattern: RegExp | string;
    handler:
      | "NetworkFirst"
      | "CacheFirst"
      | "StaleWhileRevalidate"
      | "NetworkOnly"
      | "CacheOnly";
    options?: {
      cacheName?: string;
      networkTimeoutSeconds?: number;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
    };
  }

  // NOTE: WorkboxOptions definition is optional here, as we are defining
  // runtimeCaching directly on PWAOptions to match the required configuration.

  // Define the PWA Options interface (top level)
  interface PWAOptions {
    dest: string;
    register?: boolean;

    // ADDED: Explicitly re-introduced to PWAOptions to match the top-level usage in next.config.js
    skipWaiting?: boolean;
    runtimeCaching?: Array<RuntimeCacheEntry>;

    disable?: boolean;

    // The 'fallbacks' property
    fallbacks?: {
      document?: string; // e.g., '/_offline'
      image?: string;
      // Add other fallback types as needed
    };

    // If your PWA version requires nesting, include the workboxOptions property here
    // workboxOptions?: WorkboxOptions;
  }

  export default function withPWA(
    options: PWAOptions
  ): (config: NextConfig) => NextConfig;
}
