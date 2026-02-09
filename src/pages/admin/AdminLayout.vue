<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div id="app-layout" class="flex min-h-screen overflow-x-hidden">
      <div
        v-if="!isCollapsed && !isDesktop"
        class="fixed inset-0 z-20 bg-black/35 backdrop-blur-[1px]"
        role="button"
        aria-label="Cerrar menú"
        tabindex="0"
        @click="closeSidebarIfMobile"
        @keydown.enter.prevent="closeSidebarIfMobile"
      ></div>
      <aside
        class="fixed inset-y-0 left-0 z-30 flex h-screen w-[15.625rem] flex-col border-r border-slate-200 bg-white transition-transform duration-200"
        :class="isCollapsed ? '-translate-x-full' : 'translate-x-0'"
      >
        <div class="px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">W</div>
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Provenza</div>
              <div class="mt-1 text-lg font-semibold">Admin</div>
            </div>
          </div>
        </div>
        <nav class="px-3 py-2">
          <div class="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Builder</div>
          <RouterLink
            :class="navItemClass('admin-generate')"
            to="/admin/generate"
            @click="closeSidebarIfMobile"
          >
            <span class="grid h-6 w-6 place-items-center rounded-md bg-indigo-50 text-xs font-semibold text-indigo-600">G</span>
            Generar
          </RouterLink>
          <RouterLink
            :class="navItemClass('admin-drafts')"
            to="/admin/drafts"
            @click="closeSidebarIfMobile"
          >
            <span class="grid h-6 w-6 place-items-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">B</span>
            Borradores
          </RouterLink>
          <RouterLink
            :class="navItemClass('admin-sites')"
            to="/admin/sites"
            @click="closeSidebarIfMobile"
          >
            <span class="grid h-6 w-6 place-items-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">S</span>
            Sitios
          </RouterLink>
          <button
            class="mb-1 flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium text-slate-400"
            disabled
            type="button"
          >
            <span class="grid h-6 w-6 place-items-center rounded-md bg-slate-100 text-xs font-semibold text-slate-400">C</span>
            Configurar (pronto)
          </button>
          <div class="mt-6 mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Cuenta</div>
          <button
            class="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            type="button"
            @click="logout"
          >
            <span class="grid h-6 w-6 place-items-center rounded-md bg-red-50 text-xs font-semibold text-red-500">X</span>
            Cerrar sesión
          </button>
        </nav>
      </aside>

      <main
        id="app-layout-content"
        class="min-h-screen w-full transition-[margin] duration-200"
        :class="!isCollapsed && isDesktop ? 'ml-[15.625rem]' : 'ml-0'"
      >
        <div class="bg-white px-6 py-[10px] shadow-sm">
          <div class="flex items-center justify-between">
            <button class="text-slate-700" type="button" @click="toggleSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="h-9 w-9 rounded-full bg-slate-200"></div>
            </div>
          </div>
        </div>

        <div class="mx-6 mb-6 mt-6">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter, RouterView, RouterLink } from "vue-router";

const router = useRouter();
const route = useRoute();
const initialWidth = typeof window !== "undefined" ? window.innerWidth || 0 : 0;
const viewportWidth = ref<number>(initialWidth);
const isDesktop = computed(() => viewportWidth.value >= 768);
const isCollapsed = ref(!isDesktop.value);

function navItemClass(name: string) {
  const isActive = route.name === name;
  return [
    "mb-1 flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition",
    isActive ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100"
  ].join(" ");
}

function syncViewport() {
  viewportWidth.value = window.innerWidth || 0;
}

function closeSidebarIfMobile() {
  if (!isDesktop.value) isCollapsed.value = true;
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function logout() {
  localStorage.removeItem("weddingapp_admin");
  router.push({ name: "admin-login" });
}

onMounted(() => {
  // Keep it stable on reload (avoid "open then close" flicker on mobile)
  syncViewport();
  isCollapsed.value = !isDesktop.value;

  window.addEventListener("resize", syncViewport, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", syncViewport);
});
</script>
