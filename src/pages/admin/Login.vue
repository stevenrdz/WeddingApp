<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
      <div class="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 class="text-2xl font-semibold">Acceso administrador</h1>
        <p class="mt-2 text-sm text-slate-500">Modo demo: entra con cualquier clave.</p>

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
  if (!password.value.trim()) return;
  localStorage.setItem("weddingapp_admin", "1");
  const next = typeof route.query.next === "string" ? route.query.next : "/admin/generate";
  router.push(next);
}
</script>