<template>
  <div class="space-y-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Galeria</p>
          <h1 class="mt-2 text-xl font-semibold text-slate-900">Agregar fotos</h1>
          <p class="mt-2 text-sm text-slate-600">
            Trae imagenes de bodas desde Unsplash y guardalas para usarlas como fondos en componentes.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 disabled:opacity-60"
            type="button"
            :disabled="loading || !unsplashAccessKey"
            @click="loadGallery"
          >
            Recargar
          </button>
          <button
            class="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white disabled:opacity-60"
            type="button"
            :disabled="loading || !canWriteToProject || !unsplashAccessKey"
            @click="addPhotos"
          >
            {{ loading ? "Agregando..." : "Agregar fotos" }}
          </button>
        </div>
      </div>

      <div class="mt-4 space-y-2 text-sm text-slate-600">
        <p v-if="!unsplashAccessKey" class="text-amber-600">Falta configurar `VITE_UNSPLASH_ACCESS_KEY` para usar la API de Unsplash.</p>
        <p v-else>Se agregaran 5 fotos nuevas por cada clic.</p>
        <p>El boton recargar vuelve a leer el archivo local y actualiza la lista.</p>
        <p v-if="!canWriteToProject" class="text-slate-400">Guardado no disponible en este entorno. Ejecuta `npm run dev`.</p>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Fotos guardadas</p>
        <p class="text-sm text-slate-500">{{ photos.length }} imagen(es)</p>
      </div>

      <div v-if="error" class="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ error }}
      </div>

      <div v-if="!photos.length && !loading && !error" class="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
        Aun no hay fotos guardadas.
      </div>

      <div v-if="photos.length" class="mt-6 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3 text-sm text-slate-600">
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" class="h-4 w-4 rounded border-slate-300" :checked="allSelected" @change="toggleSelectAll" />
              <span>Seleccionar todo</span>
            </label>
            <span>{{ selectedUrls.length }} seleccionada(s)</span>
          </div>
          <button
            class="h-9 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 disabled:opacity-60"
            type="button"
            :disabled="loading || !canWriteToProject || selectedUrls.length === 0"
            @click="removeSelected"
          >
            Borrar seleccionadas
          </button>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <figure v-for="(photo, index) in photos" :key="`${photo.src}-${index}`" class="overflow-hidden rounded-2xl border border-slate-200">
            <div class="aspect-[4/3] bg-slate-100">
              <img class="h-full w-full object-cover" :src="photo.src" loading="lazy" :alt="photo.alt || `Foto ${index + 1}`" />
            </div>
            <figcaption class="space-y-2 border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
              <label class="inline-flex items-center gap-2">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300" :checked="selectedUrls.includes(photo.src)" @change="toggleSelected(photo.src)" />
                <span>Seleccionar</span>
              </label>
              <div class="truncate">{{ photo.src }}</div>
              <p v-if="photo.authorName" class="truncate">Autor: {{ photo.authorName }}</p>
              <a v-if="photo.sourceUrl" class="font-semibold text-slate-700 underline" :href="photo.sourceUrl" target="_blank" rel="noreferrer">Ver fuente</a>
              <button
                class="text-xs font-semibold text-red-600 hover:text-red-700"
                type="button"
                :disabled="loading || !canWriteToProject"
                @click="removeOne(photo.src)"
              >
                Borrar foto
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type GalleryPhoto = {
  src: string;
  alt?: string;
  authorName?: string;
  authorUrl?: string;
  sourceUrl?: string;
};

type GalleryResponse = { ok: boolean; photos?: unknown; error?: string };

