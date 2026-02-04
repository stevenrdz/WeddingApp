<template>
  <section id="rsvp" class="section rsvp-section bg-white/60">
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
import type { TenantConfig } from "../types/tenant";
import WhatsappCta from "./WhatsappCta.vue";
import NetlifyRsvpForm from "./NetlifyRsvpForm.vue";

defineProps<{ tenant: TenantConfig; slug: string }>();
</script>
