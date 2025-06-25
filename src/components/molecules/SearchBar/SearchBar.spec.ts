import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TextInput from "../../atoms/TextInput/TextInput.vue";
import YourComponent from "./SearchBar.vue";

describe("YourComponent.vue", () => {
  it("renders the TextInput with initial query and emits update event on input", async () => {
    const wrapper = mount(YourComponent, {
      props: {
        query: "initial query",
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
    const wrapper = mount(YourComponent, {
      global: {
        components: { TextInput },
      },
    });

    const textInput = wrapper.findComponent(TextInput);
    expect(textInput.props("value")).toBe("");
  });
});
