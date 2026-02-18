<template>
  <div class="p-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">Clientes</h1>
        <p class="mt-1 text-sm text-slate-500">
          Crea clientes para autogenerar un slug y prellenar datos base (novio/novia, fecha, lugares).
        </p>
      </div>
    </div>

    <div v-if="showNew" class="mt-6 space-y-6">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Nuevo cliente</p>
            <p class="mt-2 text-sm text-slate-600">Completa los datos base y genera el slug automáticamente.</p>
          </div>
          <p v-if="!canWriteToProject" class="text-xs text-slate-400">Guardado no disponible en este entorno.</p>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div class="space-y-6">
          <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 class="text-sm font-semibold text-slate-800">Datos base</h3>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <label class="block text-sm text-slate-700">
                Nombre del novio
                <input v-model="form.groomName" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Ej: Steven" />
              </label>
              <label class="block text-sm text-slate-700">
                Nombre de la novia
                <input v-model="form.brideName" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Ej: Jenniffer" />
              </label>
              <label class="block text-sm text-slate-700">
                Fecha del casamiento
                <input v-model="form.dateISO" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" type="date" />
              </label>
              <label class="block text-sm text-slate-700">
                Plan
                <select v-model="form.plan" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm">
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </label>
            </div>
          </section>

          <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 class="text-sm font-semibold text-slate-800">Ceremonia y recepción</h3>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <label class="block text-sm text-slate-700">
                Lugar ceremonia
                <input v-model="form.ceremonyName" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Ej: Capilla San Miguel" />
              </label>
              <label class="block text-sm text-slate-700">
                Dirección ceremonia
                <input v-model="form.ceremonyAddress" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Ej: Av. Central 450" />
              </label>
              <label class="block text-sm text-slate-700">
                URL mapa ceremonia
                <input v-model="form.ceremonyMapUrl" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm" placeholder="https://maps.app.goo.gl/..." />
              </label>

              <label class="block text-sm text-slate-700">
                Lugar recepción
                <input v-model="form.receptionName" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Ej: Hacienda Los Laureles" />
              </label>
              <label class="block text-sm text-slate-700">
                Dirección recepción
                <input v-model="form.receptionAddress" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Ej: Camino Antiguo 95" />
              </label>
              <label class="block text-sm text-slate-700">
                URL mapa recepción
                <input v-model="form.receptionMapUrl" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm" placeholder="https://maps.app.goo.gl/..." />
              </label>
            </div>
          </section>

          <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 class="text-sm font-semibold text-slate-800">Contacto y RSVP</h3>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <label class="block text-sm text-slate-700">
                WhatsApp (RSVP)
                <input
                  v-model="form.rsvpWhatsappNumber"
                  class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm"
                  placeholder="099 123 4567"
                  inputmode="tel"
                />
                <p class="mt-1 text-xs text-slate-500">Formato Ecuador: 0991234567 o +593991234567.</p>
              </label>
              <label class="block text-sm text-slate-700">
                Email contacto
                <input v-model="form.contactEmail" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="contacto@..." type="email" />
              </label>
            </div>
          </section>
        </div>

        <aside class="space-y-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Resumen</p>
            <p class="mt-2 text-lg font-semibold text-slate-900">
              {{ form.groomName || "Nombre del novio" }} & {{ form.brideName || "Nombre de la novia" }}
            </p>
            <p class="mt-1 text-sm text-slate-600">
              {{ form.dateISO || "Fecha pendiente" }} · {{ form.plan.toUpperCase() }}
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label class="block text-sm text-slate-700">
              Slug (autogenerado)
              <input
                v-model="form.slug"
                class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm"
                placeholder="steven-jenniffer"
                @input="slugMode = \"manual\""
              />
              <p class="mt-1 text-xs text-slate-500">Tip: se genera desde nombres. Puedes ajustarlo.</p>
            </label>
            <div class="mt-4 flex flex-col gap-2">
              <button class="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700" type="button" @click="generateSlug">
                Regenerar slug
              </button>
              <button
                class="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white disabled:opacity-60"
                type="button"
                :disabled="!canWriteToProject || saving"
                @click="save"
              >
                {{ saving ? "Guardando..." : "Guardar cliente" }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <div v-if="showList" class="mt-6 flex flex-wrap items-center gap-3">
      <input v-model="query" class="h-10 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 text-sm" placeholder="Buscar por slug o nombres..." type="search" />
      <button class="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm" type="button" @click="load">
        Recargar
      </button>
      <p class="text-sm text-slate-500">{{ filtered.length }} cliente(s)</p>
    </div>

    <div v-if="showList" class="mt-6 grid gap-4">
      <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Cargando...</div>
      <div v-if="!loading && !filtered.length" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No hay clientes aún.
      </div>

      <div v-for="c in filtered" :key="c.slug" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cliente</p>
            <p class="mt-2 truncate text-lg font-semibold text-slate-900">{{ displayCoupleNames(c) }}</p>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
              <p><span class="text-slate-400">Slug:</span> <span class="font-medium text-slate-800">{{ c.slug }}</span></p>
              <p v-if="c.dateISO"><span class="text-slate-400">Fecha:</span> <span class="font-medium text-slate-800">{{ c.dateISO }}</span></p>
              <p><span class="text-slate-400">Plan:</span> <span class="font-medium text-slate-800">{{ c.plan }}</span></p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="button" @click="openInBuilder(c.slug)">
              Generar sitio
            </button>
            <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="edit(c.slug)">
              Editar
            </button>
            <button
              class="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60"
              type="button"
              :disabled="!canWriteToProject"
              @click="remove(c.slug)"
            >
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import type { CustomerPlan, CustomerRecord } from "../../types/customer";
import { makeCoupleSlug } from "../../utils/slugify";
import type { TenantConfig } from "../../types/tenant";
import { canUseLocalAdminApi } from "../../utils/adminCapabilities";

const props = defineProps<{ view?: "new" | "list" | "all" }>();
const view = computed(() => props.view || "all");
const showNew = computed(() => view.value === "new" || view.value === "all");
const showList = computed(() => view.value === "list" || view.value === "all");

const router = useRouter();
const loading = ref(false);
const saving = ref(false);
const canWriteToProject = ref(false);
const items = ref<CustomerRecord[]>([]);
const query = ref("");
const slugMode = ref<"auto" | "manual">("auto");

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
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

const form = reactive<CustomerRecord>({
  slug: "",
  plan: "standard",
  groomName: "",
  brideName: "",
  coupleNames: "",
  dateISO: "",
  ceremonyName: "",
  ceremonyAddress: "",
  ceremonyMapUrl: "",
  receptionName: "",
  receptionAddress: "",
  receptionMapUrl: "",
  rsvpWhatsappNumber: "",
  contactEmail: "",
  notes: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

function resetForm() {
  form.slug = "";
  form.plan = "standard";
  form.groomName = "";
  form.brideName = "";
  form.coupleNames = "";
  form.dateISO = "";
  form.ceremonyName = "";
  form.ceremonyAddress = "";
  form.ceremonyMapUrl = "";
  form.receptionName = "";
  form.receptionAddress = "";
  form.receptionMapUrl = "";
  form.rsvpWhatsappNumber = "";
  form.contactEmail = "";
  form.notes = "";
  form.createdAt = new Date().toISOString();
  form.updatedAt = new Date().toISOString();
  slugMode.value = "auto";
}

function generateSlug() {
  slugMode.value = "auto";
  const base = makeCoupleSlug(form.groomName, form.brideName);
  const taken = new Set(items.value.map((c) => c.slug));
  if (!taken.has(base)) {
    form.slug = base;
    return;
  }
  let i = 2;
  while (taken.has(`${base}-${i}`)) i += 1;
  form.slug = `${base}-${i}`;
}

function computeCoupleNames(groomName: string, brideName: string) {
  return [String(groomName || "").trim(), String(brideName || "").trim()].filter(Boolean).join(" & ");
}

function displayCoupleNames(c: CustomerRecord) {
  const fromRecord = String(c.coupleNames || "").trim();
  if (fromRecord.length >= 3) return fromRecord;
  const joined = computeCoupleNames(c.groomName, c.brideName);
  return joined || fromRecord || "—";
}

function looksLikeUrl(value: string) {
  return /^https?:\/\//i.test(String(value || "").trim());
}

function getCeremonyMapUrl(c: CustomerRecord) {
  const explicit = String(c.ceremonyMapUrl || "").trim();
  if (explicit) return explicit;
  const legacy = String(c.ceremonyAddress || "").trim();
  return looksLikeUrl(legacy) ? legacy : "";
}

function getReceptionMapUrl(c: CustomerRecord) {
  const explicit = String(c.receptionMapUrl || "").trim();
  if (explicit) return explicit;
  const legacy = String(c.receptionAddress || "").trim();
  return looksLikeUrl(legacy) ? legacy : "";
}

function getCeremonyAddress(c: CustomerRecord) {
  const addr = String(c.ceremonyAddress || "").trim();
  return looksLikeUrl(addr) ? "" : addr;
}

function getReceptionAddress(c: CustomerRecord) {
  const addr = String(c.receptionAddress || "").trim();
  return looksLikeUrl(addr) ? "" : addr;
}

watch(
  () => [form.groomName, form.brideName],
  () => {
    if (slugMode.value === "auto") generateSlug();
    if (!form.coupleNames.trim() && (form.groomName.trim() || form.brideName.trim())) {
      form.coupleNames = computeCoupleNames(form.groomName, form.brideName);
    }
  }
);

async function checkWriter() {
  canWriteToProject.value = await canUseLocalAdminApi("/__admin/customers/ping");
}

async function load() {
  loading.value = true;
  try {
    const res = await fetch("/__admin/customers/list");
    const json = (await res.json()) as { ok?: boolean; customers?: unknown };
    const list = Array.isArray(json?.customers) ? (json.customers as CustomerRecord[]) : [];
    items.value = list;
  } catch {
    items.value = [];
  } finally {
    loading.value = false;
  }
}

function edit(slug: string) {
  const found = items.value.find((c) => c.slug === slug);
  if (!found) return;
  Object.assign(form, found);
  slugMode.value = "manual";
  pushToast("info", `Editando: ${slug}`);
}

async function save() {
  if (saving.value) return;
  if (!canWriteToProject.value) {
    pushToast("error", "No se puede guardar en este modo.");
    return;
  }
  if (!form.groomName.trim() || !form.brideName.trim()) {
    pushToast("error", "Ingresa los nombres del novio y la novia.");
    return;
  }
  if (!form.dateISO) {
    pushToast("error", "Selecciona la fecha del casamiento.");
    return;
  }
  if (!form.ceremonyName.trim() || !form.receptionName.trim()) {
    pushToast("error", "Completa el lugar de ceremonia y recepción.");
    return;
  }
  if (!form.slug.trim()) {
    pushToast("error", "Slug es obligatorio.");
    return;
  }
  saving.value = true;
  try {
    const coupleNames = computeCoupleNames(form.groomName, form.brideName);
    const res = await fetch("/__admin/customers/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ customer: { ...form, coupleNames, updatedAt: new Date().toISOString() } })
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json?.ok) {
      pushToast("error", json?.error || "No se pudo guardar.");
      return;
    }
    await load();
    pushToast("success", `Cliente guardado: ${form.slug}`);
    if (view.value === "new") {
      await router.push({ name: "admin-customers-list" });
    }
  } catch {
    pushToast("error", "Error al guardar.");
  } finally {
    saving.value = false;
  }
}

function buildTenantFromCustomer(c: CustomerRecord): TenantConfig {
  const coupleNames = c.coupleNames?.trim() || [c.groomName.trim(), c.brideName.trim()].filter(Boolean).join(" & ");
  return {
    coupleNames: coupleNames || "Nombre & Nombre",
    dateISO: c.dateISO || new Date().toISOString().slice(0, 10),
    hero: {
      tagline: "Nuestro sí, para siempre",
      ctaPrimaryText: "RSVP",
      ctaSecondaryText: "Ubicaciones",
      ctaPrimaryTarget: "#rsvp",
      ctaSecondaryTarget: "#ubicaciones"
    },
    ceremony: { name: c.ceremonyName || "Ceremonia", time: "17:00", address: getCeremonyAddress(c), mapUrl: getCeremonyMapUrl(c) },
    reception: { name: c.receptionName || "Recepción", time: "19:00", address: getReceptionAddress(c), mapUrl: getReceptionMapUrl(c) },
    schedule: [
      { time: "17:00", title: "Ceremonia", description: c.ceremonyName || "Ceremonia" },
      { time: "19:00", title: "Recepción", description: c.receptionName || "Recepción" }
    ],
    dressCode: { title: "Formal", description: "" },
    gifts: { message: "", giftListUrl: "", accounts: [] },
    rsvp: {
      mode: "whatsapp",
      enabled: Boolean(c.rsvpWhatsappNumber),
      deadlineISO: "",
      whatsappNumber: c.rsvpWhatsappNumber || "",
      netlifyFormNameOptional: ""
    },
    gallery: [],
    theme: {
      primary: "#7b4f62",
      secondary: "#1f2437",
      background: "#fbf6f1",
      text: "#2a2a2a",
      fontHeading: "Boska",
      fontSubheading: "Cormorant Garamond",
      fontBody: "Inter"
    },
    seo: {
      title: `${coupleNames || "Boda"} | Boda`,
      description: "Acompáñanos en nuestro gran día.",
      url: "",
      ogImage: "/og-default.svg"
    },
    story: { title: "Nuestra historia", message: "" },
    faq: [],
    contactEmail: c.contactEmail || "",
    page: { navbar: undefined, hero: undefined, sections: undefined, footer: undefined, locations: { showCeremony: true, showReception: true, mapMode: "button" } }
  };
}

async function openInBuilder(slug: string) {
  const found = items.value.find((c) => c.slug === slug);
  if (!found) return;

  if (canWriteToProject.value) {
    // Create/refresh a tenant scaffold so the builder can load it by ?tenant=slug
    try {
      const tenant = buildTenantFromCustomer(found);
      await fetch("/__admin/tenants/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: found.slug, tenant })
      });
    } catch {
      // ignore (builder can still start with draft)
    }
  }

  router.push({ name: "admin-generate", query: { tenant: found.slug } });
}

async function remove(slug: string) {
  if (!canWriteToProject.value) return;
  const ok = window.confirm(`¿Eliminar el cliente "${slug}"?`);
  if (!ok) return;
  try {
    const res = await fetch("/__admin/customers/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug })
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json?.ok) {
      pushToast("error", json?.error || "No se pudo eliminar.");
      return;
    }
    await load();
    pushToast("success", `Cliente eliminado: ${slug}`);
  } catch {
    pushToast("error", "Error al eliminar.");
  }
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter((c) => {
    const hay = `${c.slug} ${c.groomName} ${c.brideName} ${c.coupleNames}`.toLowerCase();
    return hay.includes(q);
  });
});

onMounted(async () => {
  await checkWriter();
  await load();
  resetForm();
});
</script>
