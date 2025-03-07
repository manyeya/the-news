"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import Title from "../../components/ui/title";
import Description from "../../components/ui/description";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import ArticlePreviewCard from "../../components/article-preview/ArticlePreviewCard";

export default function LikedArticles() {
  const likedArticles = useQuery(api.articleInteractions.getLikedArticles);

  return (
    <div className="container mx-auto px-4 py-8">
      <Title text="Liked Articles" />
      <Description text="Browse your collection of liked articles from The News" />

      <SignedIn>
        {likedArticles?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              You haven&apos;t liked any articles yet
            </p>
            <Link
              href="/"
              className="text-brand-blue hover:text-brand-blue/80 transition-colors"
            >
              Browse articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {likedArticles?.map((article) => (
              <ArticlePreviewCard
                key={article._id}
                title={article.title}
                href={`/article/${article.slug}`}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Sign in to view your liked articles
          </p>
          <SignInButton mode="modal">
            <button className="px-6 py-2 rounded-md bg-brand-blue text-white hover:bg-brand-blue/80 transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
