<script setup lang="ts">
import { useRoute } from "vue-router";
import { useShow } from "../composables/useShow";
import ShowHeader from "../components/ShowHeader.vue";
import ShowDetails from "../components/ShowDetails.vue";
import ShowCast from "../components/ShowCast.vue";

const route = useRoute();
const showId = Number(route.params.id);

const { show, loading, error } = useShow(showId);
</script>

<template>
  <div class="container mx-auto p-4 text-white">
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
