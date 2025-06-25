<script setup lang="ts">
const props = defineProps<{
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}>();

const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

function onUpdateInputValue(e: Event) {
  emit("update:value", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    :value="props.value"
    :type="props.type || 'text'"
    :placeholder="props.placeholder"
    class="w-full rounded-md border border-white/20 bg-transparent px-4 py-3 text-base text-white placeholder-stone-500 focus:outline-none"
    @input="onUpdateInputValue"
  />
</template>
