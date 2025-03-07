import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-48 mb-8" /> {/* Main heading */}
      <div className="prose max-w-none">
        {/* Main paragraphs */}
        <Skeleton className="h-16 w-full mb-6" />
        <Skeleton className="h-24 w-full mb-6" />
        <Skeleton className="h-20 w-full mb-6" />

        {/* Values section */}
        <Skeleton className="h-8 w-48 mt-8 mb-4" /> {/* Values heading */}
        <div className="pl-6 space-y-4 mb-6">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-6 w-60" />
        </div>
      </div>
    </main>
  )
}
