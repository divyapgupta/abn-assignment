import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TextInput from "./TextInput.vue";

describe("TextInput.vue", () => {
  it("renders correctly with given props", () => {
    const wrapper = mount(TextInput, {
      props: {
        value: "Hello",
        placeholder: "Enter text",
        type: "text",
      },
    });

    const input = wrapper.get("input");

    expect(input.element.value).toBe("Hello");
    expect(input.attributes("placeholder")).toBe("Enter text");
    expect(input.attributes("type")).toBe("text");
  });

  it("emits update:value when input changes", async () => {
    const wrapper = mount(TextInput, {
      props: {
        value: "",
      },
    });

    const input = wrapper.get("input");
    await input.setValue("New value");

    const emitted = wrapper.emitted("update:value");
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual(["New value"]);
  });

  it("defaults to type=text if not provided", () => {
    const wrapper = mount(TextInput, {
      props: {
        value: "",
      },
    });

    const input = wrapper.get("input");
    expect(input.attributes("type")).toBe("text");
  });
});
