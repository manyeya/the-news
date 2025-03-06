import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Existing table
  numbers: defineTable({
    value: v.number(),
  }),
  
  // Articles table
  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    author: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    published: v.boolean(),
    publishedDate: v.number(), // timestamp
  }).index("by_article_slug", ["slug"]),
  
  // Likes table
  likes: defineTable({
    articleId: v.id("articles"),
    userId: v.string(), // user identifier
    timestamp: v.number(),
  })
  .index("by_article_id", ["articleId"])
  .index("by_user_id", ["userId"])
  .index("by_user_id_and_article_id", ["userId", "articleId"]),
  
  // Comments table
  comments: defineTable({
    articleId: v.id("articles"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),
    timestamp: v.number(),
    parentCommentId: v.optional(v.id("comments")), // For nested comments
  })
  .index("by_article_id", ["articleId"])
  .index("by_parent_comment_id", ["parentCommentId"]),
  
  // Shares table
  shares: defineTable({
    articleId: v.id("articles"),
    userId: v.string(),
    platform: v.string(), // e.g., "twitter", "facebook", etc.
    timestamp: v.number(),
  })
  .index("by_article_id", ["articleId"])
  .index("by_user_id", ["userId"]),
});
