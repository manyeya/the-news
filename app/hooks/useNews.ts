'use client';

import { useQuery } from '@tanstack/react-query';
import { getTopHeadlines, searchNews } from '../services/news';

export function useTopHeadlines(params?: {
  country?: string;
  category?: string;
  query?: string;
  pageSize?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: ['topHeadlines', params],
    queryFn: () => getTopHeadlines(params),
  });
}

export function useSearchNews(params: {  
  query: string;
  from?: string;
  to?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: ['searchNews', params],
    queryFn: () => searchNews(params),
    enabled: !!params.query, // Only run query if search query exists
  });
}
