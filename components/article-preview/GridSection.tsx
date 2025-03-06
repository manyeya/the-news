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
            <section className="container mx-auto px-4 py-8">
                <SectionHeading title="Breaking News" />
                <div className="grid gap-4" style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}>
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
            <section className="container mx-auto px-4 py-8">
                <SectionHeading title="Breaking News" />
                <div className="text-center py-8 text-gray-500">
                    Failed to load breaking news
                </div>
            </section>
        );
    }

    const articles = data?.articles || [];
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: "1rem",
    };

    return (
        <section className="container mx-auto py-8">
            <SectionHeading title="Breaking News" />
            <div style={gridStyle}>
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
