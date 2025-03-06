import Link from "next/link"
import { cn } from "@/lib/utils"
import Title from "../ui/title"
import Description from "../ui/description"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"

export type ArticleCardVariant = "compact" | "full" | "text-only"

const articleCardVariants = cva("", {
  variants: {
    variant: {
      compact: "flex flex-col space-y-2",
      full: "w-full space-y-2",
      "text-only": "space-y-2",
    },
    contentLayout: {
      default: "",
      horizontal: "flex flex-col md:flex-row gap-6",
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
      {/* Image for compact variant */}
      {variant === "compact" && imageUrl && showImage && (
        <div className="relative aspect-[4/3] w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover grayscale" priority />
        </div>
      )}

      {/* Title for all variants */}
      <Link href={href} className="group">
        <Title
          text={title}
          size={variant === "full" ? "default" : "sm"}
          weight={variant !== "text-only" ? "bold" : undefined}
        />
      </Link>

      {/* Content section for full variant */}
      {variant === "full" && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:flex-1 w-[200px]">
            {description && showDescription && (
              <Description className="text-left" text={description} size="default" threshold={100} clamp="xl" />
            )}
          </div>
          {imageUrl && showImage && (
            <div className="md:w-[300px]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={imageAlt || title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description for compact variant */}
      {variant === "compact" && description && showDescription && (
        <Description text={description} size="sm" clamp="sm" />
      )}

      {/* Underline for all variants */}
      {underLine && <div className="mt-4 border-t" />}
    </article>
  )
}

