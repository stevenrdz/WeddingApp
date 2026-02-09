<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold">Generar QR</h1>
        <p class="mt-1 text-sm text-slate-600">
          Comparte este QR con tus invitados para que suban sus fotos.
        </p>
      </div>
      <a class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" :href="uploadUrl" target="_blank" rel="noreferrer">
        Abrir link
      </a>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div class="aspect-square w-full overflow-hidden rounded-xl bg-white">
          <img v-if="qrDataUrl" class="h-full w-full object-contain" :src="qrDataUrl" alt="QR para subir fotos" />
          <div v-else class="flex h-full w-full items-center justify-center text-xs text-slate-500">Generando QR...</div>
        </div>
        <button
          class="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          type="button"
          :disabled="!qrDataUrl"
          @click="downloadPng"
        >
          Descargar PNG
        </button>
      </div>

      <div class="rounded-2xl border border-slate-200 p-5">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Link</p>
        <p class="mt-2 break-all font-mono text-sm text-slate-800">{{ uploadUrl }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="copy">
            {{ copyLabel }}
          </button>
          <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="openPreview">
            Ver página de subida
          </button>
        </div>

        <div class="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Tip: imprime el QR y colócalo en mesas o en la entrada. Tus invitados podrán subir fotos durante el evento.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import QRCode from "qrcode";

const route = useRoute();
const slug = computed(() => String(route.params.slug || "boda"));
const uploadUrl = computed(() => `${window.location.origin}/p/${slug.value}/upload`);
const qrDataUrl = ref<string>("");
const copyLabel = ref("Copiar link");

async function generate() {
  qrDataUrl.value = await QRCode.toDataURL(uploadUrl.value, { margin: 2, width: 512 });
}

async function copy() {
  try {
    await navigator.clipboard.writeText(uploadUrl.value);
    copyLabel.value = "Copiado";
  } catch {
    copyLabel.value = "Error";
  }
  window.setTimeout(() => (copyLabel.value = "Copiar link"), 1500);
}

function openPreview() {
  window.open(uploadUrl.value, "_blank", "noopener,noreferrer");
}

function downloadPng() {
  if (!qrDataUrl.value) return;
  const link = document.createElement("a");
  link.href = qrDataUrl.value;
  link.download = `qr-${slug.value}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(generate);
watch(uploadUrl, generate);
</script>

