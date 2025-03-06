"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const descriptionVariants = cva(
  "text-gray-500 leading-relaxed",
  {
    variants: {
      size: {
        sm: "text-sm",
        default: "text-base md:text-lg",
        lg: "text-lg md:text-xl",
      },
      clamp: {
        none: "",
        sm: "line-clamp-2",
        default: "line-clamp-3",
        lg: "line-clamp-4",
        xl: "line-clamp-6",
      }
    },
    defaultVariants: {
      size: "default",
      clamp: "default",
    },
  }
)

export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {
  text: string;
  threshold?: number;
  buttonColor?: string;
}

export default function Description({ 
  className, 
  size, 
  clamp,
  text,
  threshold = 120,
  buttonColor = "text-blue-600",
  ...props 
}: DescriptionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldShowReadMore = !isExpanded && clamp !== 'none' && text.length > threshold;

  return (
    <div>
      <p
        className={cn(
          descriptionVariants({ 
            size, 
            clamp: isExpanded ? 'none' : clamp, 
            className 
          })
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        {...props}
      >
        {text}
      </p>
      {shouldShowReadMore && (
        <button 
          className={`text-sm ${buttonColor} mt-1`}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
        >
          ...
        </button>
      )}
    </div>
  )
}