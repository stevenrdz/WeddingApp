<template>
  <section id="ubicaciones" class="section locations-section bg-white/60">
    <div class="container-safe">
      <p class="section-title text-left">UBICACIONES</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">Ceremonia y recepcion</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <div class="card">
          <h3 class="font-heading text-xl">{{ tenant.ceremony.name }}</h3>
          <p class="mt-2 text-black/70">{{ tenant.ceremony.time }}</p>
          <p class="text-black/70">{{ tenant.ceremony.address }}</p>
          <a class="btn-outline mt-4" :href="tenant.ceremony.mapUrl" target="_blank" rel="noreferrer">Ver mapa</a>
        </div>
        <div class="card">
          <h3 class="font-heading text-xl">{{ tenant.reception.name }}</h3>
          <p class="mt-2 text-black/70">{{ tenant.reception.time }}</p>
          <p class="text-black/70">{{ tenant.reception.address }}</p>
          <a class="btn-outline mt-4" :href="tenant.reception.mapUrl" target="_blank" rel="noreferrer">Ver mapa</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TenantConfig } from "../types/tenant";

defineProps<{ tenant: TenantConfig }>();
</script>
