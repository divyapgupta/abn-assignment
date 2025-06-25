import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Heading from "./Heading.vue";

describe("Heading.vue", () => {
  it("renders default h1 tag when no level is provided", () => {
    const wrapper = mount(Heading, {
      slots: {
        default: "Default Heading",
      },
    });

    expect(wrapper.find("h1").exists()).toBe(true);
    expect(wrapper.text()).toBe("Default Heading");
  });

  it("renders correct tag and class for each level", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;
    const expectedClasses = [
      "text-4xl", // h1
      "text-3xl", // h2
      "text-2xl", // h3
      "text-xl", // h4
      "text-lg", // h5
      "text-base", // h6
    ];

    levels.forEach((level, idx) => {
      const wrapper = mount(Heading, {
        props: { level },
        slots: { default: `Heading ${level}` },
      });

      const tag = wrapper.find(`h${level}`);
      expect(tag.exists()).toBe(true);
      expect(tag.text()).toBe(`Heading ${level}`);
      expect(tag.classes()).toContain(expectedClasses[idx]);
    });
  });

  it("applies custom className prop", () => {
    const wrapper = mount(Heading, {
      props: {
        level: 3,
        className: "custom-class",
      },
      slots: {
        default: "Test",
      },
    });

    const tag = wrapper.find("h3");
    expect(tag.classes()).toContain("custom-class");
  });
});
