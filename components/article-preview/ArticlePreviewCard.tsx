import Link from "next/link"
import { cn } from "@/lib/utils"
import Title from "../ui/title"
import Description from "../ui/description"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"

export type ArticleCardVariant = "compact" | "full" | "text-only" | "nyt-featured" | "nyt-standard" | "nyt-opinion" | "nyt-compact"

const articleCardVariants = cva("", {
  variants: {
    variant: {
      compact: "flex flex-col space-y-3 px-4 sm:px-0",
      full: "w-full space-y-4 px-4 sm:px-0",
      "text-only": "space-y-2 px-4 sm:px-0",
      "nyt-featured": "w-full space-y-4 px-4 sm:px-0 group",
      "nyt-standard": "flex flex-col space-y-3 px-4 sm:px-0 group",
      "nyt-opinion": "flex flex-col space-y-3 px-4 sm:px-0 group border-l-4 border-gray-200 pl-6",
      "nyt-compact": "flex flex-row gap-4 px-4 sm:px-0 group items-start",
    },
    contentLayout: {
      default: "",
      horizontal: "flex flex-col md:flex-row gap-8",
    },
  },
  defaultVariants: {
    variant: "compact",
    contentLayout: "default",
  },
})

interface ArticleCardProps extends VariantProps<typeof articleCardVariants> {
  title: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  href: string
  className?: string
  underLine?: boolean
  showImage?: boolean
  showDescription?: boolean
  variant?: ArticleCardVariant
}

export default function ArticlePreviewCard({
  variant = "compact",
  title,
  description,
  imageUrl,
  imageAlt = "",
  href,
  className,
  underLine = false,
  showImage = true,
  showDescription = true,
}: ArticleCardProps) {
  return (
    <article className={cn(articleCardVariants({ variant }), className)}>
      {/* NYT Featured Layout */}
      {variant === "nyt-featured" && (
        <>
          {imageUrl && showImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={imageAlt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          )}
          <Link href={href} className="block space-y-3">
            <Title
              text={title}
              size="lg"
              weight="bold"
              className="font-serif text-2xl md:text-4xl leading-tight group-hover:text-gray-600 transition-colors"
            />
            {description && showDescription && (
              <Description
                text={description}
                size="default"
                className="font-serif text-lg md:text-xl leading-relaxed text-gray-700"
                threshold={150}
                clamp="xl"
              />
            )}
          </Link>
        </>
      )}

      {/* NYT Standard Layout */}
      {variant === "nyt-standard" && (
        <>
          {imageUrl && showImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={imageAlt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          )}
          <Link href={href} className="block space-y-2">
            <Title
              text={title}
              size="default"
              weight="bold"
              className="font-serif text-lg md:text-xl leading-tight group-hover:text-gray-600 transition-colors"
            />
            {description && showDescription && (
              <Description
                text={description}
                size="sm"
                className="font-serif text-base leading-relaxed text-gray-700"
                clamp="lg"
              />
            )}
          </Link>
        </>
      )}

      {/* NYT Opinion Layout */}
      {variant === "nyt-opinion" && (
        <Link href={href} className="block space-y-2">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Opinion</span>
          <Title
            text={title}
            size="default"
            weight="bold"
            className="font-serif text-lg md:text-xl leading-tight group-hover:text-gray-600 transition-colors"
          />
          {description && showDescription && (
            <Description
              text={description}
              size="sm"
              className="font-serif text-base leading-relaxed text-gray-700"
              clamp="default"
            />
          )}
        </Link>
      )}

      {/* NYT Compact Layout */}
      {variant === "nyt-compact" && (
        <>
          {imageUrl && showImage && (
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={imageAlt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          )}
          <Link href={href} className="block flex-1 pt-1">
            <Title
              text={title}
              size="sm"
              weight="medium"
              className="font-serif text-base leading-tight group-hover:text-gray-600 transition-colors"
            />
          </Link>
        </>
      )}

      {/* Original Variants */}
      {(variant === "compact" || variant === "full" || variant === "text-only") && (
        <>
          {variant === "compact" && imageUrl && showImage && (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
                priority
              />
            </div>
          )}

          <Link href={href} className="group block">
            <Title
              text={title}
              size={variant === "full" ? "default" : "sm"}
              weight={variant !== "text-only" ? "bold" : undefined}
              className={`${variant === "full" ? 'px-4' : ''} font-serif leading-tight group-hover:text-gray-600 transition-colors`}
            />
          </Link>

          {variant === "full" && (
            <div className="flex flex-col md:flex-row gap-8 px-4">
              {description && showDescription && (
                <div className="md:flex-1">
                  <Description
                    className="text-left font-serif text-[17px] leading-relaxed"
                    text={description}
                    size="default"
                    threshold={100}
                    clamp="xl"
                  />
                </div>
              )}

              {imageUrl && showImage && (
                <div className="md:w-[360px]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={imageAlt || title}
                      fill
                      className="object-cover hover:opacity-90 transition-opacity"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {variant === "compact" && description && showDescription && (
            <Description
              text={description}
              size="sm"
              clamp="sm"
              className="font-serif text-[15px] leading-relaxed"
            />
          )}
        </>
      )}

      {underLine && <div className="pt-4 border-t" />}
    </article>
  )
}
