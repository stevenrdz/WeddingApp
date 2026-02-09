<template>
  <div class="p-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">Sitios</h1>
        <p class="mt-1 text-sm text-slate-500">Edita sitios existentes (cargados desde `src/tenants/data`).</p>
      </div>
      <RouterLink class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" to="/w/demo" target="_blank">
        Ver demo
      </RouterLink>
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <input
        v-model="query"
        class="h-10 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 text-sm"
        placeholder="Buscar por slug o nombres..."
        type="search"
      />
      <button class="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm" type="button" @click="load">
        Recargar
      </button>
      <p class="text-sm text-slate-500">{{ filtered.length }} sitio(s)</p>
      <p v-if="!canWriteToProject" class="text-xs text-slate-400">
        Para eliminar sitios debes estar en modo local (`npm run dev`).
      </p>
    </div>

    <div class="mt-6 grid gap-4">
      <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Cargando...</div>

      <div v-for="site in filtered" :key="site.slug" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Tenant</p>
            <p class="mt-2 truncate text-lg font-semibold text-slate-900">{{ site.coupleNames || "—" }}</p>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
              <p><span class="text-slate-400">Slug:</span> <span class="font-medium text-slate-800">{{ site.slug }}</span></p>
              <p v-if="site.dateISO"><span class="text-slate-400">Fecha:</span> <span class="font-medium text-slate-800">{{ site.dateISO }}</span></p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <a class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" :href="`/w/${site.slug}`" target="_blank" rel="noreferrer">
              Ver
            </a>
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="button" @click="edit(site.slug)">
              Editar
            </button>
            <button
              v-if="canWriteToProject && site.slug !== 'demo'"
              class="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60"
              type="button"
              :disabled="deletingSlug === site.slug"
              @click="removeSite(site.slug)"
            >
              {{ deletingSlug === site.slug ? "Eliminando..." : "Eliminar" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-2rem))] space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="rounded-2xl border bg-white px-4 py-3 shadow-lg"
        :class="toast.kind === 'error' ? 'border-red-200' : toast.kind === 'success' ? 'border-emerald-200' : 'border-slate-200'"
        :role="toast.kind === 'error' ? 'alert' : 'status'"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p
              class="text-xs font-semibold uppercase tracking-widest"
              :class="toast.kind === 'error' ? 'text-red-700' : toast.kind === 'success' ? 'text-emerald-700' : 'text-slate-600'"
            >
              {{ toast.kind === "error" ? "Error" : toast.kind === "success" ? "Listo" : "Info" }}
            </p>
            <p class="mt-1 break-words text-sm text-slate-900">{{ toast.message }}</p>
          </div>
          <button class="shrink-0 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600" type="button" @click="dismissToast(toast.id)">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { LocalJsonAdapter } from "../../tenants/LocalJsonAdapter";
import type { TenantConfig } from "../../types/tenant";

type SiteRow = { slug: string; coupleNames: string; dateISO: string };

const router = useRouter();
const adapter = new LocalJsonAdapter();
const loading = ref(false);
const rows = ref<SiteRow[]>([]);
const query = ref("");
const canWriteToProject = ref(false);
const deletingSlug = ref("");

type ToastKind = "success" | "error" | "info";
type Toast = { id: number; kind: ToastKind; message: string };
const toasts = ref<Toast[]>([]);
let toastSeq = 0;

function pushToast(kind: ToastKind, message: string) {
  const id = (toastSeq += 1);
  toasts.value.push({ id, kind, message });
  window.setTimeout(() => dismissToast(id), kind === "error" ? 6500 : 3500);
}

function dismissToast(id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
}

async function checkWriter() {
  if (!import.meta.env.DEV) {
    canWriteToProject.value = false;
    return;
  }
  try {
    const res = await fetch("/__admin/tenants/ping");
    const json = (await res.json()) as { ok?: boolean };
    canWriteToProject.value = Boolean(res.ok && json?.ok);
  } catch {
    canWriteToProject.value = false;
  }
}

async function load() {
  loading.value = true;
  const slugs = await adapter.listTenants();
  const list = await Promise.all(
    slugs.map(async (slug) => {
      const tenant = (await adapter.getTenant(slug)) as TenantConfig | null;
      return {
        slug,
        coupleNames: tenant?.coupleNames || "",
        dateISO: tenant?.dateISO || ""
      };
    })
  );
  rows.value = list;
  loading.value = false;
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter((r) => r.slug.toLowerCase().includes(q) || r.coupleNames.toLowerCase().includes(q));
});

function edit(slug: string) {
  router.push({ name: "admin-generate", query: { tenant: slug } });
}

async function removeSite(slug: string) {
  if (!canWriteToProject.value) {
    pushToast("error", "No se puede eliminar en este modo.");
    return;
  }
  if (slug === "demo") {
    pushToast("error", "No se puede eliminar el sitio demo.");
    return;
  }
  const ok = window.confirm(`¿Eliminar el sitio "${slug}"? Esto borrará el archivo en src/tenants/data y actualizará el manifest.`);
  if (!ok) return;
  try {
    deletingSlug.value = slug;
    const res = await fetch("/__admin/tenants/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug })
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json?.ok) {
      pushToast("error", json?.error || "No se pudo eliminar.");
      return;
    }
    pushToast("success", `Sitio eliminado: ${slug}`);
    await load();
  } catch {
    pushToast("error", "Error al eliminar el sitio.");
  } finally {
    deletingSlug.value = "";
  }
}

onMounted(async () => {
  await checkWriter();
  await load();
});
</script>
