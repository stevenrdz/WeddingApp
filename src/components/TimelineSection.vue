<template>
  <section :id="anchorId ?? 'itinerario'" class="section timeline-section" :class="[rootClass, sectionSizeClass]" :style="bg.style">
    <div class="container-safe">
      <SectionHeader
        title="ITINERARIO"
        :heading="header?.headingText ?? 'Momentos clave'"
        :align="header?.align ?? 'left'"
        :ornament="header?.ornament"
        :title-style="header?.titleStyle"
        :heading-style="header?.headingStyle"
        :tagline-style="header?.taglineStyle"
      />
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
import { computed } from "vue";
import type { PageSection, SectionBackgroundConfig, SectionDisplaySize } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";
import SectionHeader from "./SectionHeader.vue";

const props = defineProps<{ schedule: Array<{ time: string; title: string; description: string }>; anchorId?: string; background?: SectionBackgroundConfig; header?: PageSection["header"]; size?: SectionDisplaySize }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => bg.value.className);
const sectionSizeClass = computed(() => {
  if (props.size === "compact") return "py-10 md:py-14";
  if (props.size === "large") return "py-20 md:py-28";
  return "";
});
</script>
