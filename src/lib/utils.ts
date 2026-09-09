import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Deterministically formats an ISO date string as "Mon YYYY" using UTC.
 * Prevents hydration mismatches between SSR and client-side timezones.
 */
export function formatUtcMonthYear(isoString?: string | null): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  return `${SHORT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/**
 * Deterministically formats an ISO date string as "Mon D, YYYY" using UTC.
 */
export function formatUtcDate(isoString?: string | null): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  return `${SHORT_MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
