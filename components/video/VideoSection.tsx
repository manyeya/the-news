"use client"

import { cn } from "@/lib/utils"
import type { CATEGORIES } from "@/lib/services/video-news/constants"
import { useCategoryVideos } from "@/lib/services/video-news/hooks/useVideoNews"
import { useState } from "react"
import VideoCard from "./Card/Index"
import LoadingOrError from "./LoadingOrError"

export default function VideoSection() {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>("ALL")
    const { data: category, isLoading, isError } = useCategoryVideos(selectedCategory, 12)
    const categories = [
        { key: "ALL" as keyof typeof CATEGORIES, label: "All" },
        { key: "SOUTH_AFRICAN" as keyof typeof CATEGORIES, label: "South Africa" },
        { key: "INTERNATIONAL" as keyof typeof CATEGORIES, label: "International" },
        { key: "BUSINESS" as keyof typeof CATEGORIES, label: "Business" },
        { key: "TECHNOLOGY" as keyof typeof CATEGORIES, label: "Technology" },
        { key: "SPORTS" as keyof typeof CATEGORIES, label: "Sports" },
    ]

    if (isLoading || isError) return <LoadingOrError isError={isError} categories={categories} />

    return (
        <section className="max-w-screen-xl mx-auto">
            <div className="mb-8">
                <h2 className="text-[1.75rem] font-serif font-bold mb-6">Latest Videos</h2>
                {/* Categories */}
                <div className="overflow-x-auto border-b border-gray-200">
                    <div className="flex space-x-8 min-w-max pb-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setSelectedCategory(cat.key)}
                                className={cn(
                                    "text-sm font-medium hover:text-gray-900 transition-colors relative pb-3",
                                    selectedCategory === cat.key 
                                        ? "text-gray-900 after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-0.5 after:bg-gray-900" 
                                        : "text-gray-500"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {!category?.items?.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 min-h-[600px] bg-gray-200 flex items-center justify-center">
                        <div className="text-gray-500 text-center">
                            <p className="font-semibold text-lg">No videos available</p>
                            <p className="text-sm mt-1">
                                Check back later for updates in the{" "}
                                {categories.find((cat) => cat.key === selectedCategory)?.label.toLowerCase()} category
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="aspect-[4/3] bg-gray-200 w-full" aria-hidden="true" />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        {category.items[0] && (
                            <VideoCard
                                video={{
                                    title: category.items[0].title,
                                    href: category.items[0].link,
                                    thumbnail: category.items[0].thumbnail,
                                    source: category.items[0].channel.title,
                                }}
                                isMain={true}
                            />
                        )}
                    </div>
                    <div className="space-y-6">
                        {category.items.slice(1, 4).map((video, index) => (
                            <VideoCard
                                key={index}
                                video={{
                                    title: video.title,
                                    href: video.link,
                                    thumbnail: video.thumbnail,
                                    source: video.channel.title,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
