<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="flex min-h-screen">
      <aside class="w-64 border-r border-slate-200 bg-white">
        <div class="px-6 py-5">
          <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">WeddingApp</div>
          <div class="mt-2 text-lg font-semibold">Admin</div>
        </div>
        <nav class="px-3 py-2">
          <RouterLink
            class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-100"
            to="/admin/generate"
          >
            Generar
          </RouterLink>
          <button
            class="mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-400"
            disabled
            type="button"
          >
            Configurar (pronto)
          </button>
          <button
            class="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            type="button"
            @click="logout"
          >
            Cerrar sesion
          </button>
        </nav>
      </aside>

      <main class="flex-1">
        <div class="border-b border-slate-200 bg-white px-8 py-5">
          <h1 class="text-xl font-semibold">Panel administrativo</h1>
          <p class="text-sm text-slate-500">Crea y previsualiza nuevas bodas.</p>
        </div>
        <div class="p-6">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem("weddingapp_admin");
  router.push({ name: "admin-login" });
}
</script>