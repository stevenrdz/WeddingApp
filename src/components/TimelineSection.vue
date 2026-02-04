<template>
  <section id="itinerario" class="section timeline-section">
    <div class="container-safe">
      <p class="section-title text-left">ITINERARIO</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">Momentos clave</h2>
      <div class="mt-8 grid gap-4">
        <div v-for="item in schedule" :key="item.time" class="card flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-sm uppercase tracking-widest text-black/50">{{ item.time }}</p>
            <p class="font-heading text-xl">{{ item.title }}</p>
          </div>
          <p class="text-black/70">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ schedule: Array<{ time: string; title: string; description: string }> }>();
</script>
