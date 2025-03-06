import VideoCardSkeleton from "./Card/Skeleton"
import { Skeleton } from "../ui/skeleton"

export default function LoadingOrError({
  isError,
  categories,
}: { isError: boolean; categories: Array<{ key: string; label: string }> }) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 relative">
      {/* Categories */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          {categories.map((cat) => (
            <Skeleton key={cat.key} className="h-4 w-16" />
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Video */}
        <div className="lg:col-span-3 bg-gray-200">
          <VideoCardSkeleton isMain={true} />
        </div>

        {/* Sidebar Videos */}
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <VideoCardSkeleton key={index} />
            ))}
        </div>
      </div>

      {/* Error Message Overlay */}
      {isError && (
        <div className="absolute top-0 right-0 inset-0 flex items-center justify-center bg-white/80">
          <div className="text-red-800 text-center">
            <p className="font-semibold">Unable to load news videos</p>
            <p className="text-sm mt-1">Please check your internet connection and try again</p>
          </div>
        </div>
      )}
    </section>
  )
}

