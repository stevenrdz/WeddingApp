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
}

function remove(draftId: string) {
  const ok = window.confirm("¿Eliminar este borrador? Esta acción no se puede deshacer.");
  if (!ok) return;
  const next = readDrafts().filter((d) => d.id !== draftId);
  writeDrafts(next);
  load();
}

load();
</script>

