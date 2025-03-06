import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ArticlePreviewSkeletonProps {
  variant?: 'compact' | 'full' | 'text-only'
  showImage?: boolean
  className?: string
}

export function ArticlePreviewSkeleton({ 
  variant = 'text-only',
  showImage = true,
  className 
}: ArticlePreviewSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      {/* Full variant */}
      {variant === 'full' && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-7 w-[90%]" />
            <Skeleton className="h-7 w-[75%]" />
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[85%]" />
            </div>
          </div>
          {showImage && (
            <div className="md:w-[360px]">
              <div className="aspect-[16/9]">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compact variant */}
      {variant === 'compact' && (
        <div className="space-y-3 px-4 sm:px-0">
          {showImage && (
            <div className="aspect-[16/9]">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <div className="space-y-3">
            <Skeleton className="h-5 w-[85%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      )}

      {/* Text-only variant */}
      {variant === 'text-only' && (
        <div className="space-y-2 px-4 sm:px-0">
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="h-5 w-[75%]" />
        </div>
      )}
    </div>
  )
}
