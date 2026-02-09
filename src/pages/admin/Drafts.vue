<template>
  <div class="p-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">Borradores</h1>
        <p class="mt-1 text-sm text-slate-500">Crea, duplica y edita borradores guardados en este navegador.</p>
      </div>
      <RouterLink class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" to="/admin/generate">
        Nuevo borrador
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
      <button
        class="h-10 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 disabled:opacity-60"
        type="button"
        :disabled="!items.length"
        @click="removeAll"
      >
        Eliminar todos
      </button>
      <p class="text-sm text-slate-500">{{ filtered.length }} borrador(es)</p>
    </div>

    <div class="mt-6 grid gap-4">
      <div v-if="!filtered.length" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No hay borradores guardados todavía.
      </div>

      <div v-for="item in filtered" :key="item.id" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Borrador</p>
            <p class="mt-2 truncate text-lg font-semibold text-slate-900">{{ item.data.coupleNames || "Sin nombres" }}</p>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
              <p><span class="text-slate-400">Slug:</span> <span class="font-medium text-slate-800">{{ item.slug || "—" }}</span></p>
              <p><span class="text-slate-400">ID:</span> <span class="font-mono text-xs text-slate-700">{{ item.id }}</span></p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="button" @click="open(item.id)">
              Editar
            </button>
            <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="duplicate(item.id)">
              Duplicar
            </button>
            <button class="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="button" @click="remove(item.id)">
              Eliminar
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
import { computed, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import type { TenantConfig } from "../../types/tenant";

type StoredDraft = { id: string; slug?: string; data: TenantConfig };

const router = useRouter();
const items = ref<StoredDraft[]>([]);
const query = ref("");

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

function readDrafts(): StoredDraft[] {
  const raw = localStorage.getItem("weddingapp_drafts");
  const parsed = raw ? (JSON.parse(raw) as StoredDraft[]) : [];
  return Array.isArray(parsed) ? parsed : [];
}

function writeDrafts(next: StoredDraft[]) {
  localStorage.setItem("weddingapp_drafts", JSON.stringify(next.slice(0, 20)));
}

function load() {
  items.value = readDrafts();
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter((d) => {
    const slug = (d.slug || "").toLowerCase();
    const names = (d.data?.coupleNames || "").toLowerCase();
    return slug.includes(q) || names.includes(q) || d.id.toLowerCase().includes(q);
  });
});

function open(draftId: string) {
  router.push({ name: "admin-generate", query: { draftId } });
}

function duplicate(draftId: string) {
  const current = readDrafts();
  const found = current.find((d) => d.id === draftId);
  if (!found) return;
  const baseSlug = (found.slug || "borrador").trim() || "borrador";
  const nextId = `${baseSlug}-${Date.now()}`;
  current.unshift({ id: nextId, slug: found.slug, data: found.data });
  writeDrafts(current);
  load();
  pushToast("success", "Borrador duplicado.");
}

function remove(draftId: string) {
  const ok = window.confirm("¿Eliminar este borrador? Esta acción no se puede deshacer.");
  if (!ok) return;
  const next = readDrafts().filter((d) => d.id !== draftId);
  writeDrafts(next);
  load();
  pushToast("success", "Borrador eliminado.");
}

function removeAll() {
  const ok = window.confirm("¿Eliminar TODOS los borradores de este navegador? Esta acción no se puede deshacer.");
  if (!ok) return;
  writeDrafts([]);
  load();
  pushToast("success", "Todos los borradores fueron eliminados.");
}

load();
</script>
