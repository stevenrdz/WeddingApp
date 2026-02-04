<template>
  <main class="section container-safe">
    <h1 class="font-heading text-4xl">404</h1>
    <p class="mt-4 text-black/70">No encontramos la pagina que buscas.</p>
    <RouterLink class="btn-primary mt-6 inline-flex" to="/">Volver al inicio</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>