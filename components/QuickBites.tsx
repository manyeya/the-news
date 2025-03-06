"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "./ui/button"
import { SectionHeading } from "./ui/section-heading"
import {  MoveRight } from "lucide-react"

interface QuickBitesProps {
  articles: {
    title: string
    content: string
  }[]
}

export default function QuickBites({ articles }: QuickBitesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  return (
    <div className="max-w-2xl mx-auto h-full bg-brand-light dark:bg-brand-dark flex flex-col justify-between items-start">

      <div className="relative min-h-[200px] full flex flex-col justify-between items-start">
        <SectionHeading title="Quick Bites" variant={'yellow'} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mt-4 px-4 flex-shrink"
          >
            <h3 className="text-xl font-serif">{articles[currentIndex].title}</h3>
            <p className="text-gray-600 leading-relaxed text-justify h-[300px] min-h-[100px] max-h-[600px]">
              {articles[currentIndex].content}
            </p>
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
        <h2 className="text-brand-blue font-serif font-bold">Get the Quick Bites delivered to your inbox daily</h2>
        <div className="flex w-full">
          <input type="text" placeholder="Enter your email" className="w-full rounded-none border-b border-brand-blue bg-background outline-none  px-2 py-1" />
          <Button className="bg-brand-blue hover:bg-brand-blue/60 rounded-none text-white ">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}