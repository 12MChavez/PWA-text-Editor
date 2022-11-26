const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// asset caching

registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new CacheFirst({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        //200 status code is needed for a response to be considered cacheable
        statuses: [200],
      }),
      new ExpirationPlugin({
        //number of entries stored in cache
        maxEntries: 24,
        //one day expiration
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  /\.(?:png|gif|jpg|svg|ico)$/,
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new CacheableResponsePlugin({
        //200 status code is needed for a response to be considered cacheable
        statuses: [200],
      }),
      new ExpirationPlugin({
        //number of entries stored in cache
        maxEntries: 24,
        //one day expiration
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);
