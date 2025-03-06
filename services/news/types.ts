export enum NewsCategory {
  Business = 'business',
  Entertainment = 'entertainment',
  General = 'general',
  Health = 'health',
  Science = 'science',
  Sports = 'sports',
  Technology = 'technology',
}

export interface Article {
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
  category?: keyof typeof NewsCategory;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type TopHeadlinesParams = {
  country?: string;
  category?: keyof typeof NewsCategory;
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
