import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import type { Show } from "@/types/shows";
import searchShows from "@/api/searchShows";

export function useShows() {
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
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  // Initial fetch
  onMounted(() => {
    getShows(searchQuery.value);
  });

  // Watch for query changes
  watch(
    () => route.query.query,
    (newQuery) => {
      const query = (newQuery as string) || "";
      searchQuery.value = query;
      getShows(query);
    },
  );

  return { searchQuery, shows, loading, error };
}
