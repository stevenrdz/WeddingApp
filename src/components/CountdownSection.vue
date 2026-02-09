<template>
  <section :id="anchorId ?? 'cuenta-regresiva'" class="section countdown-section" :class="rootClass" :style="bg.style">
    <div class="container-safe text-center">
      <p class="section-title">CUENTA REGRESIVA</p>
      <div class="ornament mx-auto mt-2"></div>
      <p class="mt-4 text-black/70">Nos vemos en</p>
      <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="card">
          <p class="font-heading text-3xl font-semibold">{{ countdown.days }}</p>
          <p class="text-xs uppercase tracking-widest">Dias</p>
        </div>
        <div class="card">
          <p class="font-heading text-3xl font-semibold">{{ countdown.hours }}</p>
          <p class="text-xs uppercase tracking-widest">Horas</p>
        </div>
        <div class="card">
          <p class="font-heading text-3xl font-semibold">{{ countdown.minutes }}</p>
          <p class="text-xs uppercase tracking-widest">Min</p>
        </div>
        <div class="card">
          <p class="font-heading text-3xl font-semibold">{{ countdown.seconds }}</p>
          <p class="text-xs uppercase tracking-widest">Seg</p>
        </div>
      </div>
      <p v-if="countdown.isPast" class="mt-4 text-black/60">Gracias por celebrar con nosotros.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getCountdown } from "../utils/countdown";
import { sectionBackground } from "../utils/sectionBackground";
import type { SectionBackgroundConfig } from "../types/tenant";

const props = defineProps<{ dateIso: string; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => (props.background?.mode && props.background.mode !== "default" ? bg.value.className : "bg-white/60"));
const countdown = ref(getCountdown(props.dateIso));
let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => {
    countdown.value = getCountdown(props.dateIso);
  }, 1000);
});

onUnmounted(() => {
  if (timer) window.clearInterval(timer);
});
</script>
