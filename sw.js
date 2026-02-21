const CACHE_NAME = 'energy-hub-v38';
const ASSETS = [
  'index.html',
  'style.css',
  'manifest.json',
  'app-icon.png',
  'savings.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
