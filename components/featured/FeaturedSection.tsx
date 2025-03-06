"use client"

import FeaturedCard from "./FeaturedCard";
import { useSearchNews } from "@/lib/services/news/hooks/useNews";
import { FeaturedCardSkeleton } from "./FeaturedCardSkeleton";
import Marquee from "../Marquee";
import { SectionHeading } from "../ui/section-heading";
import { generateArticleUrl } from "@/lib/utils";


export default function FeaturedSection() {
    const { data, isLoading, isError } = useSearchNews({ sortBy:'relevancy',query:"Featured",pageSize: 8 });
    const articles = data?.articles.slice(0, 3) || [];
    const marqueeTitles = data?.articles.slice(3, 8).map((article) => article.title);
    if (isLoading) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    <div className="relative border-b pb-3">
                        <div className="flex items-center gap-4">
                            <SectionHeading title="Featured" variant={'yellow'}/>
                            <div className="flex-1 h-[48px] bg-gray-100 animate-pulse rounded" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeaturedCardSkeleton size="medium" />
                        <FeaturedCardSkeleton size="medium" />
                        <FeaturedCardSkeleton size="medium" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="bg-red-50 p-6 rounded-sm">
                    <div className="text-center">
                        <p className="font-serif text-lg text-red-800">Unable to load featured stories</p>
                        <p className="text-sm text-red-600 mt-2">Please check your connection and try again</p>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className="max-w-screen-xl mx-auto px-4">
        <div className="space-y-8">
            {/* Header with Marquee */}
            <div className="relative border-b pb-3">
                <div className="flex items-center gap-4">
                    <SectionHeading title="Featured" variant={'yellow'}/>
                    <div className="flex-1 rounded-sm overflow-hidden">
                        <Marquee titles={marqueeTitles!} />
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <FeaturedCard
                        key={index}
                        size={'medium'}
                        title={article.title}
                        description={article.description}
                        imageUrl={article.urlToImage}
                        link={generateArticleUrl(article,"General")}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}
