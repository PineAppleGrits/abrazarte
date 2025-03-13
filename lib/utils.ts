export function formatDate(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-AR", options);
}

export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

export function parseTagsString(tags: string): string[] {
  return tags.split(",").map((tag) => tag.trim());
}

export function cn(...inputs: (string | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}
