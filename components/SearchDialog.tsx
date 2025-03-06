"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSearchNews } from "@/lib/services/news/hooks/useNews"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { generateArticleUrl } from "@/lib/utils"
import Link from "next/link"

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
        <button className="flex items-center hover:text-brand-blue  space-x-2">
          <Search className="w-5 h-5 sm:mr-1" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] max-h-[80vh] overflow-y-auto rounded-none border-[3px]">
        <DialogHeader>
          <DialogTitle className="font-sans text-sm">Search Articles</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 text-lg rounded-none border-0 border-b-2 focus:border-brand-blue transition-colors focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="rounded-none bg-brand-blue  text-lg h-12 px-8">Search</Button>
          </div>
        </form>
        <div className="space-y-6 mt-4">
          {isLoading && (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-3/4 rounded-none" />
                  <Skeleton className="h-4 w-full rounded-none" />
                </div>
              ))}
            </div>
          )}
          {isError && <p className="text-red-500">Error searching news</p>}
          {data?.articles.map((article, index) => (
            <Link 
              key={index}
              href={generateArticleUrl(article, "search")}
              className="block group"
            >
              <article className="space-y-2">
                <h3 className="font-serif text-xl font-medium group-hover:text-brand-blue transition-colors">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
