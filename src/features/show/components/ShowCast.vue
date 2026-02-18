<script setup lang="ts">
import { castMember } from "@/types/shows";
import Heading from "@/components/atoms/Heading/Heading.vue";

defineProps<{
  cast: castMember[];
}>();

const fallbackImage = "https://placehold.co/210x295?text=No+Image";
</script>

<template>
  <Heading :level="4">Cast</Heading>
  <div
    class="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 flex space-x-4 overflow-x-auto p-4"
  >
    <div
      v-for="member in cast"
      :key="member.person.id"
      class="w-40 flex-shrink-0 rounded-2xl shadow-md transition hover:shadow-lg"
    >
      <img
        :src="member.person.image?.medium || fallbackImage"
        :alt="member.person.name"
        class="h-32 w-full rounded-t-2xl object-cover"
      />
      <div class="rounded-b-2xl p-4">
        <p>{{ member.person.name }}</p>
        <p class="text-sm text-gray-400">{{ member.character.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
