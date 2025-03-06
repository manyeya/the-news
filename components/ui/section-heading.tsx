import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionHeadingVariants = cva(
  "inline-block px-3 py-1",
  {
    variants: {
      variant: {
        yellow: "bg-brand-yellow text-brand-dark",
        gray: "bg-brand-light text-brand-dark",
        blue: "bg-brand-blue text-brand-dark",
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
    <div className={cn(sectionHeadingVariants({ variant, className }))}>
      <h2 className="text-base font-medium">{title}</h2>
    </div>
  )
}