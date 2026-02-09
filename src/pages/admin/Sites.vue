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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import manifest from "../../tenants/tenants.manifest.json";
import { LocalJsonAdapter } from "../../tenants/LocalJsonAdapter";
import type { TenantConfig } from "../../types/tenant";

type SiteRow = { slug: string; coupleNames: string; dateISO: string };

const router = useRouter();
const adapter = new LocalJsonAdapter();
const loading = ref(false);
const rows = ref<SiteRow[]>([]);
const query = ref("");

async function load() {
  loading.value = true;
  const slugs = Array.isArray(manifest) ? manifest : [];
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

load();
</script>

