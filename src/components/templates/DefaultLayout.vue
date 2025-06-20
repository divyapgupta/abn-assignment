<script setup lang="ts"></script>

<template>
  <div class="default-layout">
    <header>
      <h1>TV Show Dashboards</h1>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; 2025 TV Show Dashboard</p>
    </footer>
  </div>
</template>

<style scoped>
@reference "../../styles/main.css";
.default-layout {
  @apply flex min-h-screen flex-col bg-black text-white;
}
</style>
