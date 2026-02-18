import { ref, onMounted, type Ref } from "vue";
import type { Show } from "@/types/shows";
import fetchShows from "@/api/fetchShows";

export function useShows(): {
  shows: Ref<Map<string, Show[]>>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
} {
  const shows = ref<Map<string, Show[]>>(new Map());
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function getShowsGroupedByGenre(): Promise<void> {
    try {
      const showsListFromApi: Show[] = await fetchShows();
      shows.value = groupAndSortShows(showsListFromApi);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred";
    } finally {
      loading.value = false;
    }
  }

  onMounted(getShowsGroupedByGenre);

  return { shows, loading, error };
}

function groupAndSortShows(shows: Show[]): Map<string, Show[]> {
  const showsGroupedByGenre = new Map<string, Show[]>();

  for (const show of shows) {
    if (!show.genres) continue;

    for (const genre of show.genres) {
      if (!showsGroupedByGenre.has(genre)) {
        showsGroupedByGenre.set(genre, []);
      }
      showsGroupedByGenre.get(genre)!.push(show);
    }
  }

  // Sort each genre's shows by rating
  for (const genreShows of showsGroupedByGenre.values()) {
    genreShows.sort(
      (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
    );
  }

  return showsGroupedByGenre;
}
