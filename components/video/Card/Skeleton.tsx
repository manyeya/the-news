import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function VideoCardSkeleton({ isMain = false }: { isMain?: boolean }) {
    return (
        <div className="relative block">
            <div className={cn("relative overflow-hidden", isMain ? "aspect-[16/9]" : "aspect-video")}>
                <Skeleton className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="rounded-full w-12 h-12" />
                </div>
                {isMain && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Skeleton className="h-7 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                )}
                {!isMain && (
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <Skeleton className="h-4 w-3/4 mb-1" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                )}
            </div>
        </div>
    )
}