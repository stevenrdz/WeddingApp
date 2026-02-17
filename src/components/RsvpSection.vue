<template>
  <section :id="anchorId ?? 'rsvp'" class="section rsvp-section" :class="rootClass" :style="bg.style">
    <div class="container-safe">
      <SectionHeader
        title="RSVP"
        :heading="header?.headingText ?? 'Confirma tu asistencia'"
        :align="header?.align ?? 'left'"
        :ornament="header?.ornament"
        :title-style="header?.titleStyle"
        :heading-style="header?.headingStyle"
        :tagline-style="header?.taglineStyle"
      />
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
import type { PageSection, TenantConfig } from "../types/tenant";
import WhatsappCta from "./WhatsappCta.vue";
import NetlifyRsvpForm from "./NetlifyRsvpForm.vue";
import type { SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";
import SectionHeader from "./SectionHeader.vue";

const props = defineProps<{ tenant: TenantConfig; slug: string; anchorId?: string; background?: SectionBackgroundConfig; header?: PageSection["header"] }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => (props.background?.mode && props.background.mode !== "default" ? bg.value.className : "bg-white/60"));
</script>
