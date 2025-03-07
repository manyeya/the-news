import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-7xl font-serif mb-6">404</h1>
          <h2 className="text-4xl font-serif mb-6">Page Not Found</h2>
          <div className="border-t border-b  py-8 my-8">
            <p className="text-xl text-gray-600 font-serif mb-6">
              We&apos;re sorry, we seem to have lost this page, but we don&apos;t want to lose you.
            </p>
            <p className="text-gray-600 mb-8">
              The page you requested could not be found. It may have been moved, renamed, or deleted.
            </p>
          </div>
          <div className="space-x-6">
            <Link
              href="/"
              className="inline-block  px-8 py-3 font-serif transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
