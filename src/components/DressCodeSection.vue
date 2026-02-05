<template>
  <section :id="anchorId ?? 'dress-code'" class="section dresscode-section bg-white/60">
    <div class="container-safe grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <p class="section-title text-left">DRESS CODE</p>
        <div class="ornament mt-2"></div>
        <h2 class="mt-4 font-heading text-3xl">{{ dressCode.title }}</h2>
      </div>
      <div class="card">
        <p class="text-black/70">{{ dressCode.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ dressCode: { title: string; description: string }; anchorId?: string }>();
</script>
