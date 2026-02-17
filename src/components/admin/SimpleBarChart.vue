<template>
  <div class="space-y-2">
    <div v-for="item in items" :key="item.label" class="grid grid-cols-[96px_minmax(0,1fr)_48px] items-center gap-3">
      <p class="text-xs font-semibold text-slate-700">{{ item.label }}</p>
      <div class="h-3 w-full rounded-full bg-slate-100">
        <div class="h-3 rounded-full bg-slate-900" :style="{ width: `${widthPct(item.value)}%` }"></div>
      </div>
      <p class="text-right text-xs font-semibold text-slate-700">{{ item.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type ChartItem = { label: string; value: number };

const props = defineProps<{ items: ChartItem[] }>();

const maxValue = computed(() => Math.max(1, ...props.items.map((i) => (Number.isFinite(i.value) ? i.value : 0))));

function widthPct(value: number) {
  const safe = Number.isFinite(value) ? value : 0;
  return Math.round((safe / maxValue.value) * 100);
}
</script>

