const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "index.js",
    "/db.js",
    "public/styles.css",
    "/manifest.webmanifest",
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// INSTALLATION EVENT LISTENER
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

//  ACTIVATION EVENT LISTENER
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});