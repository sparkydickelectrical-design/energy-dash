const CACHE_NAME = 'energy-hub-v31';
const ASSETS = [
  '/energyhub/index.html',
  '/energyhub/savings.html',
  '/energyhub/style.css',
  '/energyhub/manifest.json',
  '/energyhub/app-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
