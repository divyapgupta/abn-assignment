<script setup lang="ts">
import Header from "@/components/organisms/Header/Header.vue";
import Footer from "@/components/organisms/Footer/Footer.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="container mx-auto max-w-7xl flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
