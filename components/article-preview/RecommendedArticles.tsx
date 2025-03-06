"use client"

import React from "react";
import { useRecommendedArticles } from "@/lib/services/news/hooks/useRecommendedArticles";
import ArticlePreviewCard from "./ArticlePreviewCard";
import { SectionHeading } from "../ui/section-heading";

interface RecommendedArticlesProps {
  title: string;
  content: string;
}

export function RecommendedArticles({ title, content }: RecommendedArticlesProps) {
  const recommendations = useRecommendedArticles({ title, content });

  // Don't render anything if no recommendations
  if (recommendations.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container space-y-6">
        <SectionHeading title="Articles You Might Like" />
        
        {/* Grid of recommended articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((article) => (
            <ArticlePreviewCard
              key={article._id}
              title={article.title}
              description={article.content}
              imageUrl={article.imageUrl ?? ""}
              href={`/article/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
