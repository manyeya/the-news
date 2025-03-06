import NewsHeader from "@/components/NewsHeader"
import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <NewsHeader />
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the news category you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}