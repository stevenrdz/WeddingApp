<template>
  <section :id="anchorId ?? 'faq'" class="section faq-section">
    <div class="container-safe">
      <p class="section-title text-left">PREGUNTAS FRECUENTES</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">Todo lo que necesitas saber</h2>
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div v-for="item in items" :key="item.question" class="card">
          <h3 class="font-heading text-lg">{{ item.question }}</h3>
          <p class="mt-2 text-black/70">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ items: Array<{ question: string; answer: string }>; anchorId?: string }>();
</script>
