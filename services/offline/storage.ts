import { openDB, DBSchema } from 'idb';
import { Article } from '../news/types';

interface NewsDBSchema extends DBSchema {
  articles: {
    key: string;
    value: {
      id: string;
      content: Article;
      timestamp: number;
    };
    indexes: {
      'by-timestamp': number;
    };
  };
}
const DB_NAME = 'the-news';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB<NewsDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create articles store with timestamp index
      const articlesStore = db.createObjectStore('articles', { keyPath: 'id' });
      articlesStore.createIndex('by-timestamp', 'timestamp');
    },
  });
};

const getDB = (() => {
  let dbPromise: ReturnType<typeof initDB> | null = null;
  return () => {
    if (!dbPromise) {
      dbPromise = initDB();
    }
    return dbPromise;
  };
})();

export const offlineStorage = {
  articles: {
    async save(id: string, content: Article): Promise<void> {
      const db = await getDB();
      await db.put('articles', {
        id,
        content,
        timestamp: Date.now(),
      });
    },

    async get(id: string): Promise<Article | null> {
      const db = await getDB();
      const item = await db.get('articles', id);
      return item?.content ?? null;
    },

    async list(): Promise<string[]> {
      const db = await getDB();
      return db.getAllKeys('articles');
    },

    async getRecent(limit = 10): Promise<Article[]> {
      const db = await getDB();
      const items = await db.getAllFromIndex('articles', 'by-timestamp');
      return items
        .sort((a: NewsDBSchema['articles']['value'], b: NewsDBSchema['articles']['value']) => b.timestamp - a.timestamp)
        .slice(0, limit)
        .map((item: NewsDBSchema['articles']['value']) => item.content);
    },

    async remove(id: string): Promise<void> {
      const db = await getDB();
      await db.delete('articles', id);
    },

    async clear(): Promise<void> {
      const db = await getDB();
      await db.clear('articles');
    }
  },

  async clearAll(): Promise<void> {
    const db = await getDB();
    await Promise.all([
      db.clear('articles'),
    ]);
  },

  async getStorageInfo(): Promise<{ articles: number; }> {
    const db = await getDB();
    const [articleCount] = await Promise.all([
      db.count('articles'),
    ]);
    return {
      articles: articleCount,
    };
  }
};
