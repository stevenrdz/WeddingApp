<template>
  <main class="min-h-screen bg-slate-100 text-slate-900">
    <div class="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-10">
      <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div v-if="driveConfig" class="space-y-4">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Invitados</p>
          <h1 class="mt-2 font-heading text-3xl">Sube tu foto</h1>
          <p class="mt-3 text-sm text-slate-600">
            Para evitar costos, la subida se hace en una pÃ¡gina externa (Google Apps Script) y la galerÃ­a se muestra desde una carpeta pÃºblica de Google Drive.
          </p>

          <a
            class="block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
            :href="externalUploadUrl"
            target="_blank"
            rel="noreferrer"
          >
            Abrir pÃ¡gina de subida
          </a>

          <p class="text-xs text-slate-500">
            Si ya subiste una foto, puedes cerrar esa pestaÃ±a y regresar. La galerÃ­a se actualiza sola.
          </p>
        </div>

        <template v-else>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Invitados</p>
          <h1 class="mt-2 font-heading text-3xl">Sube tu foto</h1>
          <p class="mt-3 text-sm text-slate-600">
            Gracias por acompaÃ±arnos. Toma una foto o selecciona una desde tu galerÃ­a y sÃºbela para que aparezca en la galerÃ­a del evento.
          </p>

          <div class="mt-6 space-y-3">
            <input
              ref="fileInput"
              class="hidden"
              type="file"
              accept="image/*"
              capture="environment"
              @change="onPick"
            />

            <button class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white" type="button" @click="pick">
              Abrir cÃ¡mara / galerÃ­a
            </button>

            <div v-if="previewUrl" class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img class="h-64 w-full object-cover" :src="previewUrl" alt="PrevisualizaciÃ³n" />
            </div>

            <button
              class="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              type="button"
              :disabled="!selectedFile || isUploading"
              @click="upload"
            >
              {{ isUploading ? "Subiendo..." : "Subir foto" }}
            </button>

            <p v-if="status" class="text-sm" :class="statusKind === 'ok' ? 'text-emerald-700' : 'text-red-700'">
              {{ status }}
            </p>
          </div>

          <div class="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            Nota: en esta demo las fotos se guardan localmente en tu navegador. Para producciÃ³n lo conectamos a un almacenamiento externo.
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { addPremiumPhoto, fileToJpegDataUrl } from "../../utils/premiumGallery";
import { buildPremiumUploadUrl, getPremiumDriveConfig } from "../../utils/premiumDriveLinks";

const route = useRoute();
const slug = computed(() => String(route.params.slug || "boda"));

const driveConfig = computed(() => getPremiumDriveConfig());
const externalUploadUrl = computed(() => {
  const cfg = driveConfig.value;
  if (!cfg) return "";
  return buildPremiumUploadUrl(cfg, slug.value);
});

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string>("");
const isUploading = ref(false);
const status = ref("");
const statusKind = ref<"ok" | "err">("ok");

function pick() {
  fileInput.value?.click();
}

function onPick(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  selectedFile.value = file;
  status.value = "";
  if (!file) return;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(file);
}

async function upload() {
  if (!selectedFile.value) return;
  status.value = "";
  statusKind.value = "ok";
  isUploading.value = true;
  try {
    const dataUrl = await fileToJpegDataUrl(selectedFile.value);
    if (!dataUrl) throw new Error("No se pudo procesar la foto.");
    addPremiumPhoto(slug.value, { id: `p_${Date.now()}`, createdAt: new Date().toISOString(), dataUrl });
    status.value = "Â¡Listo! Tu foto ya aparece en la galerÃ­a.";
    selectedFile.value = null;
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = "";
    if (fileInput.value) fileInput.value.value = "";
  } catch {
    statusKind.value = "err";
    status.value = "No se pudo subir la foto. Intenta nuevamente.";
  } finally {
    isUploading.value = false;
  }
}

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});
</script>

