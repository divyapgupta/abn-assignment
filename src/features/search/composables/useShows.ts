import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import type { Show } from "@/types/shows";
import searchShows from "@/api/searchShows";

export function useShows(): {
  searchQuery: Ref<string>;
  shows: Ref<Show[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
} {
  const route = useRoute();
  const shows = ref<Show[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const searchQuery = ref<string>((route.query.query as string) || "");

  async function getShows(query: string): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      if (!query) {
        shows.value = [];
        return;
      }
      const response = await searchShows(query);
      shows.value = response.map((item: { show: Show }) => item.show);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred";
    } finally {
      loading.value = false;
    }
  }

  // Watch for query changes and fetch immediately
  watch(
    () => route.query.query,
    (newQuery) => {
      const query = (newQuery as string) || "";
      searchQuery.value = query;
      getShows(query);
    },
    { immediate: true },
  );

  return { searchQuery, shows, loading, error };
}
