const CACHE_NAME = "genesis-cache-v1";

// List of core assets to pre-cache
const CORE_ASSETS = [
  "/",
  "/manifest.json",
  "/genesis-192x192.png",
  "/genesis-512x512.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
];

// Install event — pre-cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event — cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event — handle network requests
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Cache Next.js build files automatically
  if (request.url.includes("/_next/")) {
    event.respondWith(
      caches.open("genesis-next-assets").then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch (err) {
          return cached;
          console.log(err);
        }
      })
    );
    return;
  }

  // Try cache first for static/public assets
  if (
    request.destination === "image" ||
    request.url.endsWith(".json") ||
    request.url.endsWith(".ico") ||
    request.url.endsWith(".png")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // Default: network-first strategy
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
