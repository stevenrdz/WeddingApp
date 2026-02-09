<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="px-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Premium</p>
          <p class="mt-2 truncate font-heading text-xl">{{ slug }}</p>
          <a class="mt-3 inline-flex text-sm text-slate-600 underline" :href="`/w/${slug}`" target="_blank" rel="noreferrer">
            Ver sitio
          </a>
        </div>

        <nav class="mt-6 space-y-1">
          <RouterLink
            class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition"
            :class="route.name === 'premium-qr' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'"
            :to="{ name: 'premium-qr', params: { slug } }"
          >
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">QR</span>
            Generar QR
          </RouterLink>
          <RouterLink
            class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition"
            :class="route.name === 'premium-gallery' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'"
            :to="{ name: 'premium-gallery', params: { slug } }"
          >
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">G</span>
            Galería
          </RouterLink>
        </nav>

        <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
          Este panel es un prototipo. En producción puede conectarse a un almacenamiento externo (por ejemplo Google Drive del cliente).
        </div>
      </aside>

      <main class="min-w-0">
        <div v-if="!isAllowed" class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 class="text-xl font-semibold">Acceso Premium</h1>
          <p class="mt-2 text-sm text-slate-600">
            Para esta demo, ingresa cualquier código para abrir el panel. (Luego lo conectamos a inicio con Google).
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label class="block w-full text-sm font-medium text-slate-700">
              Código
              <input v-model="code" class="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Código premium" type="password" />
            </label>
            <button class="h-11 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white" type="button" @click="unlock">
              Entrar
            </button>
          </div>
        </div>

        <RouterView v-else />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const slug = computed(() => String(route.params.slug || "boda"));
const code = ref("");

const isAllowed = computed(() => {
  const isAdmin = localStorage.getItem("weddingapp_admin") === "1";
  const key = `provenza:premium_access:${slug.value}`;
  return isAdmin || localStorage.getItem(key) === "1";
});

function unlock() {
  if (!code.value.trim()) return;
  localStorage.setItem(`provenza:premium_access:${slug.value}`, "1");
  code.value = "";
}
</script>

