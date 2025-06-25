import { describe, it, expect, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import fetchShows from "../../../api/fetchShows";
import { useShows } from "./useShows";

vi.mock("../../../api/fetchShows");

const mockedFetchShows = fetchShows as vi.MockedFunction<typeof fetchShows>;

describe("useShows composable", () => {
  const TestComponent = defineComponent({
    template: "<div></div>",
    setup() {
      return useShows();
    },
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("loads and groups shows correctly", async () => {
    // Arrange: mock fetchShows to return sample data
    mockedFetchShows.mockResolvedValueOnce([
      {
        id: 1,
        name: "Show A",
        genres: ["Drama", "Thriller"],
        rating: { average: 8.5 },
        image: { medium: "urlA" },
      },
      {
        id: 2,
        name: "Show B",
        genres: ["Drama"],
        rating: { average: 9.0 },
        image: { medium: "urlB" },
      },
      {
        id: 3,
        name: "Show C",
        genres: ["Comedy"],
        rating: { average: 7.0 },
        image: { medium: "urlC" },
      },
    ]);

    const wrapper = mount(TestComponent);

    await nextTick();
    await nextTick();

    const shows = wrapper.vm.shows;
    const loading = wrapper.vm.loading;
    const error = wrapper.vm.error;

    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(shows instanceof Map).toBe(true);
    expect(Array.from(shows.keys())).toEqual(
      expect.arrayContaining(["Drama", "Thriller", "Comedy"]),
    );

    const dramaShows = shows.get("Drama")!;
    expect(dramaShows[0].name).toBe("Show B");
    expect(dramaShows[1].name).toBe("Show A");

    // Thriller genre has Show A
    expect(shows.get("Thriller")![0].name).toBe("Show A");

    // Comedy genre has Show C
    expect(shows.get("Comedy")![0].name).toBe("Show C");
  });

  it("handles fetchShows error", async () => {
    mockedFetchShows.mockRejectedValueOnce(new Error("Network error"));

    const wrapper = mount(TestComponent);

    await nextTick();
    await nextTick();

    const loading = wrapper.vm.loading;
    const error = wrapper.vm.error;

    expect(loading).toBe(false);
    expect(error).toBe("Network error");
  });
});
