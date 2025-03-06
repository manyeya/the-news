"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const titleVariants = cva(
  "font-serif leading-tight cursor-pointer hover:underline",
  {
    variants: {
      size: {
        sm: "text-base",
        default: "text-lg md:text-xl",
        lg: "text-2xl md:text-3xl",
      },
      clamp: {
        none: "",
        sm: "line-clamp-1",
        default: "line-clamp-2",
        lg: "line-clamp-3",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      }
    },
    defaultVariants: {
      size: "default",
      clamp: "default",
      weight: "normal",
    },
  }
)

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof titleVariants> {
  text: string;
  threshold?: number;
}

export default function Title({
  className,
  size,
  clamp = "none",
  text,
  weight,
  ...props
}: TitleProps) {

  return (
    <div>
      <h1
        className={cn(
          titleVariants({
            size,
            clamp,
            weight,
            className
          })
        )}

        role="button"
        tabIndex={0}
        {...props}
      >
        {text}
      </h1>
    </div>
  )
}