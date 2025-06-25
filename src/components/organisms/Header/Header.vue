<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import SearchBar from "../../molecules/SearchBar/SearchBar.vue";

const router = useRouter();
const route = useRoute();
const searchQuery = ref<string>("");

// Prefill searchQuery on component mount based on URL query param 'query'
onMounted(() => {
  if (route.query.query && typeof route.query.query === "string") {
    searchQuery.value = route.query.query;
  }
});

watch(
  () => route.query.query,
  (newQuery) => {
    if (typeof newQuery === "string" && newQuery !== searchQuery.value) {
      searchQuery.value = newQuery;
    }
  },
);

let debounceTimeout: ReturnType<typeof setTimeout>;

watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    const trimmedQuery = newQuery.trim();
    if (trimmedQuery.length > 1) {
      router.push({ name: "Search", query: { query: trimmedQuery } });
    } else if (trimmedQuery === "") {
      router.push({ name: "Home" });
    }
  }, 500);
});
</script>

<template>
  <header
    class="bg-primary flex w-full items-center justify-center border-b-[1px] border-white/5 px-4 py-2"
  >
    <nav class="flex w-full max-w-7xl items-center justify-between">
      <div class="flex items-center">
        <RouterLink to="/">
          <img src="/logo.png" alt="Logo" class="h-12 w-auto cursor-pointer" />
        </RouterLink>
      </div>

      <div class="flex items-center space-x-4">
        <SearchBar v-model:searchQuery="searchQuery" />
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
