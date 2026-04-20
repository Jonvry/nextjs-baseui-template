self.addEventListener("install", () => {
   self.skipWaiting()
})

self.addEventListener("activate", (event) => {
   event.waitUntil(self.clients.claim())
})

// Required for Chrome's PWA install criteria. Pass-through; add caching later if needed.
self.addEventListener("fetch", () => {})
