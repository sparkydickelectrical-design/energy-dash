const CACHE_NAME = 'energy-hub-v48';
const ASSETS = [
  'index.html', 
  'style.css', 
  'manifest.json', 
  'savings.html'
];

// Install: Save the layout files to the phone's memory
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS))
  );
});

// Fetch: Logic to handle live data vs static files
self.addEventListener('fetch', (e) => {
  // CRITICAL: If the request is for your Python Bridge, do NOT cache it.
  // This ensures the kW numbers stay live.
  if (e.request.url.includes(':5000')) {
    e.respondWith(fetch(e.request));
  } else {
    // For regular files (css/html), load from cache for speed
    e.respondWith(
      caches.match(e.request).then((r) => r || fetch(e.request))
    );
  }
});
