<template>
  <footer class="section footer-section">
    <div class="container-safe">
      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2b241f] text-white shadow-lg">
        <div class="flex flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          <div>
            <p class="font-heading text-2xl">Gracias por acompanarnos</p>
            <p v-if="contactEmail" class="text-white/70">Contacto: {{ contactEmail }}</p>
          </div>
          <p class="text-sm text-white/60">© 2026 WeddingApp</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ contactEmail?: string }>();
</script>
