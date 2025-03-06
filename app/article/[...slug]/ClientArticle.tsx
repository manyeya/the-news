"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { ArticleInteractions } from "@/components/article-preview/ArticleInteractions";

interface ClientArticleProps {
    title: string;
    content: string;
    author?: string;
    imageUrl?: string;
}

export function ClientArticle({
    title,
    content,
    author,
    imageUrl,
}: ClientArticleProps) {
    const [articleId, setArticleId] = useState<Id<"articles"> | null>(null);
    const getOrCreateArticle = useMutation(api.articleInteractions.getOrCreateArticle);

    useEffect(() => {
        const initArticle = async () => {
            const id = await getOrCreateArticle({
                title,
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                content,
                author,
                imageUrl,
            });
            setArticleId(id);
        };

        initArticle();
    }, [getOrCreateArticle, title, content, author, imageUrl]);

    if (!articleId) return null;

    return <ArticleInteractions articleId={articleId} />;
}
