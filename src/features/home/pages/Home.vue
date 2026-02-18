<script setup lang="ts">
import ShowCard from "@/components/molecules/ShowCard/ShowCard.vue";
import ShowCardSkeleton from "@/components/molecules/ShowCard/ShowCardSkeleton.vue";
import ErrorDisplay from "@/components/molecules/ErrorDisplay/ErrorDisplay.vue";
import { useShows } from "@/features/home/composables/useShows";

const { shows, loading, error } = useShows();
</script>

<template>
  <div class="container mx-auto px-4 py-6 text-white">
    <div v-if="loading" class="space-y-8">
      <div v-for="n in 3" :key="n">
        <div class="mb-4 h-8 w-48 animate-pulse rounded bg-gray-800"></div>
        <div class="flex gap-4 overflow-hidden">
          <ShowCardSkeleton v-for="i in 5" :key="i" />
        </div>
      </div>
    </div>

    <ErrorDisplay v-else-if="error" :message="error" />
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
