import { type ClassValue, clsx } from "clsx"
import { differenceInMinutes } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateRemainingTimeInMinutes(expirationDate: string) {
  const now = new Date();
  const minutesLeft = differenceInMinutes(expirationDate, now);

  return minutesLeft;
}