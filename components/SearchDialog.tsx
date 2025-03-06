"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSearchNews } from "@/lib/services/news/hooks/useNews"
import { Button } from "@/components/ui/button"
import ArticlePreviewCard from "./article-preview/ArticlePreviewCard"

export function SearchDialog() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { data, isLoading, isError } = useSearchNews({ query: isSearching ? query : "" })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-gray-600">
          <Search className="w-5 h-5 sm:mr-1" />
          <span className="hidden sm:inline">SEARCH</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search News</DialogTitle>
          <DialogDescription>
            Enter keywords to search for news articles
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
        <div className="space-y-4 mt-4">
          {isLoading && <p>Searching...</p>}
          {isError && <p className="text-red-500">Error searching news</p>}
          {data?.articles.map((article, index) => (
            <ArticlePreviewCard
              key={index}
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              href={article.url}
              variant="compact"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
