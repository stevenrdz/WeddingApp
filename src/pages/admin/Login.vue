<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-10">
      <div class="grid w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg md:grid-cols-[1fr_420px]">
        <div class="hidden flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white md:flex">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Provenza Admin</p>
            <h1 class="mt-4 font-heading text-3xl leading-tight">Gestiona bodas en minutos</h1>
            <p class="mt-4 text-sm text-white/75">
              Crea clientes, genera sitios, guarda borradores y comparte previews con un solo enlace.
            </p>
          </div>
          <ul class="space-y-2 text-sm text-white/80">
            <li>Dashboard con próximas fechas</li>
            <li>Builder con vista previa en vivo</li>
            <li>Acceso demo sin contraseñas</li>
          </ul>
        </div>

        <div class="p-8 md:p-10">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-semibold">Acceso administrador</h2>
              <p class="mt-2 text-sm text-slate-500">Modo demo: entra con cualquier clave.</p>
            </div>
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Demo</span>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
            <label class="block text-sm font-medium text-slate-700">
              Clave
              <input
                v-model="password"
                class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-400 focus:outline-none"
                type="password"
                placeholder="Tu clave"
              />
            </label>

            <button
              class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              type="submit"
            >
              Entrar
            </button>
          </form>

          <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            Tip: comparte el link del preview con tu cliente para validar cambios rápido.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const password = ref("");

function handleLogin() {
  localStorage.setItem("weddingapp_admin", "1");
  const next = typeof route.query.next === "string" ? route.query.next : "/admin/generate";
  router.push(next);
}
</script>
