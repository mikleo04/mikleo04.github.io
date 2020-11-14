importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([{
        url: "/index.html",
        revision: '1'
    },
    {
        url: "/nav.html",
        revision: '1'
    },
    {
        url: "pages/home.html",
        revision: '1'
    },
    {
        url: "pages/contact.html",
        revision: '1'
    },
    {
        url: "pages/about.html",

        revision: '1'
    },
    {
        url: "/detail.html",
        revision: '1'
    },
    {
        url: "pages/myfavorite.html",
        revision: '1'
    },
    {
        url: "/team.html",

        revision: '1'
    },
    {
        url: "js/nav.js",
        revision: '1'
    },
    {
        url: "js/api.js",
        revision: '1'
    },
    {
        url: "js/materialize.min.js",
        revision: '1'
    },
    {
        url: "js/footbal_db.js",
        revision: '1'
    },
    {
        url: "js/idb/lib/idb.js",
        revision: '1'
    },
    {
        url: "js/listLeague.js",

        revision: '1'
    },
    {
        url: "js/detailLeague.js",

        revision: '1'
    },
    {
        url: "js/team.js",

        revision: '1'
    },
    {
        url: "js/favoriteTeams.js",
        revision: '1'
    },
    {
        url: "js/cek_sw.js",

        revision: '1'
    },
    {
        url: "/css/materialize.min.css",
        revision: '1'
    },
    {
        url: "/css/style.css",
        revision: '1'
    },
    {
        url: "/favicon-32x32.png",
        revision: '1'
    },
    {
        url: "/logo.png",
        revision: '1'
    },
    {
        url: "/logo72.png",
        revision: '1'
    },
    {
        url: "/logo96.png",
        revision: '1'
    },
    {
        url: "/logo128.png",
        revision: '1'
    },
    {
        url: "/logo144.png",
        revision: '1'
    },
    {
        url: "/logo192.png",
        revision: '1'
    },
    {
        url: "/logo256.png",
        revision: '1'
    },
    {
        url: "/logo384.png",
        revision: '1'
    },
    {
        url: "/profile.jpg",
        revision: '1'
    },
    {
        url: "/img/2002.png",
        revision: '1'
    },
    {
        url: "/img/2003.png",
        revision: '1'
    },
    {
        url: "/img/2014.png",
        revision: '1'
    },
    {
        url: "/img/2015.png",
        revision: '1'
    },
    {
        url: "/img/2019.png",
        revision: '1'
    },
    {
        url: "/img/2021.png",
        revision: '1'
    },
    {
        url: "/img/facebook.png",
        revision: '1'
    },
    {
        url: "/img/whatsapp.png",
        revision: '1'
    },
    {
        url: "/img/instagram.png",
        revision: '1'
    },
    {
        url: "/img/youtube.png",
        revision: '1'
    },
    {
        url: "/manifest.json",
        revision: '1'
    },
]);

// pages to cache

workbox.routing.registerRoute(new RegExp('/'),
    async ({
        event
    }) => {
        try {
            return await workbox.strategies.networkFirst({
                cacheName: 'footbal-viewer',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                    }),
                ],
            }).handle({
                event
            });
        } catch (error) {
            return caches.match(urls);
        }
    }
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpx|css|svg)$/,
    workbox.strategies.networkFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
  
// Menyimpan cache untuk file fontawesome selama 1 tahun
workbox.routing.registerRoute(
/^https:\/\/use\.fontawesome\.com/,
workbox.strategies.cacheFirst({
    cacheName: 'use-fontawesome',
    plugins: [
    new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
    }),
    new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
    }),
    ],
})
);
  

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/2002.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (!event.action) {
        // Penguna menyentuh area notifikasi diluar action
        console.log('Notification Clicked.');
        return;
    }
    switch (event.action) {
        case 'yes-action':
            clients.openWindow('/#myfavorite');
            break;
        case 'no-action':
            break;
        default:
            console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
            break;
    }
});