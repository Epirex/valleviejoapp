// Valle Viejo Turismo - Service Worker
const CACHE_NAME = 'valleviejo-v3';

// Lista de todos los recursos a cachear para funcionamiento offline
const ASSETS_TO_CACHE = [
  '/valleviejoapp/',
  '/valleviejoapp/index.html',
  '/valleviejoapp/jquery.js',
  '/valleviejoapp/manifest.json',
  '/valleviejoapp/css/rs6.css',
  '/valleviejoapp/js/rbtools.min.js',
  '/valleviejoapp/js/rs6.min.js',
  '/valleviejoapp/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css',
  '/valleviejoapp/fonts/font-awesome/css/font-awesome.css',
  // Iconos PWA
  '/valleviejoapp/icons/icon-192x192.png',
  '/valleviejoapp/icons/icon-512x512.png',
  // Assets - imágenes PNG
  '/valleviejoapp/assets/btn-gastronomia.png',
  '/valleviejoapp/assets/btn-Horarios.png',
  '/valleviejoapp/assets/btn-hospedaje.png',
  '/valleviejoapp/assets/btn-inicio-1.png',
  '/valleviejoapp/assets/btn-inicio-2.png',
  '/valleviejoapp/assets/btn-portezuelo.png',
  '/valleviejoapp/assets/btn-reservas.png',
  '/valleviejoapp/assets/btn-salir.png',
  '/valleviejoapp/assets/btn-Siguiente.png',
  '/valleviejoapp/assets/btn-siguiente-1.png',
  '/valleviejoapp/assets/btn-siguiente-2.png',
  '/valleviejoapp/assets/btn-turismo.png',
  '/valleviejoapp/assets/btn-Volver.png',
  '/valleviejoapp/assets/btn-volver-2.png',
  '/valleviejoapp/assets/btn-volver-3.png',
  '/valleviejoapp/assets/condorfit2026.png',
  '/valleviejoapp/assets/Datos.png',
  '/valleviejoapp/assets/Datos-1.png',
  '/valleviejoapp/assets/Datos-2.png',
  '/valleviejoapp/assets/Datos-4.png',
  '/valleviejoapp/assets/Datos-5.png',
  '/valleviejoapp/assets/Datos-6.png',
  '/valleviejoapp/assets/Datos-7.png',
  '/valleviejoapp/assets/Datos-8.png',
  '/valleviejoapp/assets/Datos-9.png',
  '/valleviejoapp/assets/Datos-10.png',
  '/valleviejoapp/assets/Datos-11.png',
  '/valleviejoapp/assets/Datos-12.png',
  '/valleviejoapp/assets/Datos-13.png',
  '/valleviejoapp/assets/Datos-14.png',
  '/valleviejoapp/assets/elcoyuyo.png',
  '/valleviejoapp/assets/elnegrito.png',
  '/valleviejoapp/assets/faba.png',
  '/valleviejoapp/assets/gastronomia.png',
  '/valleviejoapp/assets/havanna.png',
  '/valleviejoapp/assets/horarioboton.png',
  '/valleviejoapp/assets/IMG_0353.png',
  '/valleviejoapp/assets/imperial.png',
  '/valleviejoapp/assets/kaplan.png',
  '/valleviejoapp/assets/la-morena.png',
  '/valleviejoapp/assets/laruta.png',
  '/valleviejoapp/assets/loderulo.png',
  '/valleviejoapp/assets/logonuevo.png',
  '/valleviejoapp/assets/losciclistas.png',
  '/valleviejoapp/assets/magnolia.png',
  '/valleviejoapp/assets/mapa.png',
  '/valleviejoapp/assets/mapa-1.png',
  '/valleviejoapp/assets/mapa-2.png',
  '/valleviejoapp/assets/mapa-3.png',
  '/valleviejoapp/assets/mapa-4.png',
  '/valleviejoapp/assets/mapa-5.png',
  '/valleviejoapp/assets/mapa-6.png',
  '/valleviejoapp/assets/mapa-7.png',
  '/valleviejoapp/assets/mapa-8.png',
  '/valleviejoapp/assets/mapa-9.png',
  '/valleviejoapp/assets/mapa-10.png',
  '/valleviejoapp/assets/mapa-11.png',
  '/valleviejoapp/assets/mapa-12.png',
  '/valleviejoapp/assets/masamadre-1.png',
  '/valleviejoapp/assets/maxlou.png',
  '/valleviejoapp/assets/rectangulo-verde.png',
  '/valleviejoapp/assets/redesverde.png',
  '/valleviejoapp/assets/redondeado-filtro.png',
  '/valleviejoapp/assets/sancho-panza.png',
  '/valleviejoapp/assets/secretariaturismo.png',
  '/valleviejoapp/assets/transparent.png',
  '/valleviejoapp/assets/titulovertical2.png',
  '/valleviejoapp/assets/volverchikito.png',
  '/valleviejoapp/assets/Titulo-1.png',
  '/valleviejoapp/assets/Titulo-2.png',
  '/valleviejoapp/assets/Titulo-3.png',
  '/valleviejoapp/assets/Titulo-4.png',
  '/valleviejoapp/assets/Titulo-5.png',
  '/valleviejoapp/assets/Titulo-6.png',
  '/valleviejoapp/assets/Titulo-7.png',
  '/valleviejoapp/assets/Titulo-8.png',
  '/valleviejoapp/assets/Titulo-9.png',
  '/valleviejoapp/assets/Titulo-10.png',
  '/valleviejoapp/assets/Titulo-11.png',
  '/valleviejoapp/assets/Titulo-12.png',
  '/valleviejoapp/assets/Titulo-13.png',
  // Assets con nombres largos
  '/valleviejoapp/assets/Cabanas-Quinta-Las-Ruedas-te-invita-a-disfrutar-de-una-agradabl.png',
  '/valleviejoapp/assets/Cabanas-Valle-Hermoso-te-invita-a-vivir-una-experiencia-inolvid.png',
  '/valleviejoapp/assets/El-Paseo-de-los-Artesanos-es-un-espacio-cultural-y-turistico-qu.png',
  '/valleviejoapp/assets/El-Predio-es-un-espacio-de-estilo-campestre-que-ofrece-un-entor.png',
  '/valleviejoapp/assets/Estas-cabanas-sencillas-estan-ubicadas-en-una-acogedora-granja-.png',
  '/valleviejoapp/assets/Estas-cabanas-te-ofrecen-confort-y-tranquilidad-con-habitacion.png',
  '/valleviejoapp/assets/Finca-Titas-es-un-complejo-turistico-ideal-para-relajarse-y-dis.png',
  '/valleviejoapp/assets/La-cartelera-del-Cine-Teatro-Valle-Viejo-se-renueva-para-recibi.png',
  '/valleviejoapp/assets/La-Granja-Educativa-La-Sonada-es-un-espacio-rural-ubicado-en-Sa.png',
  '/valleviejoapp/assets/La-Hosteria-Cuesta-del-Portezuelo-es-un-alojamiento-ubicado-en-.png',
  '/valleviejoapp/assets/Ofrecemos-alojamiento-en-un-entorno-comodo-y-agradable-pensado.png',
  '/valleviejoapp/assets/Se-encuentra-a-7-km-desde-el-inicio-de-La-Cuesta-ya-1070-mts-s_.png',
  '/valleviejoapp/assets/Veni-a-disfrutar-de-una-experiencia-sustentable-en-el-norte-del.png',
  // Assets JPG
  '/valleviejoapp/assets/cabanasfincarecuerdo.jpg',
  '/valleviejoapp/assets/cabanasquintaruedas.jpg',
  '/valleviejoapp/assets/cabanasvallehermoso.jpg',
  '/valleviejoapp/assets/cabanasvallelabrador.jpg',
  '/valleviejoapp/assets/cineteatro.jpg',
  '/valleviejoapp/assets/elaqui.jpg',
  '/valleviejoapp/assets/fondoinicio.jpg',
  '/valleviejoapp/assets/ganjasonada.jpg',
  '/valleviejoapp/assets/gastronomiafondo.jpg',
  '/valleviejoapp/assets/horarios.jpg',
  '/valleviejoapp/assets/hosteriacuestadelportezuelo.jpg',
  '/valleviejoapp/assets/lastitas.jpg',
  '/valleviejoapp/assets/miradorcuestaportezuelo.jpg',
  '/valleviejoapp/assets/paseo.jpg',
  '/valleviejoapp/assets/portezuelo1.jpg',
  '/valleviejoapp/assets/portezuelo2.jpg',
  '/valleviejoapp/assets/portezuelo3.jpg',
  '/valleviejoapp/assets/portezuelo4.jpg',
  '/valleviejoapp/assets/portezuelo5.jpg',
  '/valleviejoapp/assets/portezuelo6.jpg',
  '/valleviejoapp/assets/portezuelo7.jpg',
  '/valleviejoapp/assets/portezuelofondo.jpg',
  '/valleviejoapp/assets/reservas.jpg',
  // Audio
  '/valleviejoapp/assets/pop.mp3',
];

