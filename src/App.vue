<template>
  <div class="min-h-screen bg-surface text-text page-texture">
    <RouterView />
    <FloatingWhatsapp v-if="!isAdminRoute" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import FloatingWhatsapp from "./components/FloatingWhatsapp.vue";

const route = useRoute();
const isAdminRoute = computed(() => String(route.path || "").startsWith("/admin"));
</script>
