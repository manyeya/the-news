import Image from "next/image"
import Link from "next/link"
import Title from "../ui/title"
import Description from "../ui/description"
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
  link = "#", 
  size = 'small'
}) => {
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
        <div className="space-y-3 px-4 md:px-0">
          <Title 
            text={title}
            size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default'}
            weight={size === 'large' ? 'bold' : 'normal'}
            clamp="default"
            className="group-hover:text-gray-700 transition-colors"
          />
          {description && (
            <Description 
              text={description}
              size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default'}
              clamp={size === 'large' ? 'lg' : 'default'}
            />
          )}
        </div>
      </div>
    </Link>
  )
}

export default FeaturedCard
