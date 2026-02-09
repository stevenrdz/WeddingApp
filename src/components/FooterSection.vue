<template>
  <footer :id="anchorId ?? 'footer'" class="border-t border-white/10 bg-[#2b241f] py-10 text-white/80">
    <div class="container-safe flex flex-col items-center justify-between gap-4 text-center text-sm md:flex-row md:text-left">
      <div>
        <div class="font-heading text-xl text-white">{{ message || "Gracias por acompañarnos" }}</div>
        <div v-if="contactEmail" class="mt-1 text-white/70">Contacto: {{ contactEmail }}</div>
      </div>
      <div class="text-white/60">© 2026 Provenza</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ contactEmail?: string; message?: string; anchorId?: string }>();
</script>

