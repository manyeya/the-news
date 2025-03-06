import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes any content after the last hyphen (-) in a string
 * @param text The input string to clean
 * @returns The cleaned string without content after the last hyphen
 */
export function clean(text: string): string {
  if (!text) return "";
  
  const lastHyphenIndex = text.lastIndexOf("-");
  
  // If no hyphen is found, return the original string
  if (lastHyphenIndex === -1) {
    return text;
  }
  
  // Return the substring before the last hyphen
  return text.substring(0, lastHyphenIndex).trim();
}


export function getRandomInt(min: number, max: number): number {

  if (min > max) {
    throw new Error("Min should not be greater than Max");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}