import { NewsCategory } from "@/lib/services/news/types"
import CategoryPage from "@/components/CategoryPage"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return Object.values(NewsCategory).map((category) => ({
    category: category.toLowerCase(),
  }))
}

export default async function Page({ params }: PageProps) {
  // Wait for params to be available
  const category = await Promise.resolve(params.category)

  // Check if the category value exists in the enum
  const validCategory = (Object.keys(NewsCategory) as (keyof typeof NewsCategory)[])
    .find(key => NewsCategory[key].toLowerCase() === category.toLowerCase())

  if (!validCategory) {
    notFound()
  }

  return <CategoryPage category={validCategory} />
}
