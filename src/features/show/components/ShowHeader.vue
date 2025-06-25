<script setup lang="ts">
import Heading from "../../../components/atoms/Heading.vue";
import { Show } from "../../../types/shows";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <!-- Image -->
  <div v-if="show.image">
    <img
      :src="show.image.original"
      :alt="show.name"
      class="h-auto max-h-[600px] w-full rounded-4xl object-cover"
    />
  </div>

  <!-- Title & Genres -->
  <div class="space-y-4">
    <Heading :level="1" class="text-4xl font-bold">
      {{ show.name }}
    </Heading>

    <div v-if="show.genres?.length" class="flex flex-wrap gap-2">
      <span
        v-for="genre in show.genres"
        :key="genre"
        class="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
      >
        {{ genre }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
