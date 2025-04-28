import * as React from "react"
import { cva } from "class-variance-authority" // Removed 'type VariantProps'

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80",
        secondary:
          "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        destructive:
          "border-transparent bg-red-500 text-zinc-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
        outline: "text-zinc-950 dark:text-zinc-50",
        // Added custom variants based on ProductCard usage
        success: "border-transparent bg-green-600 text-zinc-50 shadow hover:bg-green-600/80 dark:bg-green-800 dark:text-zinc-50 dark:hover:bg-green-800/80",
        warning: "border-transparent bg-yellow-500 text-zinc-900 shadow hover:bg-yellow-500/80 dark:bg-yellow-700 dark:text-zinc-50 dark:hover:bg-yellow-700/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Removed TypeScript interface BadgeProps

// Removed type annotation ': BadgeProps' from function parameters
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

