import { ref, onMounted, type Ref } from "vue";
import type { Show } from "../../../types/shows";
import fetchShows from "../../../api/fetchShows";

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

      // Group shows by genre
      const showsGroupedByGenre = new Map<string, Show[]>();
      showsListFromApi.forEach((show) => {
        if (show.genres) {
          show.genres.forEach((genre) => {
            if (!showsGroupedByGenre.has(genre)) {
              showsGroupedByGenre.set(genre, []);
            }
            showsGroupedByGenre.get(genre)!.push(show);
          });
        }
      });

      // Sort each genre's shows by rating
      showsGroupedByGenre.forEach((genreShows) => {
        genreShows.sort(
          (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
        );
      });

      shows.value = showsGroupedByGenre;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  onMounted(getShowsGroupedByGenre);

  return { shows, loading, error };
}
