<script setup lang="ts">
import ShowCard from "@/components/molecules/ShowCard/ShowCard.vue";
import { useShows } from "@/features/home/composables/useShows";

const { shows, loading, error } = useShows();
</script>

<template>
  <div class="container mx-auto px-4 py-6 text-white">
    <div v-if="loading">Loading shows...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div v-for="[genre, genreShows] in shows" :key="genre" class="mb-8">
        <h2 class="mb-4 text-xl font-semibold">{{ genre }}</h2>
        <div class="flex gap-4 overflow-x-auto">
          <ShowCard
            v-for="genreShow in genreShows"
            :key="genreShow.id"
            :id="genreShow.id"
            :name="genreShow.name"
            :imageUrl="genreShow.image?.medium"
            :rating="genreShow.rating?.average"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
