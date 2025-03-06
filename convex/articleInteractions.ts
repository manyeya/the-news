import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// ===== ARTICLE MAPPING =====

/**
 * Get article ID by slug (public)
 */
export const getArticleIdBySlug = query({
  args: {
    slug: v.string(),
  },
  returns: v.union(v.id("articles"), v.null()),
  handler: async (ctx, args) => {
    const article = await ctx.db
      .query("articles")
      .withIndex("by_article_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    return article?._id ?? null;
  },
});

/**
 * Create or update article (requires auth)
 */
export const getOrCreateArticle = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    author: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  returns: v.id("articles"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // Check if article already exists
    const existing = await ctx.db
      .query("articles")
      .withIndex("by_article_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    if (existing) {
      return existing._id;
    }

    // Create new article mapping
    return await ctx.db.insert("articles", {
      title: args.title,
      slug: args.slug,
      content: args.content,
      author: args.author,
      imageUrl: args.imageUrl,
      published: true,
      publishedDate: Date.now(),
    });
  },
});

// ===== LIKES =====

/**
 * Toggle like status for an article
 */
export const toggleLike = mutation({
  args: {
    articleId: v.id("articles"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    // Check if article exists
    const article = await ctx.db.get(args.articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    
    // Check if the user has already liked the article
    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_user_id_and_article_id", (q) => 
        q.eq("userId", userId).eq("articleId", args.articleId)
      )
      .unique();
    
    if (existingLike) {
      // Unlike - remove the existing like
      await ctx.db.delete(existingLike._id);
      return false; // Return false to indicate the article is now unliked
    } else {
      // Like - add a new like
      await ctx.db.insert("likes", {
        articleId: args.articleId,
        userId: userId,
        timestamp: Date.now(),
      });
      return true; // Return true to indicate the article is now liked
    }
  },
});

/**
 * Check if a user has liked an article
 */
export const getUserLikeStatus = query({
  args: {
    articleId: v.id("articles"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }
    const userId = identity.subject;

    const like = await ctx.db
      .query("likes")
      .withIndex("by_user_id_and_article_id", (q) => 
        q.eq("userId", userId).eq("articleId", args.articleId)
      )
      .unique();
    
    return !!like;
  },
});

/**
 * Get the total number of likes for an article
 */
export const getLikesCount = query({
  args: {
    articleId: v.id("articles"),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_article_id", (q) => q.eq("articleId", args.articleId))
      .collect();
    
    return likes.length;
  },
});

// ===== COMMENTS =====

/**
 * Add a comment to an article
 */
export const addComment = mutation({
  args: {
    articleId: v.id("articles"),
    content: v.string(),
    parentCommentId: v.optional(v.id("comments")),
  },
  returns: v.id("comments"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;
    const userName = identity.name || "Anonymous";

    // Check if article exists
    const article = await ctx.db.get(args.articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    
    // If it's a reply, check if parent comment exists
    if (args.parentCommentId) {
      const parentComment = await ctx.db.get(args.parentCommentId);
      if (!parentComment) {
        throw new Error("Parent comment not found");
      }
    }
    
    // Add the comment
    return await ctx.db.insert("comments", {
      articleId: args.articleId,
      userId: userId,
      userName: userName,
      content: args.content,
      timestamp: Date.now(),
      parentCommentId: args.parentCommentId,
    });
  },
});

/**
 * Get comments for an article with optional pagination
 */
export const getComments = query({
  args: {
    articleId: v.id("articles"),
    paginationOpts: paginationOptsValidator,
  },
  returns: v.union(
    v.object({
      page: v.array(
        v.object({
          _id: v.id("comments"),
          _creationTime: v.number(),
          articleId: v.id("articles"),
          userId: v.string(),
          userName: v.string(),
          content: v.string(),
          timestamp: v.number(),
          parentCommentId: v.optional(v.id("comments")),
        })
      ),
      isDone: v.boolean(),
      continueCursor: v.optional(v.string()),
      pageStatus: v.optional(v.any()),
      splitCursor: v.optional(v.any()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_article_id", (q) => q.eq("articleId", args.articleId))
      .filter((q) => q.eq(q.field("parentCommentId"), undefined))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

/**
 * Get replies to a specific comment
 */
export const getCommentReplies = query({
  args: {
    commentId: v.id("comments"),
  },
  returns: v.array(
    v.object({
      _id: v.id("comments"),
      _creationTime: v.number(),
      articleId: v.id("articles"),
      userId: v.string(),
      userName: v.string(),
      content: v.string(),
      timestamp: v.number(),
      parentCommentId: v.optional(v.id("comments")),
    })
  ),
  handler: async (ctx, args) => {
    const replies = await ctx.db
      .query("comments")
      .withIndex("by_parent_comment_id", (q) => q.eq("parentCommentId", args.commentId))
      .order("asc")
      .collect();
    
    return replies;
  },
});

// ===== SHARES =====

/**
 * Record a share of an article
 */
export const recordShare = mutation({
  args: {
    articleId: v.id("articles"),
    platform: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    // Check if article exists
    const article = await ctx.db.get(args.articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    
    await ctx.db.insert("shares", {
      articleId: args.articleId,
      userId: userId,
      platform: args.platform,
      timestamp: Date.now(),
    });
    
    return null;
  },
});

/**
 * Get user's liked and shared articles
 */
export const getUserInteractions = query({
  args: {},
  returns: v.array(v.id("articles")),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    // Get user's liked articles
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    // Get user's shared articles
    const shares = await ctx.db
      .query("shares")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    // Combine and dedupe article IDs
    const articleIds = new Set([
      ...likes.map(like => like.articleId),
      ...shares.map(share => share.articleId)
    ]);

    return Array.from(articleIds);
  },
});

/**
 * Get similar articles based on content
 */
export const getSimilarArticles = query({
  args: {
    title: v.string(),
    content: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("articles"),
      _creationTime: v.number(),
      title: v.string(),
      slug: v.string(),
      content: v.string(),
      author: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      published: v.boolean(),
      publishedDate: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    // Get all articles
    const allArticles = await ctx.db.query("articles").collect();

    // Helper function to calculate text similarity score
    const getSimilarityScore = (text1: string, text2: string): number => {
      const words1 = new Set(text1.toLowerCase().split(/\W+/));
      const words2 = new Set(text2.toLowerCase().split(/\W+/));
      const intersection = new Set([...words1].filter(x => words2.has(x)));
      const union = new Set([...words1, ...words2]);
      return intersection.size / union.size;
    };

    // Calculate similarity scores for each article
    const articlesWithScores = allArticles.map(article => {
      const titleScore = getSimilarityScore(args.title, article.title) * 2; // Weight title matches more
      const contentScore = getSimilarityScore(args.content, article.content);
      const totalScore = titleScore + contentScore;
      return { article, score: totalScore };
    });

    // Sort by similarity score and get top 5 most similar
    const recommendations = articlesWithScores
      .sort((a, b) => b.score - a.score) // Sort by highest score
      .filter(item => item.score > 0.1) // Only include if some similarity
      .slice(0, 5) // Limit to 5 recommendations
      .map(item => item.article);

    return recommendations;
  },
});

/**
 * Get total shares for an article
 */
export const getSharesCount = query({
  args: {
    articleId: v.id("articles"),
  },
  returns: v.object({
    total: v.number(),
    byPlatform: v.record(v.string(), v.number()),
  }),
  handler: async (ctx, args) => {
    const shares = await ctx.db
      .query("shares")
      .withIndex("by_article_id", (q) => q.eq("articleId", args.articleId))
      .collect();
    
    const byPlatform: Record<string, number> = {};
    
    // Count shares by platform
    for (const share of shares) {
      if (byPlatform[share.platform]) {
        byPlatform[share.platform]++;
      } else {
        byPlatform[share.platform] = 1;
      }
    }
    
    return {
      total: shares.length,
      byPlatform,
    };
  },
});
