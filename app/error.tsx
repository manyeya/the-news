"use client"

import NewsHeader from "@/components/NewsHeader"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <div className="max-w-screen-xl mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-7xl font-serif mb-6">An Error Occurred</h1>
          <div className="border-t border-b  py-8 my-8">
            <p className="text-xl text-gray-600 font-serif mb-6">
              We apologize for the inconvenience. Our team has been notified.
            </p>
            <p className="text-gray-600 mb-8">
              {error.message || "Something went wrong while loading this page."}
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 mb-8">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <div className="space-x-6">
            <button
              onClick={reset}
              className="inline-block bg-black  px-8 py-3 font-serif hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-block border border-black px-8 py-3 font-serif hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
