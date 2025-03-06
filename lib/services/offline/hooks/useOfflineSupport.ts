'use client';

import { useEffect, useState } from 'react';
import { offlineStorage } from '../storage';

interface OfflineStatus {
  isOffline: boolean;
  isSupported: boolean;
  cachedContent: {
    articles: number;
  } | null;
}

export const useOfflineSupport = () => {
  const [status, setStatus] = useState<OfflineStatus>({
    isOffline: !navigator?.onLine,
    isSupported: 'serviceWorker' in navigator,
    cachedContent: null
  });

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const updateCacheInfo = async () => {
      const info = await offlineStorage.getStorageInfo();
      setStatus(prev => ({
        ...prev,
        cachedContent: info
      }));
    };

    const handleStatusChange = () => {
      setStatus(prev => ({
        ...prev,
        isOffline: !navigator.onLine
      }));
      // Update cache info when connectivity changes
      updateCacheInfo();
    };

    // Register service worker
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        console.log('Service Worker registered successfully:', registration);
        // Get initial cache info after registration
        await updateCacheInfo();
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    // Initialize
    registerServiceWorker();

    // Listen for online/offline events
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return status;
};
