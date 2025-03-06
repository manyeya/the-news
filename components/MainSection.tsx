"use client"

import { useSearchNews } from "@/lib/services/news/hooks/useNews"
import { SectionHeading } from "./ui/section-heading"
import { clean, generateArticleUrl } from "@/lib/utils"
import FeaturedCard from "./featured/FeaturedCard"
import { FeaturedCardSkeleton } from "./featured/FeaturedCardSkeleton"

export default function MainSection() {
  const { data, isLoading, isError } = useSearchNews({
    query: "news",
    sortBy: "publishedAt",
    pageSize: 3
  })

  if (isLoading) return <FeaturedCardSkeleton />
  if (isError) return null

  const mainArticle = data?.articles.find(article => article.urlToImage)
  if (!mainArticle) return null

  return (
    <div>
      <SectionHeading title="Just In" />
      <div className="mt-4 ">
        <FeaturedCard
          size="large"
          title={clean(mainArticle.title)}
          description={mainArticle.description}
          imageUrl={mainArticle.urlToImage}
          link={generateArticleUrl(mainArticle, "General")}
        />
      </div>
    </div>
  )
}
