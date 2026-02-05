<template>
  <section :id="anchorId ?? 'regalos'" class="section gifts-section">
    <div class="container-safe">
      <p class="section-title text-left">REGALOS</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">Gracias por ser parte</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="card">
          <p class="text-black/70">{{ gifts.message }}</p>
          <p class="mt-4 font-medium">Transferencia</p>
          <div class="mt-2 flex items-center gap-3">
            <code ref="codeRef" class="rounded bg-black/5 px-3 py-2 text-sm">{{ gifts.bankTransferText }}</code>
            <button class="btn-outline text-sm" @click="copy">Copiar</button>
          </div>
          <p v-if="copied" class="mt-2 text-xs text-green-700">Copiado!</p>
        </div>
        <div class="card">
          <p class="font-medium">Lista de regalos</p>
          <a class="btn-primary mt-4" :href="gifts.giftListUrl" target="_blank" rel="noreferrer">Ver lista</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ gifts: { bankTransferText: string; giftListUrl: string; message: string }; anchorId?: string }>();
const copied = ref(false);
const codeRef = ref<HTMLElement | null>(null);

async function copy() {
  const text = codeRef.value?.textContent;
  if (!text) return;
  await navigator.clipboard.writeText(text);
  copied.value = true;
  window.setTimeout(() => (copied.value = false), 2000);
}
</script>
