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
    class="prose prose-invert mb-4 max-w-none"
    v-html="show.summary"
  />

  <!-- Show Meta Info -->
  <div class="flex flex-col gap-2 text-sm text-white/80">
    <p><strong>Type:</strong> {{ show.type }}</p>
    <p><strong>Language:</strong> {{ show.language }}</p>
    <p><strong>Status:</strong> {{ show.status }}</p>
    <p><strong>Runtime:</strong> {{ show.runtime || "N/A" }} minutes</p>
    <p><strong>Premiered:</strong> {{ show.premiered || "N/A" }}</p>
    <p><strong>Ended:</strong> {{ show.ended || "Ongoing" }}</p>

    <p v-if="show.schedule">
      <strong>Schedule:</strong>
      {{ show.schedule.days?.join(", ") || "N/A" }} at
      {{ show.schedule.time || "N/A" }}
    </p>

    <p><strong>Rating:</strong> {{ show.rating?.average ?? "N/A" }}</p>

    <p v-if="show.network">
      <strong>Network:</strong>
      {{ show.network.name }}
      <span v-if="show.network.country">
        ({{ show.network.country.name || "Unknown Country" }})
      </span>
    </p>
  </div>
</template>
