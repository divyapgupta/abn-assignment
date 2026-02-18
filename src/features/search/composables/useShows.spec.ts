import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";

import searchShows from "@/api/searchShows";
import { useShows } from "./useShows";

vi.mock("@/api/searchShows", () => ({
  default: vi.fn(),
}));

describe("useShows composable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches shows on mount using query", async () => {
    (searchShows as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { show: { id: 1, name: "Show 1" } },
      { show: { id: 2, name: "Show 2" } },
    ]);

    const query = ref("testquery");
    const { shows, loading, error } = useShows(query);

    expect(loading.value).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for immediate watcher

    expect(searchShows).toHaveBeenCalledWith("testquery");
    expect(shows.value.length).toBe(2);
    expect(shows.value[0].name).toBe("Show 1");
    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
  });

  it("handles API error correctly", async () => {
    (searchShows as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Fetch failed"),
    );

    const query = ref("fail");
    const { shows, loading, error } = useShows(query);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(searchShows).toHaveBeenCalledWith("fail");
    expect(shows.value.length).toBe(0);
    expect(loading.value).toBe(false);
    expect(error.value).toBe("Fetch failed");
  });

  it("fetches shows when query changes", async () => {
    const query = ref("");
    const { shows, loading } = useShows(query);

    expect(loading.value).toBe(false); // Empty query returns immediately
    expect(shows.value).toEqual([]);

    query.value = "Batman";
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(searchShows).toHaveBeenCalledWith("Batman");
  });

  it("does not fetch and clears shows if query is empty", async () => {
    const query = ref("");
    const { shows, loading, error } = useShows(query);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(searchShows).not.toHaveBeenCalled();
    expect(shows.value.length).toBe(0);
    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
  });
});
