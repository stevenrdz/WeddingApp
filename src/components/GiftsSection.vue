<template>
  <section :id="anchorId ?? 'regalos'" class="section gifts-section" :class="rootClass" :style="bg.style">
    <div class="container-safe">
      <p class="section-title text-left">REGALOS</p>
      <div class="ornament mt-2"></div>
      <h2 class="mt-4 font-heading text-3xl">Gracias por ser parte</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="card">
          <p class="text-black/70">{{ gifts.message }}</p>

          <template v-if="hasAccounts">
            <p class="mt-6 font-medium">Transferencia bancaria</p>
            <div class="mt-3 grid gap-3">
              <div v-for="(acc, index) in gifts.accounts" :key="`acc-${index}`" class="rounded-2xl border border-black/5 bg-white/50 p-4">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="font-medium text-black/80">{{ acc.name }}</p>
                    <p class="mt-1 text-sm text-black/60">ID: {{ acc.identification }}</p>
                    <p class="mt-2 font-mono text-sm text-black/80">{{ acc.accountNumber }}</p>
                    <p class="mt-1 text-sm text-black/60">Tipo: {{ prettyAccountType(acc.accountType) }}</p>
                  </div>
                  <div class="shrink-0 text-right">
                    <img
                      v-if="acc.bank && bankLogoByKey[acc.bank]"
                      class="h-9 w-9 rounded-lg bg-white p-1 shadow-sm ring-1 ring-black/5"
                      :src="bankLogoByKey[acc.bank]"
                      :alt="`Banco ${prettyBankName(acc.bank)}`"
                      loading="lazy"
                    />
                    <button class="btn-outline mt-3 text-sm" type="button" @click="copyText(acc.accountNumber)">Copiar</button>
                  </div>
                </div>
                <p v-if="copiedIndex === index" class="mt-2 text-xs text-emerald-700">Copiado.</p>
              </div>
            </div>
          </template>

          <template v-else-if="gifts.bankTransferText">
            <p class="mt-4 font-medium">Transferencia</p>
            <div class="mt-2 flex items-center gap-3">
              <code ref="codeRef" class="rounded bg-black/5 px-3 py-2 text-sm">{{ gifts.bankTransferText }}</code>
              <button class="btn-outline text-sm" type="button" @click="copyLegacy">Copiar</button>
            </div>
            <p v-if="copiedLegacy" class="mt-2 text-xs text-emerald-700">Copiado.</p>
          </template>
        </div>
        <div v-if="gifts.giftListUrl" class="card">
          <p class="font-medium">Lista de regalos</p>
          <a class="btn-primary mt-4 inline-flex" :href="gifts.giftListUrl" target="_blank" rel="noreferrer">Ver lista</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { BankAccountType, BankKey, GiftsConfig } from "../types/tenant";
import type { SectionBackgroundConfig } from "../types/tenant";
import { sectionBackground } from "../utils/sectionBackground";

const props = defineProps<{ gifts: GiftsConfig; anchorId?: string; background?: SectionBackgroundConfig }>();
const bg = computed(() => sectionBackground(props.background));
const rootClass = computed(() => bg.value.className);
const copiedLegacy = ref(false);
const copiedIndex = ref<number | null>(null);
const codeRef = ref<HTMLElement | null>(null);

const hasAccounts = computed(() => Boolean(props.gifts.accounts?.length));

const bankLogoByKey: Record<BankKey, string> = {
  pichincha: "/banks/pichincha.svg",
  guayaquil: "/banks/guayaquil.svg",
  pacifico: "/banks/pacifico.png",
  produbanco: "/banks/produbanco.png",
  internacional: "/banks/internacional.png",
  jep: "/banks/jep.svg",
  solidario: "/banks/solidario.svg"
};

function prettyBankName(key: BankKey) {
  const byKey: Record<BankKey, string> = {
    pichincha: "Pichincha",
    guayaquil: "Guayaquil",
    pacifico: "Pacífico",
    produbanco: "Produbanco",
    internacional: "Internacional",
    jep: "JEP",
    solidario: "Solidario"
  };
  return byKey[key] || key;
}

function prettyAccountType(type: BankAccountType) {
  if (type === "ahorros") return "Ahorros";
  if (type === "corriente") return "Corriente";
  return "Otro";
}

async function copyLegacy() {
  const text = codeRef.value?.textContent;
  if (!text) return;
  await navigator.clipboard.writeText(text);
  copiedLegacy.value = true;
  window.setTimeout(() => (copiedLegacy.value = false), 2000);
}

async function copyText(text: string) {
  if (!text) return;
  await navigator.clipboard.writeText(text);
  const index = props.gifts.accounts?.findIndex((a) => a.accountNumber === text) ?? -1;
  copiedIndex.value = index >= 0 ? index : 0;
  window.setTimeout(() => (copiedIndex.value = null), 2000);
}
</script>
