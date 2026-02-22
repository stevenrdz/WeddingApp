<template>
  <section
    id="hero"
    :class="[
      'section hero-section relative overflow-hidden',
      heroSurfaceClass,
      !isEnchanted ? 'bg-cover bg-center bg-no-repeat' : ''
    ]"
    :style="heroStyle"
  >
    <div v-if="!isEnchanted" class="pointer-events-none absolute inset-0 bg-black/25"></div>
    <div :class="heroGridClass">
      <div :class="heroContentClass">
        <p :class="['badge', isEnchanted ? 'enchanted-badge' : 'bg-white/10 text-white']">
          {{ formattedDate }}
        </p>
        <div class="mt-6 space-y-4">
          <div :class="['ornament', isEnchanted ? 'opacity-60' : '', heroAlignClass === 'center' ? 'mx-auto' : heroAlignClass === 'right' ? 'ml-auto' : '']"></div>
          <h1 :class="[isEnchanted ? 'font-heading text-5xl md:text-7xl' : 'font-script text-5xl md:text-7xl']">
            {{ tenant.coupleNames }}
          </h1>
        </div>
        <p :class="['mt-4 text-lg', isEnchanted ? 'text-black/70' : 'text-white/80']">
          {{ tenant.hero.tagline }}
        </p>
        <div v-if="heroButtons.length" :class="['mt-6 flex flex-wrap gap-4', heroButtonsJustifyClass]">
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
      <div v-else-if="showDetailPanel" class="panel-glass space-y-4">
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
const heroAlignClass = computed(() => props.heroConfig?.align || "left");
const showDetailPanel = computed(() => (props.heroConfig?.showPanelGlass ?? true) && !isEnchanted.value);

const heroGridClass = computed(() => {
  if (isEnchanted.value) return "container-safe relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center";
  if (!showDetailPanel.value) return "container-safe relative z-10 grid min-h-[calc(100vh-5rem)] content-center gap-10";
  return "container-safe relative z-10 grid min-h-[calc(100vh-5rem)] content-center gap-10 lg:grid-cols-2 lg:items-center";
});

const heroContentClass = computed(() => {
  if (heroAlignClass.value === "center") return "text-center";
  if (heroAlignClass.value === "right") return "text-right";
  return "text-left";
});

const heroButtonsJustifyClass = computed(() => {
  if (heroAlignClass.value === "center") return "justify-center";
  if (heroAlignClass.value === "right") return "justify-end";
  return "justify-start";
});

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
    const bg = props.heroConfig?.backgroundColor || "var(--color-ink)";
    return {
      backgroundColor: bg,
      backgroundImage: "radial-gradient(circle at top, rgba(255, 255, 255, 0.12), transparent 58%)"
    };
  }
  if (mode === "image" && props.heroConfig?.backgroundImageUrl) {
    // Keep the same cinematic mood as the default flow while allowing custom images.
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(11, 16, 28, 0.62), rgba(11, 16, 28, 0.45)), url('${props.heroConfig.backgroundImageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
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
