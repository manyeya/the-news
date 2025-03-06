"use client"

import FeaturedCard from "./FeaturedCard";
import Marquee from "./Marquee";
import { SectionHeading } from "./ui/section-heading";
import { useSearchNews } from "@/lib/services/news/hooks/useNews";


export default function FeaturedSection() {
    const { data, isLoading, isError } = useSearchNews({ sortBy:'relevancy',query:"Featured",pageSize: 8 });
    const articles = data?.articles.slice(0, 3) || [];
    const marqueeTitles = data?.articles.slice(3, 8).map((article) => article.title);
    if (isLoading) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="text-center">Loading...</div>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="text-center text-red-600">
                    Error loading news. Please try again later.
                </div>
            </div>
        )
    }
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="relative border-b pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
            <SectionHeading title="Featured" variant={'gray'}/>
            <div className="flex-1 w-full h-[48px] rounded-md overflow-hidden">
              <Marquee
                titles={marqueeTitles!}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ">
        {articles.map((article, index) => (
          <FeaturedCard
            key={index}
            title={article.title}
            imageUrl={article.urlToImage}
          />
        ))}
      </div>
    </div>
  )
}
