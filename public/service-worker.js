const CACHE_NAME = "genesis-shell-v1";
const DYNAMIC_CACHE = "dynamic-pages-v1";
const CORE_ASSETS = [
  "/", // offline shell
  "/offline.html",
  "/manifest.json",
  "/genesis-192x192.png",
  "/genesis-512x512.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/_next/static/", // Next.js JS/CSS bundles
];

// Install event – cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Activate event – cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Fetch event – handle offline shell, static assets, and dynamic pages
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // 1️⃣ Serve offline shell for all navigations (dynamic routes)
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/offline.html").then((cachedShell) => {
        return (
          cachedShell ||
          fetch(request).catch(() => caches.match("/offline.html"))
        );
      })
    );
    return;
  }

  // 2️⃣ Cache static assets and Next.js bundles
  if (
    request.url.includes("/_next/") ||
    /\.(?:js|css|woff2?|png|jpg|jpeg|svg|gif|ico)$/i.test(request.url)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // 3️⃣ Cache dynamic pages after first visit (optional)
  if (/\/list\/.*/i.test(request.url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).catch(() => caches.match("/offline.html"))
        )
    );
    return;
  }

  // 4️⃣ Default network-first strategy
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
