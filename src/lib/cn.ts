import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes without style conflicts.
 * Uses tailwind-merge which handles conditional, array, and falsy values natively (v3+).
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(...inputs)
}
