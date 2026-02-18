/**
 * Sanitizes input string by trimming whitespace and removing HTML tags.
 * @param input - The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
  // Remove other HTML tags
  sanitized = sanitized.replace(/<[^>]*>?/gm, "");
  return sanitized.trim();
}
