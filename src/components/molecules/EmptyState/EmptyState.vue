<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800/50 p-12 text-center"
  >
    <div
      class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-8 w-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
    <h3 class="mb-2 text-xl font-semibold text-white">No results found</h3>
    <p class="text-gray-400">{{ message }}</p>
  </div>
</template>
