<template>
  <div class="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
    <section class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 class="text-lg font-semibold">Generar nueva boda</h2>
        <p class="text-sm text-slate-500">Completa el formulario y mira la previsualizacion en vivo.</p>
      </div>

      <div class="space-y-4">
        <label class="block text-sm font-medium text-slate-700">
          Slug
          <input
            v-model="draft.slug"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="ej: steven-jenniffer"
            type="text"
          />
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Nombres de la pareja
          <input
            v-model="draft.coupleNames"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Nombre & Nombre"
            type="text"
          />
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Fecha
          <input
            v-model="draft.dateISO"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            type="date"
          />
        </label>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">Hero</h3>
        <label class="block text-sm text-slate-600">
          Tagline
          <input v-model="draft.hero.tagline" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm text-slate-600">
            CTA primaria
            <input v-model="draft.hero.ctaPrimaryText" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
          <label class="block text-sm text-slate-600">
            CTA secundaria
            <input v-model="draft.hero.ctaSecondaryText" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-semibold text-slate-800">Ceremonia</h3>
        <label class="block text-sm text-slate-600">
          Nombre
          <input v-model="draft.ceremony.name" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm text-slate-600">
            Hora
            <input v-model="draft.ceremony.time" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="time" />
          </label>
          <label class="block text-sm text-slate-600">
            Mapa
            <input v-model="draft.ceremony.mapUrl" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="url" />
          </label>
        </div>
        <label class="block text-sm text-slate-600">
          Direccion
          <input v-model="draft.ceremony.address" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-semibold text-slate-800">Recepcion</h3>
        <label class="block text-sm text-slate-600">
          Nombre
          <input v-model="draft.reception.name" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm text-slate-600">
            Hora
            <input v-model="draft.reception.time" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="time" />
          </label>
          <label class="block text-sm text-slate-600">
            Mapa
            <input v-model="draft.reception.mapUrl" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="url" />
          </label>
        </div>
        <label class="block text-sm text-slate-600">
          Direccion
          <input v-model="draft.reception.address" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-800">Itinerario</h3>
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addSchedule">
            Agregar
          </button>
        </div>
        <div v-for="(item, index) in draft.schedule" :key="index" class="rounded-xl border border-slate-200 p-3">
          <div class="grid gap-3 md:grid-cols-3">
            <input v-model="item.time" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Hora" />
            <input v-model="item.title" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Titulo" />
            <input v-model="item.description" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Descripcion" />
          </div>
          <button
            v-if="draft.schedule.length > 1"
            class="mt-2 text-xs text-red-500"
            type="button"
            @click="removeSchedule(index)"
          >
            Quitar
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">RSVP</h3>
        <label class="flex items-center gap-2 text-sm text-slate-600">
          <input v-model="draft.rsvp.enabled" type="checkbox" />
          Habilitar RSVP
        </label>
        <label class="block text-sm text-slate-600">
          Modo
          <select v-model="draft.rsvp.mode" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
            <option value="whatsapp">WhatsApp</option>
            <option value="netlify">Netlify Forms</option>
          </select>
        </label>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm text-slate-600">
            Fecha limite
            <input v-model="draft.rsvp.deadlineISO" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="date" />
          </label>
          <label class="block text-sm text-slate-600">
            WhatsApp
            <input v-model="draft.rsvp.whatsappNumber" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="521..." />
          </label>
        </div>
        <label class="block text-sm text-slate-600">
          Netlify Form (opcional)
          <input v-model="draft.rsvp.netlifyFormNameOptional" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">Tema</h3>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm text-slate-600">
            Primario
            <input v-model="draft.theme.primary" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="color" />
          </label>
          <label class="block text-sm text-slate-600">
            Secundario
            <input v-model="draft.theme.secondary" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="color" />
          </label>
          <label class="block text-sm text-slate-600">
            Fondo
            <input v-model="draft.theme.background" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="color" />
          </label>
          <label class="block text-sm text-slate-600">
            Texto
            <input v-model="draft.theme.text" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="color" />
          </label>
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm text-slate-600">
            Fuente titulo
            <input v-model="draft.theme.fontHeading" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
          <label class="block text-sm text-slate-600">
            Fuente cuerpo
            <input v-model="draft.theme.fontBody" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">SEO</h3>
        <label class="block text-sm text-slate-600">
          Titulo
          <input v-model="draft.seo.title" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
        <label class="block text-sm text-slate-600">
          Descripcion
          <textarea v-model="draft.seo.description" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" rows="3" />
        </label>
        <label class="block text-sm text-slate-600">
          URL
          <input v-model="draft.seo.url" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="url" />
        </label>
        <label class="block text-sm text-slate-600">
          OG Image
          <input v-model="draft.seo.ogImage" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
        </label>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">Contacto</h3>
        <label class="block text-sm text-slate-600">
          Email
          <input v-model="draft.contactEmail" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="email" />
        </label>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">Secciones visibles</h3>
        <div class="grid gap-2 md:grid-cols-2">
          <label class="flex items-center gap-2 text-sm text-slate-600"><input v-model="draft.sections.countdown" type="checkbox" /> Countdown</label>
          <label class="flex items-center gap-2 text-sm text-slate-600"><input v-model="draft.sections.timeline" type="checkbox" /> Itinerario</label>
          <label class="flex items-center gap-2 text-sm text-slate-600"><input v-model="draft.sections.dressCode" type="checkbox" /> Dress code</label>
          <label class="flex items-center gap-2 text-sm text-slate-600"><input v-model="draft.sections.gifts" type="checkbox" /> Regalos</label>
          <label class="flex items-center gap-2 text-sm text-slate-600"><input v-model="draft.sections.gallery" type="checkbox" /> Galeria</label>
          <label class="flex items-center gap-2 text-sm text-slate-600"><input v-model="draft.sections.faq" type="checkbox" /> FAQ</label>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          type="button"
          @click="downloadJson"
        >
          Descargar JSON
        </button>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 class="text-lg font-semibold">Preview en vivo</h2>
          <p class="text-sm text-slate-500">Se actualiza con cada cambio.</p>
        </div>
        <a
          class="rounded-lg border border-slate-200 px-3 py-1 text-xs"
          :href="`/w/${draft.slug}`"
          target="_blank"
          rel="noopener"
        >
          Ver pagina
        </a>
      </div>
      <div ref="previewRef" class="max-h-[80vh] overflow-y-auto">
        <WeddingPreview :tenant="tenantForPreview" :slug="draft.slug" :section-flags="sectionFlags" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import WeddingPreview from "../../components/WeddingPreview.vue";
