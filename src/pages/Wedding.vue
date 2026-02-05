<template>
  <main class="min-h-screen" :data-tenant="slug">
    <div v-if="loading" class="section container-safe">Cargando...</div>
    <div v-else-if="!tenant" class="section container-safe">
      <h1 class="font-heading text-3xl">Boda no encontrada</h1>
      <RouterLink class="btn-primary mt-6 inline-flex" to="/">Volver al inicio</RouterLink>
    </div>
    <div v-else>
      <Navbar v-if="!hasPageConfig || navbarConfig" :couple-names="tenant.coupleNames" :config="navbarConfig || undefined" />
      <HeroSection
        v-if="!hasPageConfig || heroConfig"
        :tenant="tenant"
        :hero-config="heroConfig || undefined"
        :variant="slug === 'sofia-mateo' ? 'enchanted' : 'default'"
      />
      <template v-for="section in orderedSections" :key="`${section.type}-${section.anchorId}`">
        <CountdownSection v-if="section.type === 'countdown'" :date-iso="tenant.dateISO" :anchor-id="section.anchorId" />
        <StorySection v-else-if="section.type === 'story' && tenant.story" :story="tenant.story" :anchor-id="section.anchorId" />
        <LocationsSection v-else-if="section.type === 'locations'" :tenant="tenant" :anchor-id="section.anchorId" />
        <TimelineSection v-else-if="section.type === 'timeline'" :schedule="tenant.schedule" :anchor-id="section.anchorId" />
        <DressCodeSection v-else-if="section.type === 'dressCode'" :dress-code="tenant.dressCode" :anchor-id="section.anchorId" />
        <GiftsSection v-else-if="section.type === 'gifts'" :gifts="tenant.gifts" :anchor-id="section.anchorId" />
        <RsvpSection v-else-if="section.type === 'rsvp'" :tenant="tenant" :slug="slug" :anchor-id="section.anchorId" />
        <GallerySection v-else-if="section.type === 'gallery'" :gallery="tenant.gallery" :anchor-id="section.anchorId" />
        <FaqSection v-else-if="section.type === 'faq' && tenant.faq?.length" :items="tenant.faq" :anchor-id="section.anchorId" />
      </template>
      <FooterSection
        v-if="!hasPageConfig || footerConfig"
        :contact-email="tenant.contactEmail"
        :message="footerConfig?.message"
        :anchor-id="footerConfig?.anchorId"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { LocalJsonAdapter } from "../tenants/LocalJsonAdapter";
import type { PageSection, TenantConfig } from "../types/tenant";
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
import { defaultSections } from "../utils/sectionCatalog";

const route = useRoute();
const adapter = new LocalJsonAdapter();
const tenant = ref<TenantConfig | null>(null);
const loading = ref(true);
const slug = ref(String(route.params.slug || ""));
const hasPageConfig = computed(() => Boolean(tenant.value?.page));
const navbarConfig = computed(() => tenant.value?.page?.navbar);
const heroConfig = computed(() => tenant.value?.page?.hero);
const footerConfig = computed(() => tenant.value?.page?.footer);
const orderedSections = computed<PageSection[]>(() => {
  if (!tenant.value) return [];
  if (tenant.value.page?.sections?.length) return tenant.value.page.sections;
  if (!tenant.value.page) return defaultSections();
  return [];
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
