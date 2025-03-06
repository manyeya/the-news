import { NewsCategory } from "@/lib/services/news/types"
import CategoryPage from "@/app/components/CategoryPage"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return Object.keys(NewsCategory).map((category) => ({
    category: category.toLowerCase(),
  }))
}

export default function Page({ params }: PageProps) {
  const category = params.category

  // Validate that the category exists
  const validCategory = Object.keys(NewsCategory).find(
    (c) => c.toLowerCase() === category.toLowerCase()
  )

  if (!validCategory) {
    notFound()
  }

  return <CategoryPage category={validCategory as keyof typeof NewsCategory} />
}