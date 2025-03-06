export default function ArticleInteractionsSkeleton() {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-6">
          {/* Like Button Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Comment Button Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Share Button Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading Comments Placeholder */}
      <div className="space-y-4">
        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        
        {/* Comment Input Skeleton */}
        <div className="h-24 w-full bg-gray-200 rounded animate-pulse mb-4" />
        
        {/* Sample Comment Skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-l-2 border-gray-200 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
