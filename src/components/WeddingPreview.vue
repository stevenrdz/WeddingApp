<template>
  <main class="min-h-screen" :data-tenant="slug">
    <Navbar :couple-names="tenant.coupleNames" />
    <HeroSection :tenant="tenant" variant="default" />
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
import type { TenantConfig } from "../types/tenant";

defineProps<{
  tenant: TenantConfig;
  slug: string;
  sectionFlags: {
    countdown: boolean;
    story: boolean;
    locations: boolean;
    timeline: boolean;
    dressCode: boolean;
    gifts: boolean;
    rsvp: boolean;
    gallery: boolean;
    faq: boolean;
  };
}>();
</script>