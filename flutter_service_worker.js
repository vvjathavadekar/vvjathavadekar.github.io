'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "590de3adf4437981ed05a2b63003c0dd",
"index.html": "4df3c11cb16218c36f95acfc8d1303b8",
"/": "4df3c11cb16218c36f95acfc8d1303b8",
"main.dart.js": "f2735e448a63c7ae33e2253bb287383d",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a5fa782c2cf4967a1e42cbed860bcc8c",
"assets/AssetManifest.json": "7f86b2735b5723e44ffe156c2250b65d",
"assets/NOTICES": "e6bd8797749c6696a0516492e7fe1223",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "318df24b45c1903fbb842761024441a8",
"assets/fonts/MaterialIcons-Regular.otf": "52fc34a70b225832e47b13c384bc9b3e",
"assets/assets/images/email.png": "37264ffee1f617e63b8ffdbeed4d98b1",
"assets/assets/images/profile_photo_2.png": "49fc16502c8ed398bff54be40c805dcf",
"assets/assets/images/cognizant_logo.png": "9bc547d3adccd506950e6c6c9e031408",
"assets/assets/images/accucia_logo.jpeg": "0b65e74595d0e0159feda63c8f9cd97b",
"assets/assets/images/instagram.png": "bfc3e35268345a7f8d70c99f38af401c",
"assets/assets/images/accucia.jpeg": "9c567f0f497a88fef6d4acb754f11b15",
"assets/assets/images/my_photo.png": "a0a20dbf0640ee1e30ec6bffd57d62d6",
"assets/assets/images/profile_photo.jpeg": "e55d2f3498ee382bb424ce9f912587c1",
"assets/assets/images/linkedin.png": "c84c5f9912787fbca1daea248dc8481f",
"assets/assets/icons/visual_studio.png": "f127bc9f7ea66ea01aedf195fecdb54c",
"assets/assets/icons/sparks.png": "c314a4f8e9e8351481ee724918cc1c7e",
"assets/assets/icons/xcode.png": "706cbc3da0c58e932d797d51d9ae03f9",
"assets/assets/icons/testing.png": "b832645acde628d8d1ebaa515f1ff397",
"assets/assets/icons/git.png": "ab40d02f0aa8bf85de12fd45bda5b0c0",
"assets/assets/icons/Kotlin_Icon.png": "18bd57771d8e25b6d5c2915e4d5c6142",
"assets/assets/icons/flutter.png": "1009e48c984a4c279c20ce6195970428",
"assets/assets/icons/debugging.png": "91bdda1ed62339f7dc6bf7047d7b9902",
"assets/assets/icons/sppu.png": "4278660cd12f5d5085a315ac4f566f46",
"assets/assets/icons/msb.jpeg": "f09ff5f513b383bcead6b933b67dba23",
"assets/assets/icons/firebase.png": "7371a3d035412a78dabc88d0e5237b44",
"assets/assets/icons/java.png": "652fdb659a681116811612e0b9e25354",
"assets/assets/icons/bitbucket.png": "3344edf459e2c5dbdef3a68f0aab4755",
"assets/assets/icons/aws.png": "cdc80143006d1b8d4440da9005cba02e",
"assets/assets/icons/android.png": "d670d3ff747bcd3be3aecf0b2dc405e0",
"assets/assets/icons/onesignle.png": "162c6ec094aa3c9c2d506413d31aa69a",
"assets/assets/icons/react_native.png": "b228c47520b7335ef045fd8662a45b24",
"assets/assets/icons/android_studio.png": "a455b222ddc45e920b9fe9757d989cd4",
"assets/assets/icons/udemy.png": "e911b2f9e40eb36b44754229b1df6e8d",
"assets/assets/icons/dart.png": "668a2b31c830c2ef2a14609602e554a9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
