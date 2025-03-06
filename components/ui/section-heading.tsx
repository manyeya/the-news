import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionHeadingVariants = cva(
  "inline-block border-b-2 pb-2",
  {
    variants: {
      variant: {
        yellow: "border-gray-900 text-gray-900",
        gray: "border-gray-900 text-gray-900",
        blue: "border-gray-900 text-gray-900",
      }
    },
    defaultVariants: {
      variant: "yellow"
    }
  }
)

type SectionHeadingVariant = VariantProps<typeof sectionHeadingVariants>

interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
  SectionHeadingVariant {
  title: string
}

export function SectionHeading({
  title,
  variant,
  className
}: SectionHeadingProps) {
  return (
    <div className="mb-4">
      <div className={cn(sectionHeadingVariants({ variant, className }))}>
        <h2 className="text-[13px] font-bold tracking-widest uppercase font-sans">{title}</h2>
      </div>
    </div>
  )
}
