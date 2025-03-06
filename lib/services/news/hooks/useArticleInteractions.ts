import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";

interface UseArticleInteractionsProps {
  articleId?: Id<"articles"> | null;
}

// Query hook for article interaction data
export function useArticleQueriesData({
  articleId,
}: UseArticleInteractionsProps) {
  // Comments
  const [numItems] = useState(10); // Number of items per page
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<Id<"comments"> | null>(null);

  // Likes
  const isLiked = useQuery(
    api.articleInteractions.getUserLikeStatus,
    articleId ? { articleId } : "skip"
  );
  
  const likesCount = useQuery(
    api.articleInteractions.getLikesCount,
    articleId ? { articleId } : "skip"
  );
  
  // Comments
  const commentsData = useQuery(
    api.articleInteractions.getComments,
    articleId ? { 
      articleId,
      paginationOpts: {
        numItems,
        cursor: endCursor,
      }
    } : "skip"
  );
  
  const commentReplies = useQuery(
    api.articleInteractions.getCommentReplies,
    selectedCommentId ? { commentId: selectedCommentId } : "skip"
  );

  // Shares
  const sharesCount = useQuery(
    api.articleInteractions.getSharesCount,
    articleId ? { articleId } : "skip"
  );

  const loadMoreComments = () => {
    if (commentsData?.continueCursor) {
      setEndCursor(commentsData.continueCursor);
    }
  };

  const getCommentReplies = ({ commentId }: { commentId: Id<"comments"> }) => {
    if (selectedCommentId !== commentId) {
      setSelectedCommentId(commentId);
    }
    return commentReplies ?? [];
  };
  
  return {
    isLiked,
    likesCount,
    comments: commentsData?.page ?? [],
    hasMoreComments: commentsData ? !commentsData.isDone : false,
    loadMoreComments,
    getCommentReplies,
    setSelectedCommentId,
    sharesCount,
  };
}

// Mutation hook for article interactions
export function useArticleMutations({
  articleId,
}: UseArticleInteractionsProps) {
  const [commentContent, setCommentContent] = useState("");
  
  // Likes mutations
  const toggleLike = useMutation(api.articleInteractions.toggleLike);
  
  const handleToggleLike = async () => {
    if (!articleId) return;
    return await toggleLike({ articleId });
  };
  
  // Comment mutations
  const addCommentMutation = useMutation(api.articleInteractions.addComment);
  
  const handleAddComment = async (content: string, parentCommentId?: Id<"comments">) => {
    if (!articleId || !content.trim()) return;
    
    await addCommentMutation({
      articleId,
      content,
      parentCommentId,
    });
    
    if (!parentCommentId) {
      setCommentContent(""); // Only clear main comment input
    }
  };
  
  // Share mutations
  const recordShareMutation = useMutation(api.articleInteractions.recordShare);
  
  const handleShare = async (platform: string) => {
    if (!articleId) return;
    
    // First record the share in our database
    await recordShareMutation({
      articleId,
      platform,
    });
    
    // Then perform the actual sharing based on platform
    switch (platform) {
      case "twitter":
        // Use Twitter/X Web Intent
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
          "_blank"
        );
        break;
      case "facebook":
        // Use Facebook Share Dialog
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
          "_blank"
        );
        break;
      case "linkedin":
        // Use LinkedIn Share API
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
          "_blank"
        );
        break;
      case "email":
        // Use mailto link
        window.location.href = `mailto:?subject=Check out this article&body=${encodeURIComponent(
          window.location.href
        )}`;
        break;
      default:
        // Copy link to clipboard for "link" platform
        navigator.clipboard.writeText(window.location.href);
        // You might want to show a toast notification here
    }
  };
  
  return {
    // Likes mutations
    handleToggleLike,
    
    // Comments mutations
    commentContent,
    setCommentContent,
    handleAddComment,
    
    // Shares mutations
    handleShare,
  };
}

// Combine both hooks for backward compatibility
export function useArticleInteractions(props: UseArticleInteractionsProps) {
  const queries = useArticleQueriesData(props);
  const mutations = useArticleMutations(props);
  
  return {
    ...queries,
    ...mutations,
  };
}
