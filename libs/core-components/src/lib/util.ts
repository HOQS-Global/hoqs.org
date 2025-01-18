import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const arrayToObj = (arr: Array<string>) => arr.map(type => ({ label: type, value: type }));
