const CACHE_NAME = 'energy-hub-v24';
const ASSETS = [
  '/energyhub/index.html',
  '/energyhub/style.css',
  '/energyhub/manifest.json',
  '/energyhub/app-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
