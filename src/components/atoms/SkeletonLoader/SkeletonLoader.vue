<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "1rem",
  },
  borderRadius: {
    type: String,
    default: "0.25rem",
  },
});
</script>

<template>
  <div
    class="skeleton"
    :style="{ width, height, borderRadius }"
    role="status"
    aria-label="Loading..."
  ></div>
</template>

<style scoped>
.skeleton {
  background-color: #2d3748;
  background-image: linear-gradient(
    90deg,
    #2d3748 0px,
    #4a5568 40px,
    #2d3748 80px
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}
</style>
