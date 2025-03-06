import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionHeadingVariants = cva(
  "inline-block py-1 px-3",
  {
    variants: {
      variant: {
        yellow: "bg-[#FFD700] text-gray-900",
        gray: "bg-gray-100 text-gray-900",
        blue: "bg-[#E8F4F9] text-gray-900",
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
    <div className="mb-4 border-b border-gray-200">
      <div className={cn(sectionHeadingVariants({ variant, className }))}>
        <h2 className="text-[13px] font-bold tracking-widest uppercase font-sans">{title}</h2>
      </div>
    </div>
  )
}
