import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface UseRecommendedArticlesProps {
  title: string;
  content: string;
}

export function useRecommendedArticles({ title, content }: UseRecommendedArticlesProps) {
  // Get similar articles based on content
  const similar = useQuery(api.articleInteractions.getSimilarArticles, {
    title,
    content,
  });
  
  // If no similar articles found, return empty array
  if (!similar) return [];
  
  // Filter out current article (which would have highest similarity score)
  return similar.filter(article => article.title !== title);
}
