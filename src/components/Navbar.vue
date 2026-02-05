<template>
  <header class="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
    <div class="container-safe flex items-center justify-between py-4">
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

const icon = computed(() => props.config?.icon || "♥");

const links = computed<PageLink[]>(() => {
  if (props.config?.links?.length) return props.config.links;
  return [
    { label: "Inicio", target: "#hero" },
    { label: "Ubicaciones", target: "#ubicaciones" },
    { label: "Itinerario", target: "#itinerario" },
    { label: "RSVP", target: "#rsvp" },
    { label: "Galeria", target: "#galeria" }
  ];
});

const buttons = computed<ActionButton[]>(() => {
  if (props.config?.buttons?.length) return props.config.buttons;
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
</script>
