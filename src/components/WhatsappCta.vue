<template>
  <div class="card">
    <p class="text-black/70">Confirmanos por WhatsApp para coordinar detalles.</p>
    <a class="btn-outline mt-4 text-sm" :href="waUrl" target="_blank" rel="noreferrer">Escribenos por WhatsApp</a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ number: string }>();
const waUrl = computed(() => `https://wa.me/${props.number}`);
</script>
