import type { Show } from "@/types/shows";

export interface SearchResult {
  score: number;
  show: Show;
}

export default async function searchShows(
  query: string,
): Promise<SearchResult[]> {
  const res = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
  );

  if (!res.ok) throw new Error("Failed to search shows");

  return res.json() as Promise<SearchResult[]>;
}
