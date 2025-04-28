import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Removed TypeScript type import and parameter type annotation
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
