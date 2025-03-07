import { Skeleton } from "@/components/ui/skeleton"
import { ArticlePreviewSkeleton } from "../../components/article-preview/ArticlePreviewSkeleton"

export default function LikedLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-4" /> {/* Title */}
      <Skeleton className="h-6 w-96 mb-8" /> {/* Description */}

      {/* Grid of article preview skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticlePreviewSkeleton key={i} variant="compact" showImage={true} />
        ))}
      </div>
    </div>
  )
}
