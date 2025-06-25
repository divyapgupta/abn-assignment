import { describe, it, expect, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import Search from "./Search.vue";
import ShowCard from "../../../components/molecules/ShowCard/ShowCard.vue";

vi.mock("../composables/useShows", () => ({
  useShows: vi.fn(),
}));

import { useShows } from "../composables/useShows";

describe("YourComponent.vue", () => {
  it("renders loading state", () => {
    (useShows as any).mockReturnValue({
      searchQuery: "test query",
      shows: [],
      loading: true,
      error: null,
    });

    const wrapper = mount(Search, {
      global: {
        stubs: { ShowCard },
      },
    });

    expect(wrapper.text()).toContain("Loading shows...");
  });

  it("renders error state", () => {
    (useShows as any).mockReturnValue({
      searchQuery: "test query",
      shows: [],
      loading: false,
      error: "Failed to load",
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

    (useShows as any).mockReturnValue({
      searchQuery: "Breaking Bad",
      shows: mockShows,
      loading: false,
      error: null,
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

    // Check props of first ShowCard
    expect(showCards[0].props()).toEqual({
      id: 1,
      name: "Show One",
      imageUrl: "image1.jpg",
      rating: 9,
      genres: ["Drama"],
    });
  });
});
