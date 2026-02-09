<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold">Galería</h1>
        <p class="mt-1 text-sm text-slate-600">Las fotos se actualizan automáticamente.</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <a class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" :href="uploadUrl" target="_blank" rel="noreferrer">
          Abrir link de subida
        </a>
        <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="refresh">
          Recargar
        </button>
      </div>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-if="!items.length" class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 sm:col-span-2 lg:col-span-3">
        Aún no hay fotos. Comparte el QR para que tus invitados empiecen a subirlas.
      </div>

      <div v-for="item in items" :key="item.id" class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <img class="h-56 w-full object-cover" :src="item.dataUrl" :alt="`Foto ${item.id}`" loading="lazy" />
        <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/35 px-3 py-2 text-xs text-white backdrop-blur">
          <span>{{ formatDate(item.createdAt) }}</span>
          <button class="rounded-lg bg-white/15 px-2 py-1 text-xs font-semibold text-white hover:bg-white/25" type="button" @click="remove(item.id)">
            Ocultar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { listPremiumPhotos, removePremiumPhoto, subscribePremiumGallery, type PremiumPhoto } from "../../utils/premiumGallery";

const route = useRoute();
const slug = computed(() => String(route.params.slug || "boda"));
const uploadUrl = computed(() => `${window.location.origin}/p/${slug.value}/upload`);
const items = ref<PremiumPhoto[]>([]);
let stopSub: (() => void) | null = null;
let pollTimer: number | undefined;

function refresh() {
  items.value = listPremiumPhotos(slug.value);
}

function remove(id: string) {
  const ok = window.confirm("¿Ocultar esta foto de la galería?");
  if (!ok) return;
  removePremiumPhoto(slug.value, id);
  refresh();
}

function formatDate(value: string) {
  const d = new Date(value);
  return d.toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
}

onMounted(() => {
  refresh();
  stopSub = subscribePremiumGallery(slug.value, refresh);
  pollTimer = window.setInterval(refresh, 4000);
});

onUnmounted(() => {
  stopSub?.();
  if (pollTimer) window.clearInterval(pollTimer);
});
</script>

