'use client';

import { useQuery } from '@tanstack/react-query';
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

const processQueryResult = (result: ReturnType<typeof useQuery<NewsResponse, Error>>): UseNewsResult => {
  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
  };
};

export function useTopHeadlines(params?: TopHeadlinesParams): UseNewsResult {
  const result = useQuery<NewsResponse, Error>({
    queryKey: ['topHeadlines', params],
    queryFn: () => getTopHeadlines(params),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    retry: (failureCount, error) => {
      if (error.message.includes('429')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: RETRY_DELAY,
  });

  return processQueryResult(result);
}

export function useSearchNews(params: SearchNewsParams): UseNewsResult {
  const result = useQuery<NewsResponse, Error>({
    queryKey: ['searchNews', params],
    queryFn: () => searchNews(params),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!params.query,
    retry: (failureCount, error) => {
      if (error.message.includes('429')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: RETRY_DELAY,
  });

  return processQueryResult(result);
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
