import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asset(path: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/Takvapp_Web' : '';
  return `${basePath}${path}`;
}
