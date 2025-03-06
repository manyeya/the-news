export default function ArticleLoading() {
  return (
    <div>
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb Skeleton */}
          <div className="text-sm mb-6">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="space-y-3 mb-8">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Image Skeleton */}
          <div className="relative aspect-video mb-8">
            <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-4/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Source Attribution Skeleton */}
          <div className="mt-8 pt-4 border-t">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  )
}
