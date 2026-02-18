import { apiClient } from "@/utils/apiClient";
import { Show } from "@/types/shows";

export default async function fetchShows(): Promise<Show[]> {
  return apiClient.get<Show[]>("/shows");
}
