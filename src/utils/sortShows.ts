import { Show } from "@/types/shows";

export function sortShowsByRating(shows: Show[]): Show[] {
  return shows.sort(
    (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
  );
}
