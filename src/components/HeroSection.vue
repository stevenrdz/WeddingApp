<template>
  <section
    id="hero"
    :class="[
      'section hero-section',
      heroSurfaceClass
    ]"
    :style="heroStyle"
  >
    <div class="container-safe grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p :class="['badge', isEnchanted ? 'enchanted-badge' : 'bg-white/10 text-white']">
          {{ formattedDate }}
        </p>
        <div class="mt-6 space-y-4">
          <div class="ornament" :class="isEnchanted ? 'opacity-60' : ''"></div>
          <h1 :class="[isEnchanted ? 'font-heading text-5xl md:text-7xl' : 'font-script text-5xl md:text-7xl']">
            {{ tenant.coupleNames }}
          </h1>
        </div>
        <p :class="['mt-4 text-lg', isEnchanted ? 'text-black/70' : 'text-white/80']">
          {{ tenant.hero.tagline }}
        </p>
        <div v-if="heroButtons.length" class="mt-6 flex flex-wrap gap-4">
          <a
            v-for="(btn, index) in heroButtons"
            :key="`${btn.label}-${index}`"
            :class="btn.variant === 'solid' ? 'btn-primary' : 'btn-outline'"
            :style="buttonStyle(btn)"
            :href="btn.target"
          >
            {{ btn.label }}
          </a>
        </div>
        <div v-if="isEnchanted" class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="enchanted-detail-card">
            <p class="text-xs uppercase tracking-[0.3em] text-black/50">Ceremonia</p>
            <p class="mt-2 font-heading text-xl">{{ tenant.ceremony.name }}</p>
            <p class="text-black/60">{{ tenant.ceremony.time }} · {{ tenant.ceremony.address }}</p>
          </div>
          <div class="enchanted-detail-card">
            <p class="text-xs uppercase tracking-[0.3em] text-black/50">Recepcion</p>
            <p class="mt-2 font-heading text-xl">{{ tenant.reception.name }}</p>
            <p class="text-black/60">{{ tenant.reception.time }} · {{ tenant.reception.address }}</p>
          </div>
        </div>
      </div>
      <div v-if="isEnchanted" class="grid gap-4 sm:grid-cols-2">
        <div class="enchanted-image-frame sm:row-span-2">
          <img
            class="h-full w-full object-cover"
            :src="heroImages[0]?.src"
            :alt="heroImages[0]?.alt || 'Foto principal'"
            loading="lazy"
          />
        </div>
        <div class="enchanted-image-frame">
          <img
            class="h-full w-full object-cover"
            :src="heroImages[1]?.src || heroImages[0]?.src"
            :alt="heroImages[1]?.alt || 'Foto secundaria'"
            loading="lazy"
          />
        </div>
        <div class="enchanted-image-caption">
          <p class="text-xs uppercase tracking-[0.3em] text-black/50">Save the date</p>
          <p class="mt-3 font-heading text-2xl">{{ formattedDate }}</p>
          <p class="mt-2 text-sm text-black/60">Te esperamos para celebrar este momento.</p>
        </div>
      </div>
      <div v-else class="panel-glass space-y-4">
        <h3 class="font-heading text-2xl">Detalles</h3>
        <div>
          <p class="text-sm uppercase tracking-widest text-white/60">Ceremonia</p>
          <p class="font-medium">{{ tenant.ceremony.name }}</p>
          <p class="text-white/70">{{ tenant.ceremony.time }} · {{ tenant.ceremony.address }}</p>
        </div>
        <div>
          <p class="text-sm uppercase tracking-widest text-white/60">Recepcion</p>
          <p class="font-medium">{{ tenant.reception.name }}</p>
          <p class="text-white/70">{{ tenant.reception.time }} · {{ tenant.reception.address }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ActionButton, HeroLayoutConfig, TenantConfig } from "../types/tenant";
import { parseDateOnlyLocal } from "../utils/dateOnly";

const props = defineProps<{ tenant: TenantConfig; variant?: "default" | "enchanted"; heroConfig?: HeroLayoutConfig }>();
const isEnchanted = computed(() => props.variant === "enchanted");
const heroImages = computed(() => props.tenant.gallery?.slice(0, 2) ?? []);

const heroButtons = computed(() => {
  // If buttons are explicitly configured (even empty), respect that (allows hiding buttons).
  if (props.heroConfig && "buttons" in props.heroConfig) {
    return (props.heroConfig.buttons ?? []).filter((btn) => btn.label && btn.target);
  }
  return [
    {
      label: props.tenant.hero.ctaPrimaryText,
      target: props.tenant.hero.ctaPrimaryTarget || "#rsvp",
      variant: "solid"
    },
    {
      label: props.tenant.hero.ctaSecondaryText,
      target: props.tenant.hero.ctaSecondaryTarget || "#ubicaciones",
      variant: "outline"
    }
  ];
});

const heroSurfaceClass = computed(() => {
  if (isEnchanted.value) return "enchanted-hero text-[#3b2b23]";
  const mode = props.heroConfig?.backgroundMode;
  if (mode === "color" || mode === "image") return "text-white";
  return "hero-surface text-white";
});

const heroStyle = computed(() => {
  const mode = props.heroConfig?.backgroundMode;
  if (mode === "color") {
    return { backgroundColor: props.heroConfig?.backgroundColor || "var(--color-ink)" };
  }
  if (mode === "image" && props.heroConfig?.backgroundImageUrl) {
    return {
      backgroundImage: `url('${props.heroConfig.backgroundImageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  }
  return {};
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

const formattedDate = computed(() => {
  const date = parseDateOnlyLocal(props.tenant.dateISO) ?? new Date(props.tenant.dateISO);
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
});
</script>
