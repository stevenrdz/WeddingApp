<template>
  <footer :id="anchorId ?? 'footer'" class="border-t py-10" :style="footerStyle">
    <div class="container-safe flex flex-col items-center justify-between gap-4 text-center text-sm md:flex-row md:text-left">
      <div>
        <div class="font-heading text-xl" :style="{ color: footerTextColor }">{{ message || 'Gracias por acompanarnos' }}</div>
        <div v-if="contactEmail" class="mt-1" :style="{ color: footerSubtleColor }">Contacto: {{ contactEmail }}</div>
      </div>
      <div :style="{ color: footerSubtleColor }">© 2026 Provenza</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ contactEmail?: string; message?: string; anchorId?: string; backgroundColor?: string }>();

const footerBgColor = computed(() => props.backgroundColor || "#2b241f");
const footerTextColor = computed(() => getReadableTextColor(footerBgColor.value));
const footerSubtleColor = computed(() => withAlpha(footerTextColor.value, 0.78));
const footerStyle = computed(() => ({
  backgroundColor: footerBgColor.value,
  borderColor: withAlpha(footerTextColor.value, 0.12)
}));

function getReadableTextColor(input: string) {
  const hex = normalizeHex(input);
  if (!hex) return "#f8fafc";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#0f172a" : "#f8fafc";
}

function normalizeHex(value: string) {
  const raw = String(value || "").trim();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(raw)) return "";
  if (raw.length === 7) return raw;
  return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
}

function withAlpha(hexColor: string, alpha: number) {
  const hex = normalizeHex(hexColor);
  if (!hex) return `rgba(248, 250, 252, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
</script>
