<template>
  <header class="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
    <div class="container-safe flex items-center justify-between py-4">
      <div class="flex items-center gap-3">
        <span class="font-script text-2xl text-primary">♥</span>
        <div class="font-heading text-lg tracking-widest">{{ coupleNames }}</div>
      </div>
      <nav class="hidden gap-6 text-sm md:flex">
        <a href="#hero">Inicio</a>
        <a href="#ubicaciones">Ubicaciones</a>
        <a href="#itinerario">Itinerario</a>
        <a href="#rsvp">RSVP</a>
        <a href="#galeria">Galeria</a>
      </nav>
      <a class="btn-outline text-sm" href="#rsvp">RSVP</a>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ coupleNames: string }>();
</script>
