<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ShowCardSkeleton from "@/components/molecules/ShowCard/ShowCardSkeleton.vue";
import ShowCard from "@/components/molecules/ShowCard/ShowCard.vue";
import ErrorDisplay from "@/components/molecules/ErrorDisplay/ErrorDisplay.vue";
import EmptyState from "@/components/molecules/EmptyState/EmptyState.vue";
import { useShows } from "@/features/search/composables/useShows";
import Heading from "@/components/atoms/Heading/Heading.vue";

const route = useRoute();
const searchQuery = computed(() => (route.query.query as string) || "");
const { shows, loading, error } = useShows(searchQuery);
</script>

<template>
  <div class="container mx-auto px-4 py-6 text-white">
    <div v-if="loading" class="mb-8 flex flex-wrap gap-4">
      <ShowCardSkeleton v-for="n in 8" :key="n" />
    </div>

    <ErrorDisplay v-else-if="error" :message="error" />

    <div v-else>
      <div v-if="shows.length > 0">
        <Heading :level="3" class="mb-4 text-xl font-semibold">
          Search results for: {{ searchQuery }}
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
      <EmptyState
        v-else
        :message="`We couldn't find any shows matching '${searchQuery}'.`"
      />
    </div>
  </div>
</template>

<style scoped></style>
