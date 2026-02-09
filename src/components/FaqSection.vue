<template>
  <section :id="anchorId ?? 'faq'" class="section faq-section" :class="rootClass" :style="bg.style">
    <div class="container-safe">
      <div class="space-y-2">
        <p class="section-title">FAQ</p>
        <div class="ornament mx-auto"></div>
      </div>
      <div class="mt-6 grid gap-4">
        <details v-for="item in items" :key="item.question" class="card scroll-mt-28 group" @toggle="handleToggle">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <span class="font-heading text-xl md:text-2xl">{{ item.question }}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </summary>
          <p class="mt-3 text-black/70">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

function handleToggle(event: Event) {
  const target = event.currentTarget as HTMLDetailsElement | null;
  if (target?.open) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const props = defineProps<{ items: Array<{ question: string; answer: string }>; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => (props.background?.mode && props.background.mode !== "default" ? bg.value.className : "bg-white/60"));
</script>
