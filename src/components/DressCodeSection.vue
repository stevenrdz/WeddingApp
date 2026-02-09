<template>
  <section :id="anchorId ?? 'dress-code'" class="section dresscode-section" :class="rootClass" :style="bg.style">
    <div class="container-safe">
      <div class="space-y-2 text-center">
        <p class="section-title">DRESS CODE</p>
        <div class="ornament mx-auto"></div>
        <h2 class="mt-4 font-heading text-3xl">{{ dressCode.title }}</h2>
      </div>
      <div class="mt-8 grid justify-center">
        <div class="card max-w-3xl">
          <p class="text-base leading-relaxed text-black/70 md:text-lg">{{ dressCode.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

const props = defineProps<{ dressCode: { title: string; description: string }; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => (props.background?.mode && props.background.mode !== "default" ? bg.value.className : "bg-white/60"));
</script>
