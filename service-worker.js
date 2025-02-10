const filesToCache = [
  '/',
  '404.html'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return the cached resource if found
      if (response) {
        return response;
      }
      // Fetch the resource from the network
      return fetch(event.request).then(response => {
        // If the fetch request returns a 404, serve the custom 404 page
        if (response.status === 404) {
          return caches.match('404.html');
        }
        return response;
      });
    })
  );
});
