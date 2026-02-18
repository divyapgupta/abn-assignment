import { describe, it, expect, vi, type Mock } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { ref } from "vue";
import Search from "./Search.vue";
import ShowCard from "@/components/molecules/ShowCard/ShowCard.vue";

vi.mock("@/features/search/composables/useShows", () => ({
  useShows: vi.fn(),
}));

import { useShows } from "@/features/search/composables/useShows";

describe("Search.vue", () => {
  it("renders loading state", () => {
    (useShows as Mock).mockReturnValue({
      searchQuery: ref("test query"),
      shows: ref([]),
      loading: ref(true),
      error: ref(null),
    });

    const wrapper = mount(Search, {
      global: {
        stubs: { ShowCard },
      },
    });

    expect(wrapper.text()).toContain("Loading shows...");
  });

  it("renders error state", () => {
    (useShows as Mock).mockReturnValue({
      searchQuery: ref("test query"),
      shows: ref([]),
      loading: ref(false),
      error: ref("Failed to load"),
    });

    const wrapper = mount(Search, {
      global: {
        stubs: { ShowCard },
      },
    });

    expect(wrapper.text()).toContain("Error: Failed to load");
  });

  it("renders shows list and search query heading", () => {
    const mockShows = [
      {
        id: 1,
        name: "Show One",
        image: { medium: "image1.jpg" },
        rating: { average: 9 },
        genres: ["Drama"],
      },
      {
        id: 2,
        name: "Show Two",
        image: { medium: "image2.jpg" },
        rating: { average: 7 },
        genres: ["Comedy"],
      },
    ];

    (useShows as Mock).mockReturnValue({
      searchQuery: ref("Breaking Bad"),
      shows: ref(mockShows),
      loading: ref(false),
      error: ref(null),
    });

    const wrapper = mount(Search, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          ShowCard,
        },
      },
    });

    expect(wrapper.text()).toContain("Search results for: Breaking Bad");

    const showCards = wrapper.findAllComponents(ShowCard);
    expect(showCards.length).toBe(mockShows.length);

    expect(showCards[0].props()).toEqual({
      id: 1,
      name: "Show One",
      imageUrl: "image1.jpg",
      rating: 9,
      genres: ["Drama"],
    });
  });
});
