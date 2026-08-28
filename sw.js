// HowsDaWeather service worker - offline app shell, live data over network.
const CACHE = 'howsdaweather-v31';
const SHELL = [
  './', './index.html', './manifest.webmanifest', './favicon.svg',
  './fredoka-500.woff2', './fredoka-600.woff2',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Let cross-origin API calls (open-meteo, postcodes.io, OSM) go straight to the network.
  if (url.origin !== location.origin || e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html');
  if (isPage) {
    // Network-first for the page, so a redeploy shows up immediately; cache as offline fallback.
    e.respondWith(
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return resp;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Cache-first for static assets (icons, font, manifest).
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return resp;
    }).catch(() => caches.match('./index.html')))
  );
});
