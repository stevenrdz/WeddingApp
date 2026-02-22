<template>
  <header class="sticky top-0 z-40 border-b backdrop-blur" :style="navbarStyle">
    <div class="container-safe flex items-center justify-between py-4" :style="{ color: navbarTextColor }">
      <div class="flex items-center gap-3">
        <span class="font-script text-2xl text-primary">{{ icon }}</span>
        <div class="font-heading text-lg tracking-widest">{{ coupleNames }}</div>
      </div>
      <nav class="hidden gap-6 text-sm md:flex">
        <a v-for="(link, index) in links" :key="`${link.label}-${index}`" :href="link.target">
          {{ link.label }}
        </a>
      </nav>
      <div class="hidden items-center gap-3 md:flex">
        <a
          v-for="(btn, index) in buttons"
          :key="`${btn.label}-${index}`"
          :class="btn.variant === 'solid' ? 'btn-primary text-sm' : 'btn-outline text-sm'"
          :style="buttonStyle(btn)"
          :href="btn.target"
        >
          {{ btn.label }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ActionButton, NavbarConfig, PageLink } from "../types/tenant";

const props = defineProps<{ coupleNames: string; config?: NavbarConfig }>();

const icon = computed(() => props.config?.icon || "?");
const navbarBgColor = computed(() => props.config?.backgroundColor || "#ffffff");
const navbarTextColor = computed(() => getReadableTextColor(navbarBgColor.value));
const navbarStyle = computed(() => ({
  backgroundColor: navbarBgColor.value,
  borderColor: withAlpha(navbarTextColor.value, 0.12)
}));

const links = computed<PageLink[]>(() => {
  if (props.config && "links" in props.config) return props.config.links ?? [];
  return [
    { label: "Inicio", target: "#hero" },
    { label: "Ubicaciones", target: "#ubicaciones" },
    { label: "Itinerario", target: "#itinerario" },
    { label: "RSVP", target: "#rsvp" },
    { label: "Galeria", target: "#galeria" }
  ];
});

const buttons = computed<ActionButton[]>(() => {
  if (props.config && "buttons" in props.config) return props.config.buttons ?? [];
  return [
    {
      label: "RSVP",
      target: "#rsvp",
      variant: "outline"
    }
  ];
});

function buttonStyle(btn: ActionButton) {
  if (btn.variant === "solid") {
    return {
      backgroundColor: btn.backgroundColor || "var(--color-primary)",
      color: btn.textColor || "white",
      borderColor: btn.borderColor || "transparent"
    };
  }
  return {
    backgroundColor: "transparent",
    borderColor: btn.borderColor || "var(--color-accent)",
    color: btn.textColor || "var(--color-accent)"
  };
}

function getReadableTextColor(input: string) {
  const hex = normalizeHex(input);
  if (!hex) return "#0f172a";
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
  if (!hex) return `rgba(15, 23, 42, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
</script>
