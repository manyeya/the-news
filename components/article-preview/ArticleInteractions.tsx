import React, { useState } from "react";
import { useArticleInteractions } from "../../lib/services/news/hooks/useArticleInteractions";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Heart, MessageCircle, Share2, Send, ChevronDown, X } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface ArticleInteractionsProps {
    articleId: Id<"articles">;
}

export function ArticleInteractions({
    articleId,
}: ArticleInteractionsProps) {
    const [showComments, setShowComments] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);

    const {
        isLiked,
        likesCount,
        handleToggleLike,
        comments,
        commentContent,
        setCommentContent,
        handleAddComment,
        hasMoreComments,
        loadMoreComments,
        getCommentReplies,
        sharesCount,
        handleShare,
    } = useArticleInteractions({
        articleId,
    });

    return (
        <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                    {/* Like Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={handleToggleLike}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{likesCount ?? 0}</span>
                    </Button>

                    {/* Comment Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span>{comments.length}</span>
                    </Button>

                    {/* Share Button */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => setShowShareOptions(!showShareOptions)}
                        >
                            <Share2 className="h-5 w-5" />
                            <span>{sharesCount?.total ?? 0}</span>
                        </Button>

                        {/* Share Options Dropdown */}
                        {showShareOptions && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1" role="menu">
                                    {["twitter", "facebook", "linkedin", "email", "link"].map((platform) => (
                                        <button
                                            key={platform}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => {
                                                handleShare(platform);
                                                setShowShareOptions(false);
                                            }}
                                        >
                                            Share on {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-4">Comments</h3>

                    {/* Add Comment */}
                    <div className="mb-6">
                        <Textarea
                            placeholder="Add a comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            className="w-full mb-2"
                            rows={3}
                        />
                        <div className="flex justify-end">
                            <Button
                                size="sm"
                                onClick={() => handleAddComment(commentContent)}
                                disabled={!commentContent.trim()}
                                className="flex items-center gap-2"
                            >
                                <Send className="h-4 w-4" /> Post Comment
                            </Button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                                No comments yet. Be the first to comment!
                            </p>
                        ) : (
                            <>
                                {comments.map((comment) => (
                                    <CommentItem
                                        key={comment._id.toString()}
                                        comment={comment}
                                        articleId={articleId}
                                        getCommentReplies={getCommentReplies}
                                    />
                                ))}

                                {hasMoreComments && (
                                    <div className="text-center mt-4">
                                        <Button variant="outline" onClick={loadMoreComments}>
                                            <ChevronDown className="h-4 w-4 mr-2" />
                                            Load More Comments
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Comment Item Component
interface CommentItemProps {
    comment: {
        _id: Id<"comments">;
        userId: string;
        userName: string;
        content: string;
        timestamp: number;
        parentCommentId?: Id<"comments">;
    };
    articleId: Id<"articles">;
    getCommentReplies: (params: { commentId: Id<"comments"> }) => Array<{
        _id: Id<"comments">;
        userId: string;
        userName: string;
        content: string;
        timestamp: number;
        articleId: Id<"articles">;
        parentCommentId?: Id<"comments">;
    }>;
}

function CommentItem({
    comment,
    articleId,
    getCommentReplies
}: CommentItemProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [showReplies, setShowReplies] = useState(false);

    const replies = getCommentReplies({ commentId: comment._id });

    const { handleAddComment } = useArticleInteractions({
        articleId,
    });

    const handleReply = async () => {
        if (!replyContent.trim()) return;

        await handleAddComment(replyContent, comment._id);

        setReplyContent("");
        setShowReplyForm(false);
        setShowReplies(true); // Show replies after adding a new one
    };

    return (
        <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
            <div className="flex items-start justify-between">
                <div>
                    <span className="font-medium">{comment.userName}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>

            <div className="mt-2 flex space-x-4">
                <button
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                >
                    Reply
                </button>

                {replies && replies.length > 0 && (
                    <button
                        className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                        onClick={() => setShowReplies(!showReplies)}
                    >
                        {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                    </button>
                )}
            </div>

            {/* Reply Form */}
            {showReplyForm && (
                <div className="mt-3 pl-4">
                    <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full mb-2"
                        rows={2}
                    />
                    <div className="flex justify-end space-x-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowReplyForm(false)}
                            className="flex items-center gap-1"
                        >
                            <X className="h-3 w-3" /> Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleReply}
                            disabled={!replyContent.trim()}
                            className="flex items-center gap-1"
                        >
                            <Send className="h-3 w-3" /> Reply
                        </Button>
                    </div>
                </div>
            )}

            {/* Replies */}
            {showReplies && replies && replies.length > 0 && (
                <div className="mt-4 space-y-3 pl-4">
                    {replies.map((reply) => (
                        <div key={reply._id.toString()} className="border-l-2 border-gray-100 dark:border-gray-800 pl-3 py-1">
                            <div>
                                <span className="font-medium">{reply.userName}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                    {new Date(reply.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{reply.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
