'use client';

import { useQuery } from '@tanstack/react-query';
import { 
  getTopHeadlines, 
  searchNews,
  type TopHeadlinesParams,
  type SearchNewsParams 
} from '..';

export function useTopHeadlines(params?: TopHeadlinesParams) {
  return useQuery({
    queryKey: ['topHeadlines', params],
    queryFn: () => getTopHeadlines(params),
  });
}

export function useSearchNews(params: SearchNewsParams) {
  return useQuery({
    queryKey: ['searchNews', params],
    queryFn: () => searchNews(params),
    enabled: !!params.query, // Only run query if search query exists
  });
}
