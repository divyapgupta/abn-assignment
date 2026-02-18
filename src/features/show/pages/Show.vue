<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useShow } from "@/features/show/composables/useShow";
import ShowHeader from "@/features/show/components/ShowHeader.vue";
import ShowDetails from "@/features/show/components/ShowDetails.vue";
import ShowCast from "@/features/show/components/ShowCast.vue";

const route = useRoute();
const router = useRouter();
const showId = Number(route.params.id);

const { show, loading, error } = useShow(showId);

function goBack() {
  router.back();
}
</script>

<template>
  <div class="container mx-auto p-4 text-white">
    <button
      @click="goBack"
      class="mb-6 cursor-pointer rounded px-4 py-2 transition hover:bg-gray-800"
    >
      ← Back
    </button>

    <div v-if="loading">Loading show details...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <div v-else-if="show" class="space-y-8">
      <ShowHeader :show="show" />
      <ShowDetails :show="show" />
      <ShowCast v-if="show._embedded?.cast" :cast="show._embedded.cast" />
    </div>
  </div>
</template>

<style scoped></style>
