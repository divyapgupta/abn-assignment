<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}>();

const tag = computed(() => `h${props.level || 1}`);

const sizeClass = computed(() => {
  switch (props.level) {
    case 1:
      return "text-4xl md:text-5xl";
    case 2:
      return "text-3xl md:text-4xl";
    case 3:
      return "text-2xl";
    case 4:
      return "text-xl";
    case 5:
      return "text-lg";
    case 6:
      return "text-base";
    default:
      return "text-2xl";
  }
});
</script>

<template>
  <component
    :is="tag"
    :class="['font-bold tracking-tight text-white', sizeClass, props.className]"
  >
    <slot />
  </component>
</template>

<style scoped></style>
