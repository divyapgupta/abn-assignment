import { defineComponent, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import searchShows from "@/api/searchShows";
import { useShows } from "./useShows";

vi.mock("@/api/searchShows", () => ({
  default: vi.fn(),
}));

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

import { useRoute } from "vue-router";

describe("useShows composable", () => {
  const mockUseRoute = useRoute as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Dummy test component that calls the composable
  const TestComponent = defineComponent({
    template: "<div></div>",
    setup() {
      return useShows();
    },
  });

  it("fetches shows on mount using query from route", async () => {
    mockUseRoute.mockReturnValue({ query: { query: "testquery" } });

    (searchShows as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { show: { id: 1, name: "Show 1" } },
      { show: { id: 2, name: "Show 2" } },
    ]);

    const wrapper = mount(TestComponent);

    await nextTick();
    await nextTick();

    expect(searchShows).toHaveBeenCalledWith("testquery");
    expect(wrapper.vm.searchQuery).toBe("testquery");
    expect(wrapper.vm.shows.length).toBe(2);
    expect(wrapper.vm.shows[0].name).toBe("Show 1");
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).toBe(null);
  });

  it("handles API error correctly", async () => {
    mockUseRoute.mockReturnValue({ query: { query: "fail" } });

    (searchShows as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Fetch failed"),
    );

    const wrapper = mount(TestComponent);

    await nextTick();
    await nextTick();

    expect(searchShows).toHaveBeenCalledWith("fail");
    expect(wrapper.vm.shows.length).toBe(0);
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).toBe("Fetch failed");
  });

  it("does not fetch and clears shows if query is empty", async () => {
    mockUseRoute.mockReturnValue({ query: { query: "" } });

    const wrapper = mount(TestComponent);

    await nextTick();
    await nextTick();

    expect(searchShows).not.toHaveBeenCalled();
    expect(wrapper.vm.shows.length).toBe(0);
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).toBe(null);
  });
});
