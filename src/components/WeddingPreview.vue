<template>
  <main class="min-h-screen" :data-tenant="slug">
    <Navbar v-if="!hasPageConfig || navbarConfig" :couple-names="tenant.coupleNames" :config="navbarConfig || undefined" />
    <HeroSection
      v-if="!hasPageConfig || heroConfig"
      :tenant="tenant"
      :hero-config="heroConfig || undefined"
      variant="default"
    />
    <template v-for="section in orderedSections" :key="`${section.type}-${section.anchorId}`">
      <CountdownSection v-if="section.type === 'countdown'" :date-iso="tenant.dateISO" :anchor-id="section.anchorId" :background="section.background" />
      <StorySection v-else-if="section.type === 'story' && tenant.story" :story="tenant.story" :anchor-id="section.anchorId" :background="section.background" />
      <LocationsSection v-else-if="section.type === 'locations'" :tenant="tenant" :anchor-id="section.anchorId" :background="section.background" />
      <TimelineSection v-else-if="section.type === 'timeline'" :schedule="tenant.schedule" :anchor-id="section.anchorId" :background="section.background" />
      <DressCodeSection v-else-if="section.type === 'dressCode'" :dress-code="tenant.dressCode" :anchor-id="section.anchorId" :background="section.background" />
      <GiftsSection v-else-if="section.type === 'gifts'" :gifts="tenant.gifts" :anchor-id="section.anchorId" :background="section.background" />
      <RsvpSection v-else-if="section.type === 'rsvp'" :tenant="tenant" :slug="slug" :anchor-id="section.anchorId" :background="section.background" />
      <GallerySection v-else-if="section.type === 'gallery'" :gallery="tenant.gallery" :anchor-id="section.anchorId" :background="section.background" />
      <FaqSection v-else-if="section.type === 'faq' && tenant.faq?.length" :items="tenant.faq" :anchor-id="section.anchorId" :background="section.background" />
    </template>
    <FooterSection
      v-if="!hasPageConfig || footerConfig"
      :contact-email="tenant.contactEmail"
      :message="footerConfig?.message"
      :anchor-id="footerConfig?.anchorId"
    />
  </main>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
import HeroSection from "./HeroSection.vue";
import CountdownSection from "./CountdownSection.vue";
import StorySection from "./StorySection.vue";
import LocationsSection from "./LocationsSection.vue";
import TimelineSection from "./TimelineSection.vue";
import DressCodeSection from "./DressCodeSection.vue";
import GiftsSection from "./GiftsSection.vue";
import FaqSection from "./FaqSection.vue";
import RsvpSection from "./RsvpSection.vue";
import GallerySection from "./GallerySection.vue";
import FooterSection from "./FooterSection.vue";
import type { PageSection, TenantConfig } from "../types/tenant";
import { computed } from "vue";
import { defaultSections } from "../utils/sectionCatalog";

const props = defineProps<{
  tenant: TenantConfig;
  slug: string;
}>();

const hasPageConfig = computed(() => Boolean(props.tenant.page));
const navbarConfig = computed(() => props.tenant.page?.navbar);
const heroConfig = computed(() => props.tenant.page?.hero);
const footerConfig = computed(() => props.tenant.page?.footer);

const orderedSections = computed<PageSection[]>(() => {
  if (props.tenant.page?.sections?.length) return props.tenant.page.sections;
  if (!props.tenant.page) return defaultSections();
  return [];
});
</script>
