// Valle Viejo Turismo - Service Worker
const CACHE_NAME = 'valleviejo-v2';

// Recursos que se cachean al instalar el SW (app shell)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './css/rs6.css',
  './js/rbtools.min.js',
  './js/rs6.min.js',
  './fonts/font-awesome/css/font-awesome.css',
  './fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css',
  './fonts/pe-icon-7-stroke/css/helper.css',
  // Imágenes principales de la app
  './assets/transparent.png',
  './assets/fondoinicionuevo.jpg',
  './assets/fondogastronomia.jpg',
  './assets/hosteriafondo-1.jpg',
  './assets/hosteriahorarios.jpg',
  './assets/paseo.jpg',
  './assets/titulovertical2.png',
  './assets/btn-turismo-2.png',
  './assets/btn-portezuelo.png',
  './assets/btn-gastronomia-2.png',
  './assets/btn-hospedaje-2.png',
  './assets/btn-ultra.png',
  './assets/btn-inicio-1.png',
  './assets/btn-inicio-2.png',
  './assets/btn-siguiente-1.png',
  './assets/btn-siguiente-2.png',
  './assets/btn-volver-2.png',
  './assets/btn-volver-3.png',
  './assets/gastronomia.png',
  './assets/redesverde.png',
  './assets/rectangulo-verde.png',
  './assets/pop.mp3',
  './assets/redondeado-filtro.png',
  './assets/mapa.png',
  './assets/portezuelologo.png',
  './assets/logoultra.png',
  './assets/montanasultra.png',
  './assets/textoultra.png',
  './assets/qrultra2.png',
  './assets/volverhosteria.png',
  './assets/horarios.png',
  './assets/Hosteria-1.png',
  './assets/hosteriacuestaelportezuelo_1747415494_3633907010383874356_59484875998-1-copia.png',
  './assets/La-Hosteria-Cuesta-del-Portezuelo-es-un-alojamiento-ubicado-en-.png',
  './assets/Se-encuentra-a-7-km-desde-el-inicio-de-La-Cuesta-ya-1070-mts-s_.png',
  './assets/redes-1.png',
  './assets/IMG_8365-1.png',
  './assets/IMG_8365-1-1.png',
];

// ── Install: pre-cachear el app shell ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: limpiar caches viejos ───────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Cache First para assets locales, Network First para CDN ─────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignorar peticiones que no sean GET
  if (event.request.method !== 'GET') return;

  // Para recursos de CDN externos (Google Fonts, jQuery CDN): network first con fallback a cache
  const isExternal = !url.origin.includes(self.location.origin) &&
                     (url.origin.includes('googleapis') ||
                      url.origin.includes('gstatic') ||
                      url.origin.includes('ajax.googleapis'));

  if (isExternal) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para recursos locales: Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
