<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="flex min-h-screen">
      <aside
        class="fixed inset-y-0 left-0 z-30 flex flex-col border-r border-slate-200 bg-white transition-[width] duration-200"
        :class="isCollapsed ? 'w-20' : 'w-64'"
      >
        <div class="flex items-center justify-between px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-sm font-semibold text-white">W</div>
            <div v-if="!isCollapsed">
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">WeddingApp</div>
              <div class="mt-1 text-lg font-semibold">Admin</div>
            </div>
          </div>
          <button class="rounded-lg border border-slate-200 px-2 py-1 text-xs" type="button" @click="toggleSidebar">
            {{ isCollapsed ? ">" : "<" }}
          </button>
        </div>

        <nav class="px-3 py-2">
          <RouterLink
            class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-100"
            to="/admin/generate"
          >
            <span class="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">G</span>
            <span v-if="!isCollapsed">Generar</span>
          </RouterLink>
          <button
            class="mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-400"
            disabled
            type="button"
          >
            <span class="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-400">C</span>
            <span v-if="!isCollapsed">Configurar (pronto)</span>
          </button>
          <button
            class="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            type="button"
            @click="logout"
          >
            <span class="grid h-6 w-6 place-items-center rounded-lg bg-red-50 text-xs font-semibold text-red-500">X</span>
            <span v-if="!isCollapsed">Cerrar sesion</span>
          </button>
        </nav>
      </aside>

      <main class="flex-1 transition-[margin] duration-200" :class="isCollapsed ? 'ml-20' : 'ml-64'">
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
import { ref } from "vue";
import { useRouter, RouterView, RouterLink } from "vue-router";

const router = useRouter();
const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function logout() {
  localStorage.removeItem("weddingapp_admin");
  router.push({ name: "admin-login" });
}
</script>
