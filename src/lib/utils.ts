import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amountMdl: number): string {
  return `${amountMdl.toLocaleString("ro-MD")} lei`;
}

const AVATAR_COLORS = [
  { bg: "bg-primary-light", text: "text-primary" },
  { bg: "bg-success-bg", text: "text-success" },
  { bg: "bg-error-bg", text: "text-error" },
  { bg: "bg-warning-bg", text: "text-warning" },
  { bg: "bg-bg-elevated", text: "text-primary-hover" },
];

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getAvatarColor(name: string): { bg: string; text: string } {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}
