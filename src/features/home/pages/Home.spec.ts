import { describe, it, expect, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import ShowCard from "../../../components/molecules/ShowCard/ShowCard.vue";
import * as useShowsModule from "../composables/useShows";
import Home from "./Home.vue";

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
  ]);

  it("renders loading state", () => {
    vi.spyOn(useShowsModule, "useShows").mockReturnValue({
      shows: new Map(),
      loading: true,
      error: null,
    });

    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("Loading shows...");
  });

  it("renders error message", () => {
    vi.spyOn(useShowsModule, "useShows").mockReturnValue({
      shows: new Map(),
      loading: false,
      error: "Network error",
    });

    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("Error: Network error");
  });

  it("renders grouped shows and ShowCard components", () => {
    vi.spyOn(useShowsModule, "useShows").mockReturnValue({
      shows: mockShowsMap,
      loading: false,
      error: null,
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
