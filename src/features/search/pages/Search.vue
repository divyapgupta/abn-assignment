<script setup lang="ts">
import { computed } from "vue";
import ShowCard from "../../../components/molecules/ShowCard/ShowCard.vue";
import { useShows } from "../composables/useShows";
import Heading from "../../../components/atoms/Heading/Heading.vue";

const { searchQuery, shows, loading, error } = useShows();

const headingText = computed(() =>
  shows.value.length !== 0
    ? `Search results for: ${searchQuery.value}`
    : `No results found for: ${searchQuery.value}`,
);
</script>

<template>
  <div class="container mx-auto px-4 py-6 text-white">
    <div v-if="loading">Loading shows...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <Heading :level="3" class="mb-4 text-xl font-semibold">
        {{ headingText }}
      </Heading>
      <div class="mb-8 flex flex-wrap gap-4">
        <div class="mb-8" v-for="show in shows" :key="show.id">
          <ShowCard
            :id="show.id"
            :name="show.name"
            :imageUrl="show.image?.medium"
            :rating="show.rating?.average"
            :genres="show.genres"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
