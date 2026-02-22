<template>
  <section :id="anchorId ?? 'galeria'" class="section gallery-section" :class="[rootClass, sectionSizeClass]" :style="bg.style">
    <div class="container-safe">
      <p class="section-title">GALERIA</p>
      <div class="ornament mx-auto mt-2"></div>
      <h2 class="mt-6 text-center font-heading text-4xl">Memorias</h2>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <button
          v-for="(img, index) in gallery"
          :key="`${img.src}-${index}`"
          class="overflow-hidden rounded-2xl border border-black/10 bg-white/70 text-left transition hover:translate-y-[-2px] hover:shadow-sm"
          type="button"
          @click="open(index)"
        >
          <img class="h-48 w-full object-cover md:h-56" :src="img.src" :alt="img.alt || 'Foto de galeria'" loading="lazy" />
          <span v-if="img.authorName || img.sourceUrl" class="block truncate border-t border-black/5 px-3 py-2 text-[11px] text-black/55">
            Foto
            <template v-if="img.authorName"> por {{ img.authorName }}</template>
            <template v-if="img.sourceUrl"> · Unsplash</template>
          </span>
        </button>
      </div>

      <p v-if="hasCredits" class="mt-4 text-center text-xs text-black/55">Algunas fotos incluyen credito de autor.</p>
    </div>
    <Lightbox v-if="isOpen" :images="gallery" :index="current" @close="isOpen = false" @update:index="current = $event" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Lightbox from "./Lightbox.vue";
import type { SectionBackgroundConfig, SectionDisplaySize } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

const props = defineProps<{
  gallery: Array<{ src: string; alt: string; authorName?: string; authorUrl?: string; sourceUrl?: string }>;
  anchorId?: string;
  background?: SectionBackgroundConfig;
  size?: SectionDisplaySize;
}>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => bg.value.className);
const sectionSizeClass = computed(() => {
  if (props.size === "compact") return "py-10 md:py-14";
  if (props.size === "large") return "py-20 md:py-28";
  return "";
});
const hasCredits = computed(() => props.gallery.some((img) => Boolean(img.authorName || img.sourceUrl)));
const isOpen = ref(false);
const current = ref(0);

function open(index: number) {
  current.value = index;
  isOpen.value = true;
}
</script>
