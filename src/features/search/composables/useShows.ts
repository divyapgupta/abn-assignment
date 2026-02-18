import { ref, watch, type Ref } from "vue";
import type { Show } from "@/types/shows";
import searchShows from "@/api/searchShows";
import { sortShowsByRating } from "@/utils/sortShows";
import { sanitizeInput } from "@/utils/inputSanitizer";

export function useShows(query: Ref<string>): {
  shows: Ref<Show[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
} {
  const shows = ref<Show[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function getShows(q: string): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const sanitizedQuery = sanitizeInput(q);
      if (!sanitizedQuery) {
        shows.value = [];
        return;
      }
      const response = await searchShows(sanitizedQuery);
      const mappedShows = response.map((item: { show: Show }) => item.show);
      shows.value = sortShowsByRating(mappedShows);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred";
    } finally {
      loading.value = false;
    }
  }

  // Watch for query changes and fetch immediately
  watch(
    query,
    (newQuery) => {
      getShows(newQuery || "");
    },
    { immediate: true },
  );

  return { shows, loading, error };
}