const photos = ref<GalleryPhoto[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const canWriteToProject = ref(false);
const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined;
const selectedUrls = ref<string[]>([]);

const allSelected = computed(() => photos.value.length > 0 && selectedUrls.value.length === photos.value.length);

function normalizePhoto(item: unknown): GalleryPhoto | null {
  if (typeof item === "string") {
    const src = item.trim();
    return src ? { src } : null;
  }
  if (!item || typeof item !== "object") return null;
  const obj = item as Record<string, unknown>;
  const src = String(obj.src ?? obj.url ?? "").trim();
  if (!src) return null;

  return {
    src,
    alt: String(obj.alt ?? "").trim() || undefined,
    authorName: String(obj.authorName ?? "").trim() || undefined,
    authorUrl: String(obj.authorUrl ?? "").trim() || undefined,
    sourceUrl: String(obj.sourceUrl ?? "").trim() || undefined
  };
}

async function checkWriter() {
  try {
    const res = await fetch("/__admin/gallery/ping");
    const data = (await res.json()) as { ok?: boolean };
    canWriteToProject.value = Boolean(data?.ok);
  } catch {
    canWriteToProject.value = false;
  }
}

async function loadGallery() {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch("/__admin/gallery/list");
    const data = (await res.json()) as GalleryResponse;
    if (!data.ok) throw new Error(data.error || "No se pudo cargar la galeria.");
    const rawPhotos = Array.isArray(data.photos) ? data.photos : [];
    photos.value = rawPhotos.map(normalizePhoto).filter((item): item is GalleryPhoto => Boolean(item));
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Error al cargar la galeria.";
  } finally {
    loading.value = false;
  }
}

async function fetchUnsplashPhoto(): Promise<GalleryPhoto | null> {
  if (!unsplashAccessKey) return null;
  const url = new URL("https://api.unsplash.com/photos/random");
  url.searchParams.set("query", "wedding,bride,groom,couple,ceremony");
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");
  url.searchParams.set("client_id", unsplashAccessKey);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Unsplash no respondio correctamente.");

  const data = (await res.json()) as {
    urls?: { regular?: string };
    alt_description?: string | null;
    user?: { name?: string; links?: { html?: string } };
    links?: { html?: string };
  };
  const src = String(data?.urls?.regular || "").trim();
  if (!src) return null;

  return {
    src,
    alt: String(data?.alt_description || "").trim() || "Foto de boda",
    authorName: String(data?.user?.name || "").trim() || undefined,
    authorUrl: String(data?.user?.links?.html || "").trim() || undefined,
    sourceUrl: String(data?.links?.html || "").trim() || undefined
  };
}

async function addPhotos() {
  if (!unsplashAccessKey || !canWriteToProject.value) return;
  loading.value = true;
  error.value = null;
  try {
    const requests = Array.from({ length: 5 }, () => fetchUnsplashPhoto());
    const results = await Promise.all(requests);
    const nextPhotos = results.filter((item): item is GalleryPhoto => Boolean(item));
    if (!nextPhotos.length) throw new Error("No se pudieron obtener fotos.");

    const res = await fetch("/__admin/gallery/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ photos: nextPhotos })
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!data.ok) throw new Error(data.error || "No se pudo guardar la galeria.");
    await loadGallery();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Error al guardar la galeria.";
  } finally {
    loading.value = false;
  }
}

function toggleSelected(url: string) {
  if (selectedUrls.value.includes(url)) {
    selectedUrls.value = selectedUrls.value.filter((item) => item !== url);
  } else {
    selectedUrls.value = [...selectedUrls.value, url];
  }
}

function toggleSelectAll() {
  if (allSelected.value) {
    selectedUrls.value = [];
  } else {
    selectedUrls.value = photos.value.map((item) => item.src);
  }
}

async function removeOne(url: string) {
  await removeUrls([url]);
}

async function removeSelected() {
  await removeUrls(selectedUrls.value);
}

async function removeUrls(urls: string[]) {
  if (!urls.length || !canWriteToProject.value) return;
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch("/__admin/gallery/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ urls })
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!data.ok) throw new Error(data.error || "No se pudo borrar la galeria.");
    selectedUrls.value = selectedUrls.value.filter((item) => !urls.includes(item));
    await loadGallery();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Error al borrar la galeria.";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await checkWriter();
  await loadGallery();
});
</script>