// ─── INSTALL: precachear todos los recursos ───────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker - valleviejo-v2');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cacheando recursos...');
      // Cacheamos de a uno para no fallar si alguno no existe
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[SW] No se pudo cachear:', url, err);
          })
        )
      );
    }).then(() => {
      console.log('[SW] Instalación completa');
      return self.skipWaiting(); // Activa el SW inmediatamente
    })
  );
});

// ─── ACTIVATE: limpiar cachés viejas ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker - valleviejo-v2');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Eliminando caché vieja:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activación completa, controlando clientes');
      return self.clients.claim(); // Toma control de todas las pestañas
    })
  );
});

// ─── FETCH: estrategia Cache-First con fallback a red ────────────────────────
self.addEventListener('fetch', (event) => {
  // Solo interceptar peticiones GET
  if (event.request.method !== 'GET') return;

  // No interceptar peticiones a Google Fonts u otros CDN externos
  const url = new URL(event.request.url);
  if (!url.origin.includes('epirex.github.io') && !url.pathname.startsWith('/valleviejoapp/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Tenemos el recurso en caché → responder inmediatamente
        return cachedResponse;
      }

      // No está en caché → intentar la red y guardarlo para la próxima vez
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Sin conexión y sin caché → página offline si piden HTML
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/valleviejoapp/index.html');
          }
        });
    })
  );
});
