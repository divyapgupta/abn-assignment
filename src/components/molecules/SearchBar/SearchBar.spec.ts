import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TextInput from "../../atoms/TextInput/TextInput.vue";
import SearchBar from "./SearchBar.vue";

describe("SearchBar.vue", () => {
  it("renders the TextInput with initial query and emits update event on input", async () => {
    const wrapper = mount(SearchBar, {
      props: {
        searchQuery: "initial query",
      },
      global: {
        components: { TextInput },
      },
    });

    // Check if TextInput has the initial value
    const textInput = wrapper.findComponent(TextInput);
    expect(textInput.exists()).toBe(true);
    expect(textInput.props("value")).toBe("initial query");

    // Simulate emitting update:value from TextInput
    await textInput.vm.$emit("update:value", "new search query");

    // Check if the parent component emitted update:searchQuery event with the new value
    expect(wrapper.emitted("update:searchQuery")).toBeTruthy();
    expect(wrapper.emitted("update:searchQuery")![0]).toEqual([
      "new search query",
    ]);
  });

  it("defaults to empty string if query prop is not passed", () => {
    const wrapper = mount(SearchBar, {
      global: {
        components: { TextInput },
      },
    });

    const textInput = wrapper.findComponent(TextInput);
    expect(textInput.props("value")).toBe("");
  });
});
