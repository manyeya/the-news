import { CATEGORIES } from './constants';

export interface VideoNews {
  id: string;
  title: string;
  link: string;
  description: string;
  publishDate: string;
  thumbnail: string;
  channel: {
    id: string;
    title: string;
  };
  category: keyof typeof CATEGORIES;
}

export interface VideoNewsResponse {
  items: VideoNews[];
  category: keyof typeof CATEGORIES;
}

export interface VideoNewsParams {
  category?: keyof typeof CATEGORIES;
  limit?: number;
}

// RSS Feed Types
export interface RssFeed {
  feed: {
    entry: RssEntry[];
  };
}

export interface RssEntry {
  'yt:videoId'?: string;
  videoId?: string;
  title: string | { '#text': string };
  'media:group'?: {
    'media:description': string;
    'media:thumbnail': Array<{ '@_url': string }>;
  };
  mediaGroup?: {
    description: string;
    thumbnail: Array<{ '@_url': string }>;
  };
  description?: string;
  published?: string;
  pubDate?: string;
  author?: {
    name: string;
    uri: string;
  } | string;
}
