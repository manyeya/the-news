import { Skeleton } from "@/components/ui/skeleton"

export default function TermsLoading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Skeleton className="h-12 w-64 mb-8" /> {/* Terms of Service heading */}
      <div className="prose max-w-none">
        <Skeleton className="h-6 w-48 mb-6" /> {/* Last updated date */}

        {/* Agreement to Terms section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" /> {/* Section heading */}
          <Skeleton className="h-16 w-full" /> {/* Section content */}
        </div>

        {/* Use of Our Services section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* User Accounts section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-4">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-52" />
          </div>
        </div>

        {/* Content section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>

        {/* User Comments section */}
        <div className="mb-8">
          <Skeleton className="h-8 w-72 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <div className="pl-6 space-y-4 mb-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Final sections */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-8">
            <Skeleton className="h-8 w-72 mb-4" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    </main>
  )
}
