"use client";

import { useSearchNews } from "@/lib/services/news/hooks/useNews";
import ArticlePreviewCard from "./ArticlePreviewCard";
import { SectionHeading } from "../ui/section-heading";
import { ArticlePreviewSkeleton } from "./ArticlePreviewSkeleton";
import { generateArticleUrl } from "@/lib/utils";

interface GridSectionProps {
    columns?: number;
    rows?: number;
}

export default function GridSection({ columns = 4, rows = 2 }: GridSectionProps) {
    const { data, isLoading, isError } = useSearchNews({
        query: "breaking news",
        pageSize: columns * rows,
    });

    if (isLoading) {
        return (
            <section className="container mx-auto py-8">
                <SectionHeading title="Breaking News" variant={'gray'} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(columns * rows)
                        .fill(0)
                        .map((_, index) => (
                            <ArticlePreviewSkeleton key={index} />
                        ))}
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="container mx-auto py-8">
                <SectionHeading title="Breaking News" />
                <div className="text-center py-8 text-gray-500">
                    Failed to load breaking news
                </div>
            </section>
        );
    }

    const articles = data?.articles || [];

    return (
        <section className="container mx-auto py-8">
            <SectionHeading title="Breaking News" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {articles.map((article, index) => (
                    <ArticlePreviewCard
                        key={index}
                        title={article.title}
                        description={article.description}
                        imageUrl={article.urlToImage}
                        href={generateArticleUrl(article,"General")}
                        variant="compact"
                    />
                ))}
            </div>
        </section>
    );
}
