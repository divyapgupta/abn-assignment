import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import ShowCard from "./ShowCard.vue";

describe("ShowCard.vue", () => {
  const defaultProps = {
    id: 123,
    name: "Breaking Bad",
    imageUrl: "https://example.com/poster.jpg",
    rating: 9.5,
    genres: ["Drama", "Crime"],
  };

  it("renders correctly with all props", () => {
    const wrapper = mount(ShowCard, {
      props: defaultProps,
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const img = wrapper.get("img");
    expect(img.attributes("src")).toBe(defaultProps.imageUrl);
    expect(wrapper.text()).toContain("Breaking Bad");
    expect(wrapper.text()).toContain("Rating: 9.5");
    expect(wrapper.text()).toContain("Genre: Drama, Crime");
  });

  it("falls back to placeholder image if imageUrl is missing", () => {
    const wrapper = mount(ShowCard, {
      props: {
        ...defaultProps,
        imageUrl: undefined,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const img = wrapper.get("img");
    expect(img.attributes("src")).toContain("https://placehold.co");
  });

  it("displays 'N/A' if rating is null", () => {
    const wrapper = mount(ShowCard, {
      props: {
        ...defaultProps,
        rating: null,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Rating: N/A");
  });

  it("does not show genre paragraph if genres are not provided", () => {
    const wrapper = mount(ShowCard, {
      props: {
        ...defaultProps,
        genres: undefined,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).not.toContain("Genre:");
  });

  it("links to the correct route", () => {
    const wrapper = mount(ShowCard, {
      props: defaultProps,
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const link = wrapper.getComponent(RouterLinkStub);
    expect(link.props().to).toBe(`/show/${defaultProps.id}`);
  });
});
