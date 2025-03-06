'use client';

import { useEffect, useState } from 'react';

interface OfflineStatus {
  isOffline: boolean;
  isSupported: boolean;
}

export const useOfflineSupport = () => {
  const [status, setStatus] = useState<OfflineStatus>({
    isOffline: !navigator?.onLine,
    isSupported: 'serviceWorker' in navigator
  });

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const handleStatusChange = () => {
      setStatus(prev => ({
        ...prev,
        isOffline: !navigator.onLine
      }));
    };

    // Register service worker
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
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
