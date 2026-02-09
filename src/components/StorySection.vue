<template>
  <section :id="anchorId ?? 'historia'" class="section story-section" :class="rootClass" :style="bg.style">
    <div class="container-safe max-w-3xl text-center">
      <p class="section-title">HISTORIA</p>
      <div class="ornament mx-auto mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">{{ story.title }}</h2>
      <p class="mt-4 text-black/70">{{ story.message }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

const props = defineProps<{ story: { title: string; message: string }; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => bg.value.className);
</script>
