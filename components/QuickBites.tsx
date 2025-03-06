"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "./ui/button"
import { SectionHeading } from "./ui/section-heading"
import { MoveRight } from "lucide-react"
import { useTopHeadlines } from "@/lib/services/news/hooks/useNews"
import { Skeleton } from "./ui/skeleton"
import Title from "./ui/title"

export default function QuickBites() {
  const { data, isLoading, isError } = useTopHeadlines({ pageSize: 5 ,country: "us", category: "Business" }) 
  const [currentIndex, setCurrentIndex] = useState(0)
  
  if (isError) {
    return (
      <div className="max-w-2xl mx-auto h-[600px] bg-brand-light dark:bg-brand-dark flex flex-col justify-between items-start">
        <div className="relative h-[450px] w-full flex flex-col justify-between items-start">
          <SectionHeading title="Quick Bites" variant={'yellow'} />
          <div className="space-y-4 mt-4 px-4 w-full">
            <div className="p-4 rounded-md bg-red-50 border border-red-200">
              <p className="text-red-800 font-sans">
                Unable to load quick bites. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto h-[600px] bg-brand-light dark:bg-brand-dark flex flex-col justify-between items-start">
        <div className="relative h-[450px] w-full flex flex-col justify-between items-start">
          <SectionHeading title="Quick Bites" variant={'yellow'} />
          <div className="space-y-4 mt-4 px-4 w-full">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="mt-6 self-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="mt-6 w-full bg-background">
          <Skeleton className="h-6 w-full max-w-md" />
          <div className="flex w-full mt-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-24 ml-2" />
          </div>
        </div>
      </div>
    )
  }

  const articles = data?.articles.map(article => ({
    title: article.title,
    content: article.description || article.content || ''
  })) || []

  if (articles.length === 0) {
    return (
      <div className="max-w-2xl mx-auto h-[600px] bg-brand-light dark:bg-brand-dark flex flex-col justify-between items-start">
        <div className="relative h-[450px] w-full flex flex-col justify-between items-start">
          <SectionHeading title="Quick Bites" variant={'yellow'} />
          <div className="space-y-4 mt-4 px-4 w-full">
            <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200">
              <p className="text-yellow-800 font-sans">
                No quick bites available at the moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  return (
    <div className="max-w-2xl mx-auto h-[600px] bg-brand-light dark:bg-brand-dark flex flex-col justify-between items-start">

      <div className="relative h-[450px] w-full flex flex-col justify-between items-start">
        <SectionHeading title="Quick Bites" variant={'yellow'} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mt-4 px-4 h-[350px] overflow-auto custom-scrollbar"
          >
            <Title size={'sm'} className="text-brand-dark dark:text-brand-light hover:no-underline hover:cursor-default font-serif font-bold " text={articles[currentIndex].title} />
            <p className="font-sans text-muted">{articles[currentIndex].content}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 self-end">
          <Button
            onClick={handleNext}
            variant={"outline"}
            className="border-none bg-brand-light dark:bg-brand-dark shadow-none text-brand-blue hover:bg-brand-blue/5"
          >
            Next Article <MoveRight/>
          </Button>
        </div>
      </div>
      <div className=" mt-6 w-full bg-background">
        <h1 className="text-brand-blue font-serif text-base font-bold my-4">Get the Quick Bites delivered to your inbox daily</h1>
        <div className="flex w-full">
          <input type="text" placeholder="Enter your email" className="w-full rounded-none border-b border-brand-blue bg-background outline-none  px-2 py-1" />
          <Button className="bg-brand-blue hover:bg-brand-blue/60 rounded-none text-white ">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}
