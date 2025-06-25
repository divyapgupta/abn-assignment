<script setup lang="ts">
import { RouterLink } from "vue-router";
import Heading from "../../atoms/Heading/Heading.vue";

defineProps<{
  id: number;
  name: string;
  imageUrl?: string;
  rating: number | null;
  genres?: string[];
}>();
</script>

<template>
  <RouterLink :to="`/show/${id}`">
    <div
      class="group w-40 flex-shrink-0 overflow-hidden rounded-lg shadow-md sm:w-56 md:w-64"
    >
      <div class="overflow-hidden">
        <img
          :src="imageUrl || 'https://placehold.co/210x295?text=No+Image'"
          :alt="name"
          class="aspect-[42/59] w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div class="p-3 text-white">
        <Heading :level="5" class="line-clamp-2 font-semibold">
          {{ name }}
        </Heading>
        <p class="mt-1 text-sm text-stone-400">
          Rating: {{ rating !== null ? rating : "N/A" }}
        </p>
        <p v-if="genres" class="mt-1 text-xs text-stone-500">
          Genre: {{ genres.join(", ") }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
