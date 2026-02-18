<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  },
  retry: {
    type: Function,
    default: null,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center"
  >
    <div
      class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    </div>
    <h3 class="mb-2 text-lg font-semibold text-red-400">
      Oops! Something went wrong
    </h3>
    <p class="text-gray-300">{{ message }}</p>
    <button
      v-if="retry"
      @click="retry()"
      class="mt-4 rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
    >
      Try Again
    </button>
  </div>
</template>
