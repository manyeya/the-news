'use client';

import { useRouter } from 'next/navigation';
import { useOfflineSupport } from '@/services/offline/hooks/useOfflineSupport';

export function OfflineIndicator() {
  const router = useRouter();
  const { isOffline, cachedContent } = useOfflineSupport();

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => router.push('/offline')}
        className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-200 transition-colors"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          You&apos;re offline - View {cachedContent?.articles ?? 0} cached items
        </span>
      </button>
    </div>
  );
}
