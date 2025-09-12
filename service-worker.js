const CACHE_NAME = "calculator-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/scripts/theme.js",
  "/scripts/select.js",
  "/scripts/build.js",
  "/scripts/survivors.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/favicon.svg",
  "/icons/moon.svg",
  "/icons/sun.svg",
];

// Установка SW и предварительное кэширование
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // сразу активируем новую версию SW
});

// Активация и очистка старых кэшей
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim(); // обновляем вкладки без перезапуска
});

// Перехват запросов
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // обновляем кэш свежей версией
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        })
        .catch(() => cached); // если сети нет, берем из кэша

      return cached || fetchPromise;
    })
  );
});
