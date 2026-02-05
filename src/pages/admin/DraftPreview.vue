<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="border-b border-slate-200 bg-white px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-lg font-semibold">Borrador</h1>
          <p class="text-sm text-slate-500">Vista previa compartible (solo con clave).</p>
        </div>
        <RouterLink class="rounded-lg border border-slate-200 px-3 py-1 text-xs" to="/admin/generate">
          Ir al builder
        </RouterLink>
      </div>
    </div>

    <div class="p-6">
      <div v-if="!draft" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No se encontro el borrador.
      </div>
      <div v-else ref="previewRef" class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <WeddingPreview :tenant="draft" :slug="slug" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import WeddingPreview from "../../components/WeddingPreview.vue";
import type { TenantConfig } from "../../types/tenant";

const route = useRoute();
const previewRef = ref<HTMLElement | null>(null);
const draft = ref<TenantConfig | null>(null);
const slug = computed(() => String(route.params.draftId || "borrador"));

function applyThemeToElement(el: HTMLElement | null, theme: TenantConfig["theme"]) {
  if (!el) return;
  el.style.setProperty("--color-primary", theme.primary);
  el.style.setProperty("--color-secondary", theme.secondary);
  el.style.setProperty("--color-accent", theme.primary);
  el.style.setProperty("--color-surface", theme.background);
  el.style.setProperty("--color-text", theme.text);
  el.style.setProperty("--font-heading", theme.fontHeading);
  if (theme.fontSubheading) {
    el.style.setProperty("--font-subheading", theme.fontSubheading);
  }
  el.style.setProperty("--font-body", theme.fontBody);
}

function decodeDraft(raw: string): { data: TenantConfig } | null {
  try {
    const json = decodeURIComponent(escape(atob(raw)));
    return JSON.parse(json) as { data: TenantConfig };
  } catch {
    return null;
  }
}

onMounted(() => {
  const draftId = String(route.params.draftId || "");
  const shared = typeof route.query.data === "string" ? route.query.data : "";
  if (shared) {
    const decoded = decodeDraft(shared);
    if (decoded?.data) {
      draft.value = decoded.data;
      applyThemeToElement(previewRef.value, decoded.data.theme);
    }
    return;
  }

  const raw = localStorage.getItem("weddingapp_drafts");
  if (!draftId || !raw) return;
  try {
    const list = JSON.parse(raw) as Array<{ id: string; data: TenantConfig }>;
    const found = list.find((item) => item.id === draftId);
    if (found) {
      draft.value = found.data;
      applyThemeToElement(previewRef.value, found.data.theme);
    }
  } catch {
    // ignore corrupted storage
  }
});
</script>
