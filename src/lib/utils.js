/**
 * Utility function that combines Tailwind CSS classes using clsx and tailwind-merge
 * - clsx: Handles conditional class names and combines them
 * - tailwind-merge: Intelligently merges Tailwind CSS classes without conflicts
 *
 * @param {...string} inputs - CSS class names to be combined
 * @returns {string} - Merged and deduped class names
 *
 * Example:
 * cn('px-2 py-1', condition && 'bg-blue-500', 'bg-red-500')
 * If condition is true: 'px-2 py-1 bg-blue-500'
 * If condition is false: 'px-2 py-1 bg-red-500'
 */
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
