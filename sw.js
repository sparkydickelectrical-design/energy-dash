const CACHE_NAME = 'hub-v1';
const ASSETS = ['index.html', 'style.css', 'manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes(':5000')) {
    e.respondWith(fetch(e.request));
  } else {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
  }
});
