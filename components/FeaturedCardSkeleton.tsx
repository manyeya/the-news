import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface FeaturedCardSkeletonProps {
  size?: 'small' | 'medium' | 'large'
}

export function FeaturedCardSkeleton({ size = 'large' }: FeaturedCardSkeletonProps) {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="relative">
        <div className={cn(
          "relative",
          size === 'large' ? "aspect-[16/9]" : "aspect-[4/3]"
        )}>
          <Skeleton className="w-full h-full" />
          {/* Gradient effect */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-200 to-transparent" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          <Skeleton className={cn(
            size === 'large' 
              ? "h-8 w-[90%] mb-2" 
              : "h-5 w-[85%]"
          )} />
          {size === 'large' && (
            <Skeleton className="h-8 w-[75%]" />
          )}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          {size === 'large' && (
            <Skeleton className="h-4 w-[80%]" />
          )}
        </div>
        {size === 'large' && (
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        )}
      </div>
    </div>
  )
}
