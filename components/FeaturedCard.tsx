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
  titlePosition?: 'top' | 'center' | 'bottom'
}

const FeaturedCard: FC<FeaturedCardProps> = ({ 
  imageUrl, 
  title, 
  description, 
  className = "", 
  link="#", 
  size = 'small',
  titlePosition = 'bottom'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setIsExpanded(!isExpanded);
  };

  return (
    <Link className={`flex flex-col h-full ${className}`} href={link}>
      <div className="relative flex-grow">
        <div className="w-full relative aspect-[16/9]">
          <Image
            src={imageUrl || "/placeholder.svg?height=600&width=900"}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={`absolute left-0 right-0 px-4 ${
          titlePosition === 'top' ? 'top-0' :
          titlePosition === 'center' ? 'top-1/2 -translate-y-1/2' :
          'bottom-0'
        }`}>
          <h2 
            onClick={handleTitleClick}
            className={`font-bold bg-background leading-tight cursor-pointer pt-2 px-2 ${
              size === 'small' ? 'text-sm font-sans font-normal' :
              size === 'large' ? 'text-xl md:text-3xl p-2 font-serif' :
              'text-lg md:text-2xl p-2 font-serif'
            } ${!isExpanded ? 'line-clamp-2' : ''}`}
          >
            {title}
            {!isExpanded && title.length > 90 && (
              <span className="text-brand-blue text-sm ml-1">...</span>
            )}
          </h2>
        </div>
      </div>
      {description && (
        <div className="p-4 md:p-6 text-base md:text-lg">{description}</div>
      )}
    </Link>
  )
}

export default FeaturedCard
