import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function VideoCardSkeleton({ isMain = false }: { isMain?: boolean }) {
    return (
        <div className="relative block animate-pulse">
            <div className={cn(
                "relative overflow-hidden rounded-sm shadow-sm",
                isMain ? "aspect-[16/9]" : "aspect-video"
            )}>
                <Skeleton className="w-full h-full" />
                {/* Gradient effect */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-200 to-transparent" />
                {/* Play button skeleton */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-gray-300/60 w-12 h-12 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-sm bg-white/60" />
                    </div>
                </div>
                {/* Content skeleton */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0",
                    isMain ? "p-6 space-y-3" : "p-4 space-y-2"
                )}>
                    <Skeleton className={cn(
                        "mb-2",
                        isMain ? "h-8 w-[85%]" : "h-5 w-[80%]"
                    )} />
                    <div className="flex items-center gap-2">
                        <Skeleton className={cn(
                            isMain ? "h-4 w-32" : "h-3 w-24"
                        )} />
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <Skeleton className={cn(
                            isMain ? "h-4 w-16" : "h-3 w-12"
                        )} />
                    </div>
                </div>
            </div>
        </div>
    )
}
