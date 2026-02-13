const cacheName = 'kittu-garden-v1';
const assets = [
  './',
  './index.html',
  './dashboard.html',
  './history.html',
  './library.html',
  './notes.html',
  './syllabus.html',
  './test.html',
  './ai.html',
  './manifest.json',
  
  // JavaScript folder
  './js/auth.js',
  './js/dashboard.js',
  './js/test.js',
  './js/test-data.js',
  './js/library.js',
  './js/syllabus-script.js',
  './js/ai-logic.js',
  
  // Stylesheets folder
  './style-sheets/auth.css',
  './style-sheets/dashboard.css',
  './style-sheets/library.css',
  './style-sheets/notes.css',
  './style-sheets/syllabus.css',
  './style-sheets/ai.css',
  
  // Assets folder
  './assets/munni.png',
  './assets/new.mp4',
  './assets/pop.mp3',

  // icons folder
    "icons/icon-48x48.png",
    "icons/icon-72x72.png",
    "icons/icon-96x96.png",
    "icons/icon-128x128.png",
    "icons/icon-144x144.png",
    "icons/icon-152x152.png",
    "icons/icon-192x192.png",
    "icons/icon-256x256.png",
    "icons/icon-384x384.png",
    "icons/icon-512x512.png"
];

// 1. Install Event: Save all files to the phone's cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('App: Caching all files for offline use');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event: Clean up any old versions of the app
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serve files from cache when offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});