const CACHE = 'jet-v25';

// External CDN hosts — safe to cache forever (versioned URLs)
const CDN_HOSTS = ['unpkg.com', 'gstatic.com', 'tile.openstreetmap.org', 'waymarkedtrails.org', 'sheetjs.com', 'cdn.sheetjs.com', 'cdnjs.cloudflare.com'];

// Never cache these — always fetch fresh
const NO_CACHE = ['index.html', 'firebase-config.js', 'sw.js', '/'];

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;

  let url;
  try { url = new URL(e.request.url); } catch { return; }

  const path = url.pathname;
  const isCDN = CDN_HOSTS.some(h => url.hostname.includes(h));
  const isNoCache = NO_CACHE.some(p => path.endsWith(p));

  if(isNoCache){
    // Always fetch fresh — no cache for main HTML and SW itself
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => caches.match(e.request))
    );
  } else if(isCDN){
    // Cache-first: CDN libraries and map tiles
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        if(res.ok){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }))
    );
  } else {
    // Network-first: own files — always fresh, cache as offline fallback
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if(res.ok){
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
