<template>
  <section :id="anchorId ?? 'galeria'" class="section gallery-section">
    <div class="container-safe">
      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2b241f] text-white shadow-lg">
        <div class="px-6 py-12 md:px-10 md:py-16">
          <p class="section-title text-white/70">GALERIA</p>
          <div class="ornament mx-auto mt-2"></div>
          <h2 class="mt-6 text-center font-heading text-4xl">Memorias</h2>
          <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <button
              v-for="(img, index) in gallery"
              :key="img.src"
              class="overflow-hidden rounded-2xl bg-white/10 transition hover:translate-y-[-2px] hover:bg-white/15"
              type="button"
              @click="open(index)"
            >
              <img class="h-48 w-full object-cover md:h-56" :src="img.src" :alt="img.alt" loading="lazy" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Lightbox v-if="isOpen" :images="gallery" :index="current" @close="isOpen = false" @update:index="current = $event" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Lightbox from "./Lightbox.vue";

defineProps<{ gallery: Array<{ src: string; alt: string }>; anchorId?: string }>();
const isOpen = ref(false);
const current = ref(0);

function open(index: number) {
  current.value = index;
  isOpen.value = true;
}
</script>
