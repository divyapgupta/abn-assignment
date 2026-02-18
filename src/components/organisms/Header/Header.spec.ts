import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "./Header.vue";
import SearchBar from "@/components/molecules/SearchBar/SearchBar.vue";
import { routerKey, routeLocationKey } from "vue-router";

describe("Header.vue", () => {
  const mockRouter = {
    push: vi.fn(),
  };

  const mockRoute = {
    path: "/",
    name: "Home",
    params: {},
    query: {},
  };

  const mountOptions = {
    global: {
      provide: {
        [routerKey]: mockRouter,
        [routeLocationKey]: mockRoute,
      },
      stubs: {
        SearchBar,
        RouterLink: true,
      },
    },
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("navigates correctly based on searchQuery with debounce", async () => {
    const wrapper = mount(Header, mountOptions);
    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(true);

    // Emit valid query > 1 char
    await searchBar.vm.$emit("update:searchQuery", "hello");

    // Advance fake timers by debounce duration (assumed 500ms)
    vi.advanceTimersByTime(600);

    // Assert router.push called with search query
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "Search",
      query: { query: "hello" },
    });

    // Emit clearing query
    await searchBar.vm.$emit("update:searchQuery", "");

    vi.advanceTimersByTime(600);

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Home" });

    // Clear mocks before next test
    mockRouter.push.mockClear();

    // Emit single char query (should not navigate)
    await searchBar.vm.$emit("update:searchQuery", "a");

    vi.advanceTimersByTime(600);

    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
