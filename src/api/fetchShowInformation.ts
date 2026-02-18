import { apiClient } from "@/utils/apiClient";
import { Show } from "@/types/shows";

export default async function fetchShowInformation(
  showId: number,
): Promise<Show> {
  return apiClient.get<Show>(`/shows/${showId}`, { embed: "cast" });
}
