import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date ?? new Date());
}

export function parseTagsString(tagsString: string): string[] {
  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}


export function calculateReadTime(content: string): number {

  const plainText = content.replace(/<[^>]+>/g, "");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / 200);
}