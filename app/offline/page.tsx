'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { offlineStorage } from '@/services/offline/storage';
import { Article } from '@/services/news/types';
import { VideoNews } from '@/services/video-news/types';
import { useOfflineSupport } from '@/services/offline/hooks/useOfflineSupport';

export default function OfflinePage() {
  const router = useRouter();
  const { isOffline, isSupported, cachedContent } = useOfflineSupport();
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<VideoNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If online and not during initial load, redirect to home
    if (!isOffline && !isLoading) {
      router.push('/');
      return;
    }

    // Load cached content
    const loadContent = async () => {
      try {
        const [cachedArticles, cachedVideos] = await Promise.all([
          offlineStorage.articles.getRecent(10),
          offlineStorage.videos.getRecent(5)
        ]);
        setArticles(cachedArticles);
        setVideos(cachedVideos);
      } catch (error) {
        console.error('Failed to load cached content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [isOffline, router, isLoading]);

  // Show proper loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error if offline mode is not supported
  if (!isSupported) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Offline mode is not supported in this browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You&apos;re currently offline. Showing cached content.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cached Articles ({cachedContent?.articles ?? 0})</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <div key={article.url} className="bg-white rounded-lg shadow-md overflow-hidden">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                  <p className="text-gray-600">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No cached articles available.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Cached Videos ({cachedContent?.videos ?? 0})</h2>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No cached videos available.</p>
        )}
      </div>
    </div>
  );
}
