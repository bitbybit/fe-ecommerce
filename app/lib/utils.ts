// eslint-disable-next-line unicorn/prevent-abbreviations
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes in JS without style conflicts
 * @param inputs Tailwind CSS classes
 * @returns Correct class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
