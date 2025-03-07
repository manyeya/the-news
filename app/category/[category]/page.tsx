import { NewsCategory } from "@/lib/services/news/types"
import CategoryPage from "@/components/CategoryPage"

export async function generateStaticParams() {
  return Object.values(NewsCategory).map((category) => ({
    category: category.toLowerCase(),
  }))
}

export default async function Page() {
  return <CategoryPage />
}
