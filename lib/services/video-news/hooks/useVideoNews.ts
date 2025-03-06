'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getVideoNews, getLatestVideos, getVideosByCategory } from '..';
import type { VideoNewsParams, VideoNewsResponse } from '../types';
import { CATEGORIES } from '../constants';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 30 * 60 * 1000; // 30 minutes
const RETRY_DELAY = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000);

interface VideoNewsResult {
  data: VideoNewsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

// Common query configuration for video news API requests
const createVideoNewsQueryConfig = (
  queryKey: unknown[],
  queryFn: () => Promise<VideoNewsResponse>,
  options?: Partial<UseQueryOptions<VideoNewsResponse, Error>>
): UseQueryOptions<VideoNewsResponse, Error> => ({
  queryKey,
  queryFn,
  staleTime: STALE_TIME,
  gcTime: CACHE_TIME,
  retry: 3,
  retryDelay: RETRY_DELAY,
  ...options,
});

export function useVideoNews(params?: VideoNewsParams): VideoNewsResult {
  const result = useQuery<VideoNewsResponse, Error>(
    createVideoNewsQueryConfig(['videoNews', params], () => getVideoNews(params))
  );

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError
  };
}

export function useLatestVideos(limit?: number): VideoNewsResult {
  const result = useQuery<VideoNewsResponse, Error>(
    createVideoNewsQueryConfig(['latestVideos', limit], () => getLatestVideos(limit))
  );

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError
  };
}

export function useCategoryVideos(category: keyof typeof CATEGORIES, limit?: number): VideoNewsResult {
  const result = useQuery<VideoNewsResponse, Error>(
    createVideoNewsQueryConfig(
      ['categoryVideos', category, limit],
      () => getVideosByCategory(category, limit)
    )
  );

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError
  };
}

