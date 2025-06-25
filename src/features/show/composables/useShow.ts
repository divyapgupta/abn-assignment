import { ref, onMounted } from "vue";
import type { Show } from "../../../types/shows";
import fetchShowInformation from "../../../api/fetchShowInformation";

export function useShow(showId: number) {
  const show = ref<Show | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function getShowDetail() {
    loading.value = true;
    error.value = null;
    try {
      show.value = await fetchShowInformation(showId);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    getShowDetail();
  });

  return { show, loading, error };
}
