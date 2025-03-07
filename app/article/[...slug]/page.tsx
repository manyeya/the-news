"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { SaveOfflineButton } from "@/components/SaveOfflineButton";
import { NewsCategory } from "@/lib/services/news/types";
import { ClientArticle } from "./ClientArticle";
import { useSearchParams } from "next/navigation";

const categoryToEnum = (category: string): keyof typeof NewsCategory => {
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  if (Object.keys(NewsCategory).includes(formattedCategory)) {
    return formattedCategory as keyof typeof NewsCategory;
  }
  return "General";
};

export default function ArticlePage() {

  const searchParams = useSearchParams()
  const { title, description, imageUrl, content, author, sourceName, category, publishedAt } = Object.fromEntries(searchParams);
  const date = new Date(publishedAt);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <div>
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link href={`/category/${category.toLowerCase()}`} className="hover:text-gray-700">
              {category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Article</span>
          </nav>

          {/* Article Header */}
          <h1 className="text-4xl font-serif font-bold mb-4">{title}</h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-sm text-gray-500">
              <span>{author ? `By ${author}` : sourceName}</span>
              <span className="mx-2">•</span>
              <time dateTime={publishedAt}>{timeAgo}</time>
            </div>
            <SaveOfflineButton
              article={{
                title,
                description,
                url: '',
                urlToImage: imageUrl,
                content,
                author,
                publishedAt,
                source: {
                  id: sourceName.toLowerCase(),
                  name: sourceName
                },
                category: categoryToEnum(category)
              }}
            />
          </div>

          {/* Article Image */}
          {imageUrl && (
            <div className="relative aspect-video mb-8">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">{description}</p>
            <div className="whitespace-pre-line">{content}</div>
          </div>

          <ClientArticle
            title={title}
            content={content}
            author={author}
            imageUrl={imageUrl}
          />

          {/* Source Attribution */}
          <div className="mt-8 pt-4 border-t text-sm text-gray-500">
            Source: {sourceName}
          </div>
        </div>
      </main>
    </div>
  );
}
