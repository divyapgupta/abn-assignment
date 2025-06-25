import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "./Footer.vue";

describe("Footer.vue", () => {
  it("renders copyright text", () => {
    const wrapper = mount(Footer);
    expect(wrapper.text()).toContain("© 2025 Rakuten TV");
  });

  it("has correct CSS classes on div", () => {
    const wrapper = mount(Footer);
    const div = wrapper.find("div");
    expect(div.classes()).toEqual(
      expect.arrayContaining([
        "bg-primary",
        "p-4",
        "text-center",
        "text-gray-400",
      ]),
    );
  });
});
