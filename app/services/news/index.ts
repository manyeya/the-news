'use server';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY; 

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type TopHeadlinesParams = {
  country?: string;
  category?: string;
  query?: string;
  pageSize?: number;
  page?: number;
};

export type SearchNewsParams = {
  query: string;
  from?: string;
  to?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
};

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
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json();
}

export type { Article, NewsResponse };
