// ── KINTREST SERVICE WORKER ──────────────────────────────────
// Handles caching, offline support and PWA install experience

const CACHE_NAME = 'kintrest-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap'
];

// ── INSTALL: cache all static assets ─────────────────────────
self.addEventListener('install', event => {
  console.log('[Kintrest SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[Kintrest SW] Static assets cached');
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE: clean up old caches ────────────────────────────
self.addEventListener('activate', event => {
  console.log('[Kintrest SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => {
              console.log('[Kintrest SW] Deleting old cache:', key);
              return caches.delete(key);
            })
      );
    }).then(() => self.clients.claim())
  );
});

// ── FETCH: serve from cache, fallback to network ─────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Paystack, Unsplash API calls — always go to network
  if (url.hostname.includes('paystack') ||
      url.hostname.includes('unsplash') ||
      url.hostname.includes('api.unsplash')) {
    return;
  }

  // Cache-first for static assets, fonts and local files
  if (url.hostname.includes('fonts.googleapis') ||
      url.hostname.includes('fonts.gstatic') ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.json') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname === '/') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        });
      }).catch(() => {
        // Offline fallback for pages
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ── PUSH NOTIFICATIONS (future use) ──────────────────────────
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'You have a new notification from Kintrest 🌸',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open Kintrest' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Kintrest ✦', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});