# Convex Implementation in The News 🚀

This project uses Convex as its backend database and real-time engine, primarily handling user interactions with articles and social features.

## Schema Design 📐

### Tables

#### Articles Table
- Stores article metadata and content
- Indexed by slug for quick lookups
- Fields:
  - `title`: Article title
  - `slug`: URL-friendly identifier
  - `content`: Article content
  - `author`: Optional author name
  - `imageUrl`: Optional featured image
  - `published`: Publication status
  - `publishedDate`: Timestamp

#### Likes Table
- Tracks article likes by users
- Indexed by article ID and user ID for efficient queries
- Fields:
  - `articleId`: Reference to articles table
  - `userId`: User identifier
  - `timestamp`: When the like occurred

#### Comments Table
- Manages article comments with nested reply support
- Indexed by article ID and parent comment ID
- Fields:
  - `articleId`: Reference to articles table
  - `userId`: Commenter's ID
  - `userName`: Display name
  - `content`: Comment text
  - `timestamp`: When posted
  - `parentCommentId`: Optional reference for nested replies

#### Shares Table
- Records article sharing activities
- Tracks sharing platform statistics
- Fields:
  - `articleId`: Reference to articles table
  - `userId`: User who shared
  - `platform`: Social platform used
  - `timestamp`: When shared

## Features Implementation 🛠️

### Article Management
- `getArticleIdBySlug`: Retrieves articles by URL slug
- `getOrCreateArticle`: Creates or updates article records

### Social Interactions

#### Likes System
- `toggleLike`: Handles like/unlike actions
- `getUserLikeStatus`: Checks if user liked an article
- `getLikesCount`: Real-time like counter

#### Comments System
- `addComment`: Posts new comments and replies
- `getComments`: Retrieves paginated comments
- `getCommentReplies`: Fetches nested replies

#### Share Tracking
- `recordShare`: Logs sharing events
- `getSharesCount`: Tracks total shares and platform breakdown

## Real-time Features ⚡

Convex provides real-time updates for:
- Like counts and status
- Comment threads
- Share statistics
- Article modifications

## Authentication with Clerk 🔐

This project integrates Clerk with Convex for authentication:

### Integration Setup
- Clerk handles user authentication and session management
- JWT tokens are verified by Convex
- User identity is accessible in mutation handlers

### Authentication Flow
1. Users authenticate via Clerk's UI components
2. Clerk generates JWT tokens
3. Tokens are automatically passed to Convex
4. Convex validates tokens and extracts user info
5. User identity available in ctx.auth

### Security Features
- Protected mutations require valid Clerk session
- Anonymous read access for public data
- User identity verification on all writes
- Role-based access control via Clerk
- Secure token handling and validation

## Performance Optimizations 🚄

- Efficient indexing for common queries
- Pagination support for comments
- Optimized data access patterns
- Real-time subscriptions for live updates

## Usage Notes 📝

1. All write operations require Clerk authentication
2. Queries support both authenticated and anonymous users
3. Real-time subscriptions automatically update UI components
4. Database operations are atomic and consistent

## Error Handling 🛡️

- Robust error checking for:
  - User authentication via Clerk
  - Resource existence
  - Data validation
  - Reference integrity

## Best Practices 🎯

1. Use provided mutations for data modifications
2. Leverage indexes for performance
3. Implement proper error handling
4. Verify Clerk authentication status
5. Use real-time subscriptions for live updates

---

For more details:
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk-Convex Integration Guide](https://docs.convex.dev/auth/clerk)
