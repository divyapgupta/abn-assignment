import { describe, it, expect, vi, type Mock } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { ref } from "vue";
import Search from "./Search.vue";
import ShowCard from "@/components/molecules/ShowCard/ShowCard.vue";
import ErrorDisplay from "@/components/molecules/ErrorDisplay/ErrorDisplay.vue";
import ShowCardSkeleton from "@/components/molecules/ShowCard/ShowCardSkeleton.vue";
import EmptyState from "@/components/molecules/EmptyState/EmptyState.vue";

vi.mock("@/features/search/composables/useShows", () => ({
  useShows: vi.fn(),
}));

vi.mock("vue-router", async () => {
  const actual = await vi.importActual("vue-router");
  return {
    ...actual,
    useRoute: vi.fn(() => ({
      query: { query: "Breaking Bad" },
    })),
  };
});

import { useShows } from "@/features/search/composables/useShows";

describe("Search.vue", () => {
  it("renders loading state", () => {
    (useShows as Mock).mockReturnValue({
      shows: ref([]),
      loading: ref(true),
      error: ref(null),
    });

    const wrapper = mount(Search, {
      global: {
        stubs: { ShowCard, ShowCardSkeleton },
      },
    });

    expect(wrapper.findAllComponents(ShowCardSkeleton).length).toBe(8);
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
        stubs: { ShowCard, ErrorDisplay },
      },
    });

    expect(wrapper.text()).toContain("Failed to load");
    expect(wrapper.findComponent(ErrorDisplay).exists()).toBe(true);
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
  });

  it("renders empty state when no shows found", () => {
    (useShows as Mock).mockReturnValue({
      searchQuery: ref("Unknown Show"),
      shows: ref([]),
      loading: ref(false),
      error: ref(null),
    });

    const wrapper = mount(Search, {
      global: {
        stubs: { EmptyState },
      },
    });

    expect(wrapper.findComponent(EmptyState).exists()).toBe(true);
    expect(wrapper.text()).toContain(
      "We couldn't find any shows matching 'Breaking Bad'.",
    );
  });
});
