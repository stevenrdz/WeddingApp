<template>
  <section :id="anchorId ?? 'historia'" class="section story-section" :class="rootClass" :style="bg.style">
    <div class="container-safe max-w-3xl">
      <SectionHeader
        title="HISTORIA"
        :heading="header?.headingText ?? story.title"
        :tagline="header?.taglineText ?? story.message"
        :align="header?.align ?? 'center'"
        :ornament="header?.ornament"
        :title-style="header?.titleStyle"
        :heading-style="header?.headingStyle"
        :tagline-style="header?.taglineStyle"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PageSection, SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";
import SectionHeader from "./SectionHeader.vue";

const props = defineProps<{ story: { title: string; message: string }; anchorId?: string; background?: SectionBackgroundConfig; header?: PageSection["header"] }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => bg.value.className);
</script>
