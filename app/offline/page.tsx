/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { offlineStorage } from '@/lib/services/offline/storage';
import { Article } from '@/lib/services/news/types';
import { useOfflineSupport } from '@/lib/services/offline/hooks/useOfflineSupport';

export default function OfflinePage() {
  const router = useRouter();
  const { isOffline, isSupported, cachedContent } = useOfflineSupport();
  const [articles, setArticles] = useState<Article[]>([]);
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
        const [cachedArticles] = await Promise.all([
          offlineStorage.articles.getRecent(10),
        ]);
        setArticles(cachedArticles);
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
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 w-48 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 w-32 mx-auto"></div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Featured article skeleton */}
            <div className="mb-8">
              <div className="h-[400px] bg-gray-200 mb-4 w-full"></div>
              <div className="h-8 bg-gray-200 w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 w-2/3 mb-3"></div>
              <div className="h-4 bg-gray-200 w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 w-24"></div>
            </div>

            {/* Grid articles skeleton */}
            <div className="grid grid-cols-12 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="h-48 bg-gray-200 mb-4"></div>
                  <div className="h-6 bg-gray-200 w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
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
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-sm text-yellow-800">
                You&apos;re viewing cached content offline. ({cachedContent?.articles ?? 0} articles available)
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {articles.length > 0 ? (
          <div className="space-y-12">
            {articles.map((article, index) => (
              <article 
                key={`${article.url}-${index}`} 
                className="border-b border-gray-200 pb-12 last:border-b-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {article.urlToImage && (
                    <div className="lg:col-span-6">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className={article.urlToImage ? "lg:col-span-6" : "lg:col-span-12"}>
                    <h2 className="font-serif text-3xl mb-4">{article.title}</h2>
                    <div className="text-gray-500 text-sm mb-4">
                      By {article.author || 'Unknown'} • {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                    <p className="text-gray-600 text-lg mb-6">{article.description}</p>
                    <div className="prose max-w-none">
                      {article.content}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cached articles available.</p>
            <p className="text-gray-400 mt-2">Save articles when online to read them later.</p>
          </div>
        )}
      </main>

    </div>
  );
}
