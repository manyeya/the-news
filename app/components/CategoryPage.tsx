"use client"

import { useTopHeadlines } from "@/lib/services/news/hooks/useNews"
import { NewsCategory } from "@/lib/services/news/types"
import ArticleCard from "@/components/article-preview/ArticlePreviewCard"

interface CategoryPageProps {
  category: keyof typeof NewsCategory
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const { data, isLoading, isError } = useTopHeadlines({ category })

  if (isError) {
    return (
      <div>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Error loading news. Please try again later.
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif mb-8 border-b pb-4">
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {data?.articles.map((article, index) => (
            <ArticleCard
              key={index}
              variant="full"
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              href={`/article/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}?` +
                new URLSearchParams({
                  title: article.title,
                  description: article.description || '',
                  imageUrl: article.urlToImage || '',
                  content: article.content || '',
                  author: article.author || '',
                  publishedAt: article.publishedAt,
                  sourceName: article.source.name,
                  category: category
                }).toString()}
            />
          ))}
        </div>
      </main>
    </div>
  )
}