import { describe, it, expect } from "vitest";
import { sanitizeInput } from "./inputSanitizer";

describe("sanitizeInput", () => {
  it("trims whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });

  it("removes HTML tags", () => {
    expect(sanitizeInput("<script>alert('xss')</script>hello")).toBe("hello");
    expect(sanitizeInput("<b>bold</b>")).toBe("bold");
    expect(sanitizeInput("<p>paragraph</p>")).toBe("paragraph");
  });

  it("handles empty string", () => {
    expect(sanitizeInput("")).toBe("");
  });

  it("handles string with only HTML tags", () => {
    expect(sanitizeInput("<div></div>")).toBe("");
  });

  it("preserves other characters", () => {
    expect(sanitizeInput("Batman & Robin")).toBe("Batman & Robin");
  });
});
