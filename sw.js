const CACHE = 'jet-v5';

// External CDN hosts — safe to cache forever (versioned URLs, never change)
const CDN_HOSTS = ['unpkg.com', 'gstatic.com', 'tile.openstreetmap.org', 'waymarkedtrails.org'];

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;

  let url;
  try { url = new URL(e.request.url); } catch { return; }

  const isCDN = CDN_HOSTS.some(h => url.hostname.includes(h));

  if(isCDN){
    // Cache-first: CDN libraries and map tiles (versioned, never change)
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
    // Network-first: own files + Firebase APIs — always fresh, cache only as offline fallback
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
