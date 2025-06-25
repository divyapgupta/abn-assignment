<script setup lang="ts">
import TextInput from "../../atoms/TextInput/TextInput.vue";

const props = defineProps<{
  searchQuery?: string;
}>();

const emit = defineEmits<{
  (e: "update:searchQuery", query: string): void;
}>();

function onUpdateSearchQuery(value: string) {
  emit("update:searchQuery", value);
}
</script>

<template>
  <div class="relative mx-auto w-full max-w-md">
    <TextInput
      type="text"
      :value="props.searchQuery || ''"
      @update:value="onUpdateSearchQuery"
      placeholder="Search TV shows..."
    />
  </div>
</template>
