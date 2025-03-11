"use client"

import { useTopHeadlines } from "@/lib/services/news/hooks/useNews"
import { NewsCategory } from "@/lib/services/news/types"
import ArticleCard from "@/components/article-preview/ArticlePreviewCard"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from "next/navigation"



export default function CategoryPage() {
  const params = useParams()
  const category = params.category as keyof typeof NewsCategory
  const { data, isLoading, isError } = useTopHeadlines({ category: category })

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
            className="space-y-12"
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
            {/* Featured Article Skeleton */}
            <motion.div
              className="border-b pb-12"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="space-y-4 mt-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </motion.div>

            {/* Main Grid Section Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Standard Articles Skeleton */}
              <div className="lg:col-span-2 space-y-12">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                    <div className="space-y-3 mt-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column Skeleton */}
              <div className="space-y-8">
                {/* Opinion Section Skeleton */}
                <div className="space-y-6">
                  <Skeleton className="h-6 w-24" />
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={`opinion-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="space-y-3"
                    >
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                    </motion.div>
                  ))}
                </div>

                {/* Latest Updates Skeleton */}
                <div className="space-y-6">
                  <Skeleton className="h-6 w-32" />
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`compact-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="flex gap-4"
                    >
                      <Skeleton className="h-20 w-20 flex-shrink-0" />
                      <Skeleton className="h-5 w-2/3" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
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
        <div className="space-y-12">
          {/* Featured Article */}
          {data?.articles[0] && (
            <div className="border-b pb-12">
              <ArticleCard
                key="featured"
                variant="nyt-featured"
                title={data.articles[0].title}
                description={data.articles[0].description}
                imageUrl={data.articles[0].urlToImage}
                href={`/article/${encodeURIComponent(data.articles[0].title.toLowerCase().replace(/\s+/g, '-'))}?` +
                  new URLSearchParams({
                    title: data.articles[0].title,
                    description: data.articles[0].description || '',
                    imageUrl: data.articles[0].urlToImage || '',
                    content: data.articles[0].content || '',
                    author: data.articles[0].author || '',
                    publishedAt: data.articles[0].publishedAt,
                    sourceName: data.articles[0].source.name,
                    category: category
                  }).toString()}
              />
            </div>
          )}

          {/* Main Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standard Articles (Left Column) */}
            <div className="lg:col-span-2 space-y-12">
              {data?.articles.slice(1, 5).map((article, index) => (
                <ArticleCard
                  key={index + 1}
                  variant="nyt-standard"
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
                  underLine
                />
              ))}
            </div>

            {/* Right Column (Opinion and Compact) */}
            <div className="space-y-8">
              {/* Opinion Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold font-serif border-b pb-2">Opinion</h2>
                {data?.articles.slice(5, 7).map((article, index) => (
                  <ArticleCard
                    key={`opinion-${index}`}
                    variant="nyt-opinion"
                    title={article.title}
                    description={article.description}
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

              {/* Latest Updates Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold font-serif border-b pb-2">Latest Updates</h2>
                {data?.articles.slice(7).map((article, index) => (
                  <ArticleCard
                    key={`compact-${index}`}
                    variant="nyt-compact"
                    title={article.title}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
