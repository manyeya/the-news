'use client';

import { useTopHeadlines } from "@/app/services/news/hooks/useNews";
import type { Article } from "@/app/services/news";

export default function NewsSection() {
  const { data, isLoading, error } = useTopHeadlines({
    country: 'us',
    pageSize: 10
  });

  if (isLoading) {
    return <div>Loading news...</div>;
  }

  if (error) {
    return <div>Error loading news: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Top Headlines</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.articles.map((article: Article) => (
          <article 
            key={article.url} 
            className="p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{article.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{article.source.name}</span>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
