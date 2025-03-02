'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getTopHeadlines, searchNews } from '..';
import type { TopHeadlinesParams, SearchNewsParams, NewsResponse } from '../types';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 30 * 60 * 1000; // 30 minutes
const RETRY_DELAY = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000);

interface UseNewsResult {
  data: NewsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

// Common query configuration for news API requests
const createNewsQueryConfig = (
  queryKey: unknown[],
  queryFn: () => Promise<NewsResponse>,
  options?: Partial<UseQueryOptions<NewsResponse, Error>>
): UseQueryOptions<NewsResponse, Error> => ({
  queryKey,
  queryFn,
  staleTime: STALE_TIME,
  gcTime: CACHE_TIME,
  retry: (failureCount: number, error: Error) => {
    if (error.message.includes('429')) {
      return false; // Don't retry on rate limit
    }
    return failureCount < 3;
  },
  retryDelay: RETRY_DELAY,
  ...options,
});

export function useTopHeadlines(params?: TopHeadlinesParams): UseNewsResult {
  const result = useQuery<NewsResponse, Error>(
    createNewsQueryConfig(['topHeadlines', params], () => getTopHeadlines(params))
  );

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError
  };
}

export function useSearchNews(params: SearchNewsParams): UseNewsResult {
  const result = useQuery<NewsResponse, Error>(
    createNewsQueryConfig(
      ['searchNews', params],
      () => searchNews(params),
      { enabled: !!params.query }
    )
  );

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError
  };
}

export function useEntertainmentNews(params?: Omit<TopHeadlinesParams, 'category'>): UseNewsResult {
  return useTopHeadlines({ ...params, category: 'entertainment' });
}

export function useWorldNews(params?: Omit<TopHeadlinesParams, 'category'>): UseNewsResult {
  return useTopHeadlines({ ...params, category: 'world' });
}

export function useMostPopular(params?: Partial<SearchNewsParams>): UseNewsResult {
  return useSearchNews({
    query: params?.query || 'news',
    sortBy: 'popularity',
    ...params,
  });
}

export function useFeaturedStories(params?: TopHeadlinesParams): UseNewsResult {
  return useTopHeadlines({
    ...params,
    pageSize: 5, // Limit to 5 featured stories
  });
}
