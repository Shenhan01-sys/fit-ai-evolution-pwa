const CACHE_NAME = "fitai-v1"
const ASSETS_TO_CACHE = ["/", "/app/dashboard", "/app/workout-generator", "/app/achievements", "/offline"]

// Install event - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("Failed to cache some assets during install:", err)
        // Continue even if some assets fail to cache
        return Promise.resolve()
      })
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)),
      )
    }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Don't cache POST requests or non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip API calls and auth routes
  if (event.request.url.includes("/api/") || event.request.url.includes("/auth/")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a success response
          if (!response || response.status !== 200 || response.type === "error") {
            return response
          }

          // Clone the response for caching
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Offline fallback
          return caches.match("/offline")
        })
    }),
  )
})

// Push notification handler
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {}
  const options = {
    body: data.body || "New fitness update",
    icon: "/icon-192.png",
    badge: "/icon-96.png",
    tag: data.tag || "notification",
    requireInteraction: false,
  }

  event.waitUntil(self.registration.showNotification(data.title || "FitAI", options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/")
      }
    }),
  )
})
