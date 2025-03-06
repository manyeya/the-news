"use client"

import { useTopHeadlines } from "@/lib/services/news/hooks/useNews"
import { NewsCategory } from "@/lib/services/news/types"
import ArticleCard from "@/components/article-preview/ArticlePreviewCard"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

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
        <main className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="mb-8 border-b pb-4 flex items-center space-x-4">
            <motion.div
              className="h-9 w-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Skeleton className="h-full w-full" />
            </motion.div>
            
            <motion.div
              className="h-[2px] flex-1 origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Skeleton className="h-full w-full" />
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div className="space-y-3 mt-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif mb-8 border-b pb-4">
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
