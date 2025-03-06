import { useState, useCallback, useEffect } from 'react';
import { offlineStorage } from '../storage';
import { Article } from '../../news/types';

export function useArticleOffline(article: Article) {
    const [isSaved, setIsSaved] = useState(false);

    // Check if article is saved on mount
    useEffect(() => {
        const checkSaved = async () => {
            const saved = await offlineStorage.articles.get(article.title);
            setIsSaved(!!saved);
        };
        checkSaved();
    }, [article.title]);

    const saveArticle = useCallback(async () => {
        await offlineStorage.articles.save(article.title, article);
        setIsSaved(true);
    }, [article]);

    const removeArticle = useCallback(async () => {
        await offlineStorage.articles.remove(article.title);
        setIsSaved(false);
    }, [article]);

    return {
        isSaved,
        saveArticle,
        removeArticle
    };
}
