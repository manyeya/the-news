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
                    <div className={cn(
                        "rounded-full bg-gray-300/60 flex items-center justify-center",
                        isMain ? "p-2" : "p-1.5"
                    )}>
                        <div className={cn(
                            "rounded-sm bg-white/60",
                            isMain ? "w-6 h-6" : "w-4 h-4"
                        )} />
                    </div>
                </div>
                {/* Content skeleton */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0",
                    "pl-3 space-y-2",
                    isMain ? "p-6" : "py-2 pr-2"
                )}>
                    <Skeleton className={cn(
                        "mb-2",
                        isMain ? "h-8 w-[85%]" : "h-5 w-[80%]"
                    )} />
                    <div className="w-full flex items-start">
                        <Skeleton className={cn(
                            "rounded-sm",
                            isMain ? "h-3 w-24" : "h-2 w-16"
                        )} />
                    </div>
                </div>
            </div>
        </div>
    )
}
