<script setup lang="ts">
import type { Show } from "../../../types/shows";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <!-- Show Summary -->
  <div
    v-if="show.summary"
    class="prose prose-invert mb-6 max-w-none text-sm sm:text-base"
    v-html="show.summary"
  />

  <!-- Show Meta Info -->
  <div
    class="flex flex-col gap-3 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
  >
    <p><strong>Type:</strong> {{ show.type }}</p>
    <p><strong>Language:</strong> {{ show.language }}</p>
    <p><strong>Status:</strong> {{ show.status }}</p>
    <p><strong>Runtime:</strong> {{ show.runtime || "N/A" }} minutes</p>
    <p><strong>Rating:</strong> {{ show.rating?.average ?? "N/A" }}</p>
  </div>
</template>
