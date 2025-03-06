"use client";

import { useArticleOffline } from "@/lib/services/offline/hooks/useArticleOffline";
import { Button } from "./ui/button";
import { Article } from "@/lib/services/news/types";
import { BookmarkIcon } from "lucide-react";

export function SaveOfflineButton({ article }: { article: Article }) {
  const { isSaved, saveArticle, removeArticle } = useArticleOffline(article);

  const handleClick = async () => {
    if (isSaved) {
      await removeArticle();
    } else {
      await saveArticle();
    }
  };

  return (
    <Button
      variant={isSaved ? "secondary" : "outline"}
      size="sm"
      className="flex items-center gap-2"
      onClick={handleClick}
    >
      <BookmarkIcon size={16} className={isSaved ? "fill-current" : ""} />
      {isSaved ? "Saved Offline" : "Save Offline"}
    </Button>
  );
}
