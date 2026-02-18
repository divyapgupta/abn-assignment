import { apiClient } from "@/utils/apiClient";
import type { Show } from "@/types/shows";

export interface SearchResult {
  score: number;
  show: Show;
}

export default async function searchShows(
  query: string,
): Promise<SearchResult[]> {
  return apiClient.get<SearchResult[]>("/search/shows", { q: query });
}
