/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-c3f93e2';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./denni_sluzba_002.html","./denni_sluzba_005.html","./denni_sluzba_006.html","./denni_sluzba_007.html","./denni_sluzba_008.html","./denni_sluzba_009.html","./denni_sluzba_010.html","./denni_sluzba_011.html","./denni_sluzba_012.html","./denni_sluzba_013.html","./denni_sluzba_014.html","./denni_sluzba_015.html","./denni_sluzba_016.html","./denni_sluzba_017.html","./denni_sluzba_018.html","./denni_sluzba_019.html","./denni_sluzba_020.html","./denni_sluzba_021.html","./denni_sluzba_022.html","./denni_sluzba_023.html","./denni_sluzba_024.html","./denni_sluzba_025.html","./denni_sluzba_026.html","./denni_sluzba_027.html","./denni_sluzba_028.html","./denni_sluzba_029.html","./denni_sluzba_030.html","./denni_sluzba_031.html","./denni_sluzba_032.html","./denni_sluzba_033.html","./denni_sluzba_034.html","./denni_sluzba_035.html","./denni_sluzba_036.html","./denni_sluzba_037.html","./denni_sluzba_038.html","./denni_sluzba_039.html","./denni_sluzba_040.html","./denni_sluzba_041.html","./denni_sluzba_042.html","./denni_sluzba_043.html","./denni_sluzba_044.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_denni_sluzba.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
