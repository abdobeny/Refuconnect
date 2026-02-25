import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely.
 * Example: cn("bg-red-500", "bg-blue-500") -> "bg-blue-500" (last one wins)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}