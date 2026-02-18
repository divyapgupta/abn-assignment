import { describe, it, expect, vi, type Mock } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { ref } from "vue";
import type { Show } from "@/types/shows";
import ShowCard from "@/components/molecules/ShowCard/ShowCard.vue";
import { useShows } from "@/features/home/composables/useShows";
import Home from "./Home.vue";

import ErrorDisplay from "@/components/molecules/ErrorDisplay/ErrorDisplay.vue";
import ShowCardSkeleton from "@/components/molecules/ShowCard/ShowCardSkeleton.vue";

vi.mock("@/features/home/composables/useShows");

describe("home.vue", () => {
  const mockShowsMap = new Map([
    [
      "Drama",
      [
        {
          id: 1,
          name: "Show A",
          image: { medium: "img-a.jpg" },
          rating: { average: 9 },
        },
        {
          id: 2,
          name: "Show B",
          image: { medium: "img-b.jpg" },
          rating: { average: 7 },
        },
      ],
    ],
    [
      "Comedy",
      [
        {
          id: 3,
          name: "Show C",
          image: { medium: "img-c.jpg" },
          rating: { average: 8 },
        },
      ],
    ],
  ]) as Map<string, Show[]>;

  it("renders loading state", () => {
    (useShows as Mock).mockReturnValue({
      shows: ref(new Map()),
      loading: ref(true),
      error: ref(null),
    });

    const wrapper = mount(Home, {
      global: {
        stubs: { ShowCardSkeleton },
      },
    });

    expect(wrapper.findAllComponents(ShowCardSkeleton).length).toBeGreaterThan(
      0,
    );
  });

  it("renders error message", () => {
    (useShows as Mock).mockReturnValue({
      shows: ref(new Map()),
      loading: ref(false),
      error: ref("Network error"),
    });

    const wrapper = mount(Home, {
      global: {
        stubs: { ErrorDisplay },
      },
    });

    expect(wrapper.text()).toContain("Network error");
    expect(wrapper.findComponent(ErrorDisplay).exists()).toBe(true);
  });

  it("renders grouped shows and ShowCard components", () => {
    (useShows as Mock).mockReturnValue({
      shows: ref(mockShowsMap),
      loading: ref(false),
      error: ref(null),
    });

    const wrapper = mount(Home, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    // Check genre titles
    expect(wrapper.text()).toContain("Drama");
    expect(wrapper.text()).toContain("Comedy");

    // Check ShowCard count
    const cards = wrapper.findAllComponents(ShowCard);
    expect(cards.length).toBe(3);

    // Check first ShowCard props
    expect(cards[0].props("id")).toBe(1);
    expect(cards[0].props("name")).toBe("Show A");
    expect(cards[0].props("imageUrl")).toBe("img-a.jpg");
    expect(cards[0].props("rating")).toBe(9);
  });
});
