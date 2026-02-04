<template>
  <main class="min-h-screen" :data-tenant="slug">
    <div v-if="loading" class="section container-safe">Cargando...</div>
    <div v-else-if="!tenant" class="section container-safe">
      <h1 class="font-heading text-3xl">Boda no encontrada</h1>
      <RouterLink class="btn-primary mt-6 inline-flex" to="/">Volver al inicio</RouterLink>
    </div>
    <div v-else>
      <Navbar :couple-names="tenant.coupleNames" />
      <HeroSection :tenant="tenant" :variant="slug === 'sofia-mateo' ? 'enchanted' : 'default'" />
      <CountdownSection v-if="sectionFlags.countdown" :date-iso="tenant.dateISO" />
      <StorySection v-if="sectionFlags.story && tenant.story" :story="tenant.story" />
      <LocationsSection v-if="sectionFlags.locations" :tenant="tenant" />
      <TimelineSection v-if="sectionFlags.timeline" :schedule="tenant.schedule" />
      <DressCodeSection v-if="sectionFlags.dressCode" :dress-code="tenant.dressCode" />
      <GiftsSection v-if="sectionFlags.gifts" :gifts="tenant.gifts" />
      <FaqSection v-if="sectionFlags.faq && tenant.faq?.length" :items="tenant.faq" />
      <RsvpSection v-if="sectionFlags.rsvp" :tenant="tenant" :slug="slug" />
      <GallerySection v-if="sectionFlags.gallery" :gallery="tenant.gallery" />
      <FooterSection :contact-email="tenant.contactEmail" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { LocalJsonAdapter } from "../tenants/LocalJsonAdapter";
import type { TenantConfig } from "../types/tenant";
import { applyTheme } from "../utils/applyTheme";
import { applySeo } from "../utils/seo";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
import CountdownSection from "../components/CountdownSection.vue";
import StorySection from "../components/StorySection.vue";
import LocationsSection from "../components/LocationsSection.vue";
import TimelineSection from "../components/TimelineSection.vue";
import DressCodeSection from "../components/DressCodeSection.vue";
import GiftsSection from "../components/GiftsSection.vue";
import FaqSection from "../components/FaqSection.vue";
import RsvpSection from "../components/RsvpSection.vue";
import GallerySection from "../components/GallerySection.vue";
import FooterSection from "../components/FooterSection.vue";

const route = useRoute();
const adapter = new LocalJsonAdapter();
const tenant = ref<TenantConfig | null>(null);
const loading = ref(true);
const slug = ref(String(route.params.slug || ""));
const planBySlug = {
  "sofia-mateo": "basic",
  "lucia-diego": "standard",
  "steven-jenniffer": "premium"
} as const;
type Plan = (typeof planBySlug)[keyof typeof planBySlug];
const plan = computed<Plan>(() => planBySlug[slug.value as keyof typeof planBySlug] ?? "standard");
const sectionFlags = computed(() => {
  const current = plan.value;
  return {
    countdown: current !== "basic",
    story: true,
    locations: true,
    timeline: current !== "basic",
    dressCode: current !== "basic",
    gifts: current !== "basic",
    rsvp: true,
    gallery: true,
    faq: current === "premium"
  };
});

async function loadTenant(currentSlug: string) {
  loading.value = true;
  const data = await adapter.getTenant(currentSlug);
  tenant.value = data;
  if (data) {
    applyTheme(data.theme);
    applySeo(data.seo);
  }
  loading.value = false;
}

watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = String(newSlug || "");
    loadTenant(slug.value);
  },
  { immediate: true }
);
</script>
