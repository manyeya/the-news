import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-48 mb-8" /> {/* Heading */}
      <div className="max-w-2xl">
        <Skeleton className="h-20 w-full mb-8" /> {/* Description paragraph */}

        {/* Contact Form Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-32" />
        </div>

        <div className="mt-12">
          <Skeleton className="h-8 w-64 mb-4" /> {/* Other Ways heading */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-72" />
            <Skeleton className="h-6 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
