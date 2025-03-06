'use server';

import { TopHeadlinesParams, NewsResponse, SearchNewsParams, Article } from "./types";

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY; 

export async function getTopHeadlines(params?: TopHeadlinesParams): Promise<NewsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.country) searchParams.append('country', params.country);
  if (params?.category) searchParams.append('category', params.category);
  if (params?.query) searchParams.append('q', params.query);
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString());
  if (params?.page) searchParams.append('page', params.page.toString());

  const response = await fetch(
    `${NEWS_API_BASE_URL}/top-headlines?${searchParams.toString()}`,
    {
      headers: {
        'X-Api-Key': NEWS_API_KEY || '',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json();
}

export async function searchNews(params: SearchNewsParams): Promise<NewsResponse> {
  const searchParams = new URLSearchParams();
  searchParams.append('q', params.query);
  if (params.from) searchParams.append('from', params.from);
  if (params.to) searchParams.append('to', params.to);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
  if (params.page) searchParams.append('page', params.page.toString());

  const response = await fetch(
    `${NEWS_API_BASE_URL}/everything?${searchParams.toString()}`,
    {
      headers: {
        'X-Api-Key': NEWS_API_KEY || '',
      },
      next: { revalidate: 300 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json();
}

export type { Article, NewsResponse };
