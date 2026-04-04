const CACHE = 'jet-v3';
const ASSETS = ['./', './index.html', './manifest.json', './firebase-config.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if(url.includes('firestore') || url.includes('firebase') || url.includes('nominatim')){
    e.respondWith(fetch(e.request).catch(() => new Response('', {status:503})));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
