import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { FC } from "react"

interface FeaturedCardProps {
  imageUrl: string
  title: string
  description?: string
  className?: string
  link?: string
  size?: 'small' | 'medium' | 'large'
}

const FeaturedCard: FC<FeaturedCardProps> = ({ 
  imageUrl, 
  title, 
  description, 
  className = "", 
  link="#", 
  size = 'small'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setIsExpanded(!isExpanded);
  };

  return (
    <Link className={`group flex flex-col h-full ${className}`} href={link}>
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg?height=600&width=900"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {size === 'large' && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3" />
          )}
        </div>
        <div className="space-y-3">
          <h2 
            onClick={handleTitleClick}
            className={`cursor-pointer leading-tight ${
              size === 'small' ? 'text-sm font-sans font-normal' :
              size === 'large' ? 'text-2xl md:text-[2.5rem] font-serif font-bold leading-[1.1]' :
              'text-xl md:text-2xl font-serif'
            } ${!isExpanded ? 'line-clamp-2' : ''} group-hover:text-gray-700 transition-colors`}
          >
            {title}
            {!isExpanded && title.length > 90 && (
              <span className="text-gray-500 text-sm ml-1">...</span>
            )}
          </h2>
          {description && (
            <p className="font-serif text-[1.0625rem] leading-[1.5] text-gray-600 mt-2">
              {description}
            </p>
          )}
          {size === 'large' && (
            <div className="text-xs font-sans text-gray-500 uppercase tracking-wider mt-4">
              By John Smith • 3 min read
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default FeaturedCard
