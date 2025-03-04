import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const imageCache: RuntimeCaching = {
  matcher: ({ request }: { request: Request }) => {
    return request.destination === 'image' || 
           /\.(png|jpg|jpeg|svg|gif|webp)$/.test(request.url);
  },
  handler: {
    handle: async ({ request }: { request: Request }) => {
      const cache = await caches.open('image-cache');
      const response = await cache.match(request);
      if (response) {
        return response;
      }
      const networkResponse = await fetch(request);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  }
};

const removeQueryParams = (url: string): string => {
  const urlObj = new URL(url);
  urlObj.search = '';
  return urlObj.toString();
};

const staticCache: RuntimeCaching = {
  matcher: ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    return request.destination === 'script' || 
           request.destination === 'style' || 
           /\.(js|css)$/.test(url.pathname) ||
           url.pathname.startsWith('/_next/static/');
  },
  handler: {
    handle: async ({ request }: { request: Request }) => {
      try {
        const cache = await caches.open('static-resources');
        // Remove query parameters for cache lookup
        const cleanUrl = removeQueryParams(request.url);
        const cleanRequest = new Request(cleanUrl, request);
        
        const cachedResponse = await cache.match(cleanRequest);
        if (cachedResponse) {
          // Update cache in background
          fetch(request).then(async (networkResponse) => {
            if (networkResponse.ok) {
              await cache.put(cleanRequest, networkResponse);
            }
          }).catch(() => {/* Ignore background fetch errors */});
          return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          await cache.put(cleanRequest, networkResponse.clone());
        }
        return networkResponse;
      } catch {
        // If both network and cache fail, return a generic error response
        return new Response('Failed to load resource', { status: 500 });
      }
    }
  }
};

const externalCache: RuntimeCaching = {
  matcher: ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    return !url.hostname.includes('localhost') && 
           (request.destination === 'script' || request.destination === 'style');
  },
  handler: {
    handle: async ({ request }: { request: Request }) => {
      try {
        const cache = await caches.open('external-resources');
        const response = await cache.match(request);
        if (response) {
          return response;
        }
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch {
        // If external resource fails, return a generic error response
        return new Response('Failed to load external resource', { status: 500 });
      }
    }
  }
};

const navigationCache: RuntimeCaching = {
  matcher: ({ request }: { request: Request }) => {
    return request.mode === 'navigate';
  },
  handler: {
    handle: async ({ request }: { request: Request }) => {
      try {
        // Try network first
        const networkResponse = await fetch(request);
        // Cache successful responses
        const cache = await caches.open('offline-pages');
        await cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch {
        // If network fails, try cache
        const cache = await caches.open('offline-pages');
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // If no cache, return offline page
        const offlineResponse = await caches.match('/offline');
        return offlineResponse || new Response('Offline page not found', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      }
    }
  }
};

const runtimeCacheConfig: RuntimeCaching[] = [
  navigationCache,
  staticCache,
  externalCache,
  imageCache,
  ...defaultCache
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: runtimeCacheConfig
});

// Add error handling for service worker installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open('offline-assets').then((cache) => {
        return cache.addAll([
          '/offline',
          '/favicon.ico',
          '/manifest.json',
          '/sw.js'
        ]);
      }),
      caches.open('offline-pages').then((cache) => {
        return cache.add('/offline');
      })
    ]).catch((err) => {
      console.error('Service worker installation failed:', err);
    })
  );
});


serwist.addEventListeners();
