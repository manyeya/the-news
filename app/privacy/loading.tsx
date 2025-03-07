import { Skeleton } from "@/components/ui/skeleton"

export default function PrivacyLoading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Skeleton className="h-12 w-64 mb-8" /> {/* Privacy Policy heading */}
      <div className="prose max-w-none">
        <Skeleton className="h-6 w-48 mb-6" /> {/* Last updated date */}

        {/* Introduction section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" /> {/* Section heading */}
          <Skeleton className="h-20 w-full" /> {/* Section content */}
        </div>

        {/* Information We Collect section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" /> {/* Section heading */}
          <Skeleton className="h-6 w-64 mb-3" /> {/* Subsection heading */}
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-6">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-6 w-72 mb-3" /> {/* Subsection heading */}
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* How We Use Your Information section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-4">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Data Protection section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-16 w-full" />
        </div>

        {/* Your Rights section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Contact Us section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </main>
  )
}