import type { TenantConfig } from "../../types/tenant";

const previewRef = ref<HTMLElement | null>(null);

const draft = reactive({
  slug: "nueva-boda",
  coupleNames: "Nombre & Nombre",
  dateISO: "2026-09-12",
  hero: {
    tagline: "Nuestro si, para siempre",
    ctaPrimaryText: "RSVP",
    ctaSecondaryText: "Ubicaciones"
  },
  ceremony: {
    name: "Capilla San Miguel",
    time: "17:00",
    address: "Av. Central 450, CDMX",
    mapUrl: "https://maps.google.com"
  },
  reception: {
    name: "Hacienda Los Laureles",
    time: "19:00",
    address: "Camino Antiguo 95, CDMX",
    mapUrl: "https://maps.google.com"
  },
  schedule: [
    { time: "17:00", title: "Ceremonia", description: "Capilla" },
    { time: "19:00", title: "Recepcion", description: "Brindis y cena" }
  ],
  dressCode: {
    title: "Formal",
    description: "Tonos sobrios y elegantes."
  },
  gifts: {
    bankTransferText: "Banco Aurora 9876-5432-10",
    giftListUrl: "https://example.com",
    message: "Gracias por acompanarnos en este dia."
  },
  rsvp: {
    mode: "whatsapp" as const,
    enabled: true,
    deadlineISO: "2026-08-20",
    whatsappNumber: "5215512341111",
    netlifyFormNameOptional: ""
  },
  gallery: [],
  theme: {
    primary: "#7b4f62",
    secondary: "#1f2437",
    background: "#fbf6f1",
    text: "#2a2a2a",
    fontHeading: "Boska",
    fontBody: "Inter"
  },
  seo: {
    title: "Nombre & Nombre | Boda",
    description: "Acompananos en nuestro gran dia.",
    url: "https://tuboda.com/w/nueva-boda",
    ogImage: "/og-default.svg"
  },
  story: {
    title: "Nuestra historia",
    message: "Un encuentro casual que termino en un si para siempre."
  },
  faq: [
    {
      question: "Como confirmo asistencia?",
      answer: "Entra a la seccion RSVP y completa el formulario o escribenos por WhatsApp."
    }
  ],
  contactEmail: "contacto@tuboda.com",
  sections: {
    countdown: true,
    story: true,
    locations: true,
    timeline: true,
    dressCode: true,
    gifts: true,
    rsvp: true,
    gallery: true,
    faq: true
  }
});

const tenantForPreview = computed<TenantConfig>(() => {
  const { sections, slug, ...tenant } = draft;
  return tenant as TenantConfig;
});

const sectionFlags = computed(() => ({
  countdown: draft.sections.countdown,
  story: draft.sections.story,
  locations: draft.sections.locations,
  timeline: draft.sections.timeline,
  dressCode: draft.sections.dressCode,
  gifts: draft.sections.gifts,
  rsvp: draft.sections.rsvp,
  gallery: draft.sections.gallery,
  faq: draft.sections.faq
}));

function applyThemeToElement(el: HTMLElement | null, theme: TenantConfig["theme"]) {
  if (!el) return;
  el.style.setProperty("--color-primary", theme.primary);
  el.style.setProperty("--color-secondary", theme.secondary);
  el.style.setProperty("--color-accent", theme.primary);
  el.style.setProperty("--color-surface", theme.background);
  el.style.setProperty("--color-text", theme.text);
  el.style.setProperty("--font-heading", theme.fontHeading);
  el.style.setProperty("--font-body", theme.fontBody);
}

watch(
  () => draft.theme,
  (theme) => applyThemeToElement(previewRef.value, theme),
  { deep: true, immediate: true }
);

function addSchedule() {
  draft.schedule.push({ time: "", title: "", description: "" });
}

function removeSchedule(index: number) {
  draft.schedule.splice(index, 1);
}

function downloadJson() {
  const { sections, slug, ...tenant } = draft;
  const json = JSON.stringify(tenant, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug || "tenant"}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>