<template>
  <section :id="anchorId ?? 'rsvp'" class="section rsvp-section" :class="rootClass" :style="bg.style">
    <div class="container-safe">
      <p class="section-title text-left">RSVP</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">Confirma tu asistencia</h2>
      <div class="mt-6">
        <WhatsappCta v-if="!tenant.rsvp.enabled" :number="tenant.rsvp.whatsappNumber" />
        <template v-else>
          <WhatsappCta v-if="tenant.rsvp.mode === 'whatsapp'" :number="tenant.rsvp.whatsappNumber" />
          <NetlifyRsvpForm
            v-else
            :form-name="tenant.rsvp.netlifyFormNameOptional || `rsvp-${slug}`"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TenantConfig } from "../types/tenant";
import WhatsappCta from "./WhatsappCta.vue";
import NetlifyRsvpForm from "./NetlifyRsvpForm.vue";
import type { SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

const props = defineProps<{ tenant: TenantConfig; slug: string; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => (props.background?.mode && props.background.mode !== "default" ? bg.value.className : "bg-white/60"));
</script>
