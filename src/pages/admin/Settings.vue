<template>
  <div class="p-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">Configuración</h1>
        <p class="mt-1 text-sm text-slate-500">Ajustes globales del admin (por ahora se guardan en este navegador).</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button class="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm" type="button" @click="reset">
          Restablecer
        </button>
        <button class="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white" type="button" @click="save">
          Guardar
        </button>
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Branding</p>
        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <label class="block text-sm text-slate-700">
            Nombre del negocio
            <input v-model="form.businessName" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="Provenza" />
          </label>
          <label class="block text-sm text-slate-700">
            Email por defecto
            <input v-model="form.defaultContactEmail" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 text-sm" placeholder="contacto@..." type="email" />
          </label>
          <label class="block text-sm text-slate-700 md:col-span-2">
            URL base (para SEO/QR)
            <input v-model="form.publicOrigin" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm" placeholder="https://tudominio.com" />
            <p class="mt-1 text-xs text-slate-500">Se usará para sugerir URLs en el builder (no cambia el dominio real del deploy).</p>
          </label>
        </div>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Defaults (nuevos sitios)</p>
        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <label class="block text-sm text-slate-700">
            Color primario
            <input v-model="form.defaultPrimary" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm" placeholder="#7b4f62" />
          </label>
          <label class="block text-sm text-slate-700">
            WhatsApp (RSVP)
            <input v-model="form.defaultWhatsapp" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm" placeholder="521..." />
          </label>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 md:col-span-2">
            Ideas de configuración global:
            <ul class="mt-2 list-disc space-y-1 pl-5">
              <li>Biblioteca de plantillas por plan (basic/standard/premium).</li>
              <li>Tipografías permitidas y estilos de “ornamentos”.</li>
              <li>Integraciones: Google Drive (galería premium), Analytics, Pixel.</li>
              <li>Textos legales y links globales (términos/privacidad).</li>
              <li>Catálogo de secciones disponibles por plan.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div v-if="status" class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

type AdminSettings = {
  businessName: string;
  defaultContactEmail: string;
  publicOrigin: string;
  defaultPrimary: string;
  defaultWhatsapp: string;
};

const storageKey = "provenza:admin_settings";
const status = ref("");

function readSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? (JSON.parse(raw) as Partial<AdminSettings>) : {};
    return {
      businessName: String(parsed.businessName || "Provenza"),
      defaultContactEmail: String(parsed.defaultContactEmail || ""),
      publicOrigin: String(parsed.publicOrigin || ""),
      defaultPrimary: String(parsed.defaultPrimary || "#7b4f62"),
      defaultWhatsapp: String(parsed.defaultWhatsapp || "")
    };
  } catch {
    return {
      businessName: "Provenza",
      defaultContactEmail: "",
      publicOrigin: "",
      defaultPrimary: "#7b4f62",
      defaultWhatsapp: ""
    };
  }
}

const form = reactive<AdminSettings>(readSettings());

function save() {
  localStorage.setItem(storageKey, JSON.stringify(form));
  status.value = "Configuración guardada.";
  window.setTimeout(() => (status.value = ""), 2000);
}

function reset() {
  const next = readSettings();
  Object.assign(form, {
    businessName: "Provenza",
    defaultContactEmail: "",
    publicOrigin: "",
    defaultPrimary: "#7b4f62",
    defaultWhatsapp: ""
  } satisfies AdminSettings);
  status.value = "Restablecido. Recuerda guardar.";
  window.setTimeout(() => (status.value = ""), 2200);
}
</script>

