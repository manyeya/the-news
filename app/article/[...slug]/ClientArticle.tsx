"use client";

import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
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
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { isSignedIn } = useUser();
    
    const existingArticleId = useQuery(api.articleInteractions.getArticleIdBySlug, {
        slug
    });

    const getOrCreateArticle = useMutation(api.articleInteractions.getOrCreateArticle);

    useEffect(() => {
        // Only try to create article if logged in and no existing article
        const initArticle = async () => {
            if (!isSignedIn || existingArticleId) return;

            try {
                await getOrCreateArticle({
                    title,
                    slug,
                    content,
                    author,
                    imageUrl,
                });
            } catch (error) {
                console.error('Error initializing article:', error);
            }
        };

        initArticle();
    }, [getOrCreateArticle, title, content, author, imageUrl, isSignedIn, existingArticleId, slug]);

    // Don't render anything if we don't have an article ID
    if (!existingArticleId) return null;

    return <ArticleInteractions articleId={existingArticleId} />;
}
