<template>
  <div class="p-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-500">Resumen de clientes, sitios y fechas próximas.</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button class="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm" type="button" @click="load">
          Recargar
        </button>
        <RouterLink
          v-if="canWriteCustomers"
          class="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white inline-flex items-center"
          to="/admin/clientes/nuevo"
        >
          Nuevo cliente
        </RouterLink>
      </div>
    </div>

    <div v-if="errorMessage" class="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {{ errorMessage }}
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <RouterLink class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50" to="/admin/clientes">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Clientes</p>
        <p class="mt-2 text-3xl font-semibold text-slate-900">{{ stats.customers }}</p>
        <p class="mt-1 text-xs text-slate-500">Registro de clientes (slug, fecha, lugares).</p>
      </RouterLink>
      <RouterLink class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50" to="/admin/sites">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Sitios</p>
        <p class="mt-2 text-3xl font-semibold text-slate-900">{{ stats.sites }}</p>
        <p class="mt-1 text-xs text-slate-500">Cargados desde `src/tenants/data`</p>
      </RouterLink>
      <RouterLink class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50" to="/admin/drafts">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Borradores</p>
        <p class="mt-2 text-3xl font-semibold text-slate-900">{{ stats.drafts }}</p>
        <p class="mt-1 text-xs text-slate-500">Guardados en este navegador</p>
      </RouterLink>
      <RouterLink class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50" to="/admin/sites">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Próximo evento</p>
        <p class="mt-2 text-lg font-semibold text-slate-900">{{ nextEventLabel }}</p>
        <p class="mt-1 text-xs text-slate-500">{{ nextEventHint }}</p>
      </RouterLink>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Clientes por plan</p>
            <p class="mt-1 text-sm text-slate-600">Basic / Standard / Premium</p>
          </div>
          <RouterLink class="text-sm font-semibold text-slate-700 underline" to="/admin/clientes">Ver</RouterLink>
        </div>

        <div class="mt-4">
          <SimpleBarChart :items="planChart" />
          <p v-if="!isDev" class="mt-2 text-xs text-slate-400">En deploy no hay acceso a clientes (solo en local).</p>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Eventos por mes</p>
            <p class="mt-1 text-sm text-slate-600">Próximos 6 meses</p>
          </div>
        </div>

        <div class="mt-4">
          <SimpleBarChart :items="monthChart" />
        </div>
      </div>
    </div>

    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Próximos compromisos</p>
          <p class="mt-1 text-sm text-slate-600">Ordenados por fecha.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <RouterLink class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" to="/admin/sites">
            Sitios
          </RouterLink>
          <RouterLink class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" to="/admin/clientes">
            Clientes
          </RouterLink>
        </div>
      </div>

      <div class="mt-4 grid gap-3">
        <div v-if="loading" class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Cargando...</div>
        <div v-else-if="!upcoming.length" class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          No hay eventos próximos.
        </div>

        <div v-for="row in upcoming" :key="`${row.source}:${row.slug}`" class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ row.source }}</p>
            <p class="mt-1 truncate text-sm font-semibold text-slate-900">{{ row.coupleNames }}</p>
            <p class="mt-1 text-xs text-slate-600">
              <span class="font-mono">{{ row.slug }}</span>
              <span class="mx-2 text-slate-300">•</span>
              {{ row.dateISO }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <a
              v-if="row.hasSite"
              class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              :href="`/w/${row.slug}`"
              target="_blank"
              rel="noreferrer"
            >
              Ver
            </a>
            <RouterLink
              v-if="row.hasSite"
              class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              :to="{ name: 'admin-generate', query: { tenant: row.slug } }"
            >
              Editar
            </RouterLink>
            <RouterLink
              v-else
              class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              :to="{ name: 'admin-customers-list' }"
            >
              Crear sitio
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { LocalJsonAdapter } from "../../tenants/LocalJsonAdapter";
import type { TenantConfig } from "../../types/tenant";
import type { CustomerRecord } from "../../types/customer";
import SimpleBarChart from "../../components/admin/SimpleBarChart.vue";
import { canUseLocalAdminApi } from "../../utils/adminCapabilities";

type ChartItem = { label: string; value: number };

const adapter = new LocalJsonAdapter();
const loading = ref(false);
const errorMessage = ref("");
const customers = ref<CustomerRecord[]>([]);
const sites = ref<Array<{ slug: string; tenant: TenantConfig }>>([]);
const canWriteCustomers = ref(false);

const stats = computed(() => {
  let draftCount = 0;
  try {
    if (typeof window !== "undefined") {
      const draftsRaw = localStorage.getItem("weddingapp_drafts");
      const drafts = draftsRaw ? (JSON.parse(draftsRaw) as unknown) : [];
      draftCount = Array.isArray(drafts) ? drafts.length : 0;
    }
  } catch {
    draftCount = 0;
  }
  return { customers: customers.value.length, sites: sites.value.length, drafts: draftCount };
});

type UpcomingRow = { source: "Cliente" | "Sitio"; slug: string; coupleNames: string; dateISO: string; hasSite: boolean };

const upcoming = computed<UpcomingRow[]>(() => {
  const today = new Date();
  const normalize = (d: string) => new Date(`${d}T00:00:00`);

  const fromSites: UpcomingRow[] = sites.value
    .filter((s) => typeof s.tenant?.dateISO === "string" && s.tenant.dateISO)
    .map((s) => ({
      source: "Sitio",
      slug: s.slug,
      coupleNames: s.tenant.coupleNames || s.slug,
      dateISO: s.tenant.dateISO,
      hasSite: true
    }));

  const siteSlugs = new Set(fromSites.map((r) => r.slug));
  const fromCustomers: UpcomingRow[] = customers.value
    .filter((c) => c?.slug && c?.dateISO)
    .map((c) => ({
      source: "Cliente",
      slug: c.slug,
      coupleNames: c.coupleNames || `${c.groomName} & ${c.brideName}`.trim(),
      dateISO: c.dateISO,
      hasSite: siteSlugs.has(c.slug)
    }));

  const startOfToday = new Date(today.toDateString());
  const bySlug = new Map<string, UpcomingRow>();
  for (const r of [...fromSites, ...fromCustomers]) {
    const prev = bySlug.get(r.slug);
    if (!prev) {
      bySlug.set(r.slug, r);
      continue;
    }
    if (prev.source === "Cliente" && r.source === "Sitio") bySlug.set(r.slug, r);
  }

  return Array.from(bySlug.values())
    .filter((r) => {
      const d = normalize(r.dateISO);
      return Number.isFinite(d.getTime()) && d >= startOfToday;
    })
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
    .slice(0, 8);
});

const nextEventLabel = computed(() => {
  const first = upcoming.value[0];
  if (!first) return "—";
  const d = new Date(`${first.dateISO}T00:00:00`);
  if (!Number.isFinite(d.getTime())) return first.dateISO;
  return d.toLocaleDateString("es-MX", { dateStyle: "medium" });
});

const nextEventHint = computed(() => {
  const first = upcoming.value[0];
  if (!first) return "Sin eventos próximos.";
  const today = new Date();
  const d = new Date(`${first.dateISO}T00:00:00`);
  const startOfToday = new Date(today.toDateString());
  const diffDays = Math.max(0, Math.ceil((d.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24)));
  const countdown = diffDays === 0 ? "Hoy" : `En ${diffDays} días`;
  return `${first.coupleNames} • ${countdown}`;
});

const planChart = computed<ChartItem[]>(() => {
  const counts = { basic: 0, standard: 0, premium: 0 };
  for (const c of customers.value) {
    const key = String(c.plan || "") as keyof typeof counts;
    if (key in counts) counts[key] += 1;
  }
  return [
    { label: "Basic", value: counts.basic },
    { label: "Standard", value: counts.standard },
    { label: "Premium", value: counts.premium }
  ];
});

function ymLabel(d: Date) {
  return d.toLocaleString("es-MX", { month: "short", year: "2-digit" }).replace(".", "");
}

const monthChart = computed<ChartItem[]>(() => {
  const now = new Date();
  const buckets: Array<{ start: Date; label: string; value: number }> = [];
  for (let i = 0; i < 6; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    buckets.push({ start: d, label: ymLabel(d), value: 0 });
  }
  const add = (dateISO: string) => {
    const d = new Date(`${dateISO}T00:00:00`);
    if (!Number.isFinite(d.getTime())) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    for (const b of buckets) {
      const bk = `${b.start.getFullYear()}-${b.start.getMonth()}`;
      if (bk === key) b.value += 1;
    }
  };
  for (const s of sites.value) add(s.tenant.dateISO);
  for (const c of customers.value) if (c.dateISO) add(c.dateISO);
  return buckets.map((b) => ({ label: b.label, value: b.value }));
});

async function loadCustomers() {
  try {
    const res = await fetch("/__admin/customers/list");
    const json = (await res.json()) as { ok?: boolean; customers?: unknown };
    customers.value = Array.isArray(json?.customers) ? (json.customers as CustomerRecord[]) : [];
  } catch {
    customers.value = [];
  }
}

async function loadSites() {
  try {
    const slugs = await adapter.listTenants();
    const list = await Promise.all(
      slugs.map(async (slug) => {
        try {
          const tenant = (await adapter.getTenant(slug)) as TenantConfig | null;
          return tenant ? { slug, tenant } : null;
        } catch {
          return null;
        }
      })
    );
    sites.value = list.filter(Boolean) as Array<{ slug: string; tenant: TenantConfig }>;
  } catch {
    sites.value = [];
  }
}

async function load() {
  loading.value = true;
  errorMessage.value = "";
  try {
    await Promise.all([loadCustomers(), loadSites()]);
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : "No se pudo cargar el dashboard.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  void load();
  void (async () => {
    canWriteCustomers.value = await canUseLocalAdminApi("/__admin/customers/ping");
  })();
});
</script>
