<template>
  <div class="card">
    <p class="text-black/70">Confirmanos por WhatsApp para coordinar detalles.</p>
    <a class="btn-primary mt-4" :href="waUrl" target="_blank" rel="noreferrer">Abrir WhatsApp</a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ number: string }>();
const waUrl = computed(() => `https://wa.me/${props.number}`);
</script>