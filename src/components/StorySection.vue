<template>
  <section class="section story-section">
    <div class="container-safe max-w-3xl text-center">
      <p class="section-title">HISTORIA</p>
      <div class="ornament mx-auto mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">{{ story.title }}</h2>
      <p class="mt-4 text-black/70">{{ story.message }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ story: { title: string; message: string } }>();
</script>
