<template>
  <section :id="anchorId ?? 'ubicaciones'" class="section locations-section" :class="rootClass" :style="bg.style">
    <div class="container-safe">
      <p class="section-title text-left">UBICACIONES</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">{{ heading }}</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <div v-if="showCeremony" class="card">
          <h3 class="font-heading text-xl">{{ tenant.ceremony.name || "Ceremonia" }}</h3>
          <p v-if="tenant.ceremony.time" class="mt-2 text-black/70">{{ tenant.ceremony.time }}</p>
          <p v-if="tenant.ceremony.address" class="text-black/70">{{ tenant.ceremony.address }}</p>
          <template v-if="tenant.ceremony.mapUrl">
            <iframe
              v-if="mapMode === 'iframe'"
              class="mt-4 h-56 w-full rounded-2xl border border-black/10"
              :src="tenant.ceremony.mapUrl"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <a v-else class="btn-outline mt-4 inline-flex" :href="tenant.ceremony.mapUrl" target="_blank" rel="noreferrer">Ver mapa</a>
          </template>
        </div>

        <div v-if="showReception" class="card">
          <h3 class="font-heading text-xl">{{ tenant.reception.name || "Recepción" }}</h3>
          <p v-if="tenant.reception.time" class="mt-2 text-black/70">{{ tenant.reception.time }}</p>
          <p v-if="tenant.reception.address" class="text-black/70">{{ tenant.reception.address }}</p>
          <template v-if="tenant.reception.mapUrl">
            <iframe
              v-if="mapMode === 'iframe'"
              class="mt-4 h-56 w-full rounded-2xl border border-black/10"
              :src="tenant.reception.mapUrl"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <a v-else class="btn-outline mt-4 inline-flex" :href="tenant.reception.mapUrl" target="_blank" rel="noreferrer">Ver mapa</a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { LocationsMapMode, SectionBackgroundConfig, TenantConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

const props = defineProps<{ tenant: TenantConfig; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => (props.background?.mode && props.background.mode !== "default" ? bg.value.className : "bg-white/60"));

const mapMode = computed<LocationsMapMode>(() => props.tenant.page?.locations?.mapMode || "button");

const showCeremony = computed(() => {
  const cfg = props.tenant.page?.locations?.showCeremony;
  if (cfg === false) return false;
  return Boolean(props.tenant.ceremony?.name || props.tenant.ceremony?.address || props.tenant.ceremony?.time || props.tenant.ceremony?.mapUrl);
});

const showReception = computed(() => {
  const cfg = props.tenant.page?.locations?.showReception;
  if (cfg === false) return false;
  return Boolean(props.tenant.reception?.name || props.tenant.reception?.address || props.tenant.reception?.time || props.tenant.reception?.mapUrl);
});

const heading = computed(() => {
  if (showCeremony.value && showReception.value) return "Ceremonia y recepción";
  if (showCeremony.value) return "Ceremonia";
  if (showReception.value) return "Recepción";
  return "Ubicación";
});
</script>
