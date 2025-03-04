'use server';

import { XMLParser } from 'fast-xml-parser';
import { NEWS_SOURCES, SOURCE_CATEGORIES, CATEGORIES } from './constants';
import type { VideoNews, VideoNewsParams, VideoNewsResponse, RssFeed, RssEntry } from './types';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => ['entry'].includes(name),
  removeNSPrefix: true
});

const transformRssEntry = (entry: RssEntry, sourceKey: keyof typeof NEWS_SOURCES): VideoNews => {
  try {
    // Extract video ID
    const videoId = entry.videoId || entry['yt:videoId'] || '';
    if (!videoId) {
      throw new Error('No video ID found in entry');
    }

    // Extract title
    const title = typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || 'Untitled';

    // Extract description
    let description = '';
    if (entry['media:group']) {
      description = entry['media:group']['media:description'];
    } else if (entry.mediaGroup) {
      description = entry.mediaGroup.description;
    } else {
      description = entry.description || '';
    }

    // Extract thumbnail
    let thumbnail = '';
    if (entry['media:group']?.['media:thumbnail']?.[0]) {
      thumbnail = entry['media:group']['media:thumbnail'][0]['@_url'];
    } else if (entry.mediaGroup?.thumbnail?.[0]) {
      thumbnail = entry.mediaGroup.thumbnail[0]['@_url'];
    }
    if (!thumbnail) {
      thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }

    // Extract channel info
    let channelId = 'unknown';
    let channelTitle = 'Unknown Channel';
    if (typeof entry.author === 'object' && entry.author) {
      channelId = entry.author.uri.split('/').pop() || 'unknown';
      channelTitle = entry.author.name;
    } else if (typeof entry.author === 'string') {
      channelTitle = entry.author;
    }

    // Extract publish date
    const publishDate = entry.published || entry.pubDate || new Date().toISOString();

    return {
      id: videoId,
      title,
      link: `https://www.youtube.com/watch?v=${videoId}`,
      description,
      publishDate,
      thumbnail,
      channel: {
        id: channelId,
        title: channelTitle
      },
      category: SOURCE_CATEGORIES[sourceKey]
    };
  } catch (error) {
    console.error('Error transforming RSS entry:', error, entry);
    throw error;
  }
};

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 300 } // Cache for 5 minutes
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) return response;
      
      console.warn(`Attempt ${i + 1}/${retries} failed for ${url}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.warn(`Attempt ${i + 1}/${retries} failed for ${url}:`, error);
      if (i === retries - 1) throw error;
    }
    
    // Exponential backoff
    await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 5000)));
  }
  
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

async function fetchRssFeed(url: string): Promise<RssFeed> {
  try {
    console.log(`Fetching RSS feed from: ${url}`);
    const response = await fetchWithRetry(url);
    const xml = await response.text();
    
    if (!xml || xml.trim().length === 0) {
      throw new Error('Received empty response');
    }
    
    console.log(`Received XML response length: ${xml.length}`);
    
    let parsed: RssFeed;
    try {
      parsed = parser.parse(xml);
    } catch (parseError) {
      console.error('Failed to parse XML:', parseError);
      throw new Error('Invalid RSS feed format');
    }
    
    if (!parsed?.feed?.entry) {
      console.warn('No entries found in feed');
      return { feed: { entry: [] } };
    }
    
    console.log('Parsed RSS feed:', {
      hasEntries: true,
      entryCount: Array.isArray(parsed.feed.entry) ? parsed.feed.entry.length : 1
    });
    
    return parsed;
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error);
    return { feed: { entry: [] } };
  }
}

async function fetchSourceVideos(sourceKey: keyof typeof NEWS_SOURCES, limit?: number): Promise<VideoNews[]> {
  console.log(`Fetching videos for source: ${sourceKey}`);
  const feed = await fetchRssFeed(NEWS_SOURCES[sourceKey]);
  
  if (!feed.feed?.entry) {
    console.warn(`No entries found for source: ${sourceKey}`);
    return [];
  }
  
  const entries = Array.isArray(feed.feed.entry) ? feed.feed.entry : [feed.feed.entry];
  console.log(`Processing ${entries.length} entries for source: ${sourceKey}`);
  
  const videos = entries
    .slice(0, limit)
    .map(entry => transformRssEntry(entry, sourceKey));
  
  console.log(`Transformed ${videos.length} videos for source: ${sourceKey}`);
  return videos;
}

export async function getVideoNews(params: VideoNewsParams = {}): Promise<VideoNewsResponse> {
  console.log('getVideoNews called with params:', params);
  const { category = CATEGORIES.ALL, limit = 10 } = params;
  
  try {
    // Get relevant sources for the category
    const relevantSources = Object.keys(NEWS_SOURCES).filter(source => 
      category === CATEGORIES.ALL || SOURCE_CATEGORIES[source as keyof typeof NEWS_SOURCES] === category
    ) as Array<keyof typeof NEWS_SOURCES>;

    // Fetch videos from all relevant sources in parallel with timeout
    const fetchPromises = relevantSources.map(async source => {
      try {
        return await Promise.race([
          fetchSourceVideos(source, limit),
          new Promise<VideoNews[]>((_, reject) => setTimeout(() => reject(new Error(`Timeout fetching ${source}`)), 10000)
          )
        ]);
      } catch (error) {
        console.error(`Failed to fetch videos from ${source}:`, error);
        return [] as VideoNews[];
      }
    });

    const allVideos = await Promise.all(fetchPromises);

    // Combine and sort by publish date, filter out any invalid dates
    const items = allVideos
      .flat()
      .filter(video => !isNaN(new Date(video.publishDate).getTime()))
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit);

    if (items.length === 0) {
      console.warn('No videos found for the specified category');
    }

    return {
      items,
      category
    };
  } catch (error) {
    console.error('Error in getVideoNews:', error);
    return {
      items: [],
      category
    };
  }
}

export async function getLatestVideos(limit: number = 10): Promise<VideoNewsResponse> {
  return getVideoNews({ category: CATEGORIES.ALL, limit });
}

export async function getVideosByCategory(
  category: keyof typeof CATEGORIES,
  limit: number = 10
): Promise<VideoNewsResponse> {
  return getVideoNews({ category, limit });
}

export type { VideoNews, VideoNewsResponse, VideoNewsParams };
