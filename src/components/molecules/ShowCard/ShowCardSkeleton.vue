<script setup lang="ts">
import SkeletonLoader from "@/components/atoms/SkeletonLoader/SkeletonLoader.vue";
</script>

<template>
  <div
    class="w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800 shadow-md sm:w-56 md:w-64"
  >
    <div class="aspect-[42/59] w-full">
      <SkeletonLoader width="100%" height="100%" border-radius="0" />
    </div>

    <div class="p-3">
      <SkeletonLoader width="90%" height="1.25rem" class="mb-2" />
      <SkeletonLoader width="40%" height="0.875rem" class="mb-2" />
      <SkeletonLoader width="60%" height="0.75rem" />
    </div>
  </div>
</template>
