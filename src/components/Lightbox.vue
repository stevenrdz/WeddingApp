<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" @click.self="close">
    <button class="absolute right-6 top-6 text-white" @click="close">Cerrar</button>
    <button class="absolute left-6 text-white" @click="prev">Prev</button>
    <img class="max-h-[80vh] max-w-[80vw] rounded-2xl" :src="images[index].src" :alt="images[index].alt" />
    <button class="absolute right-6 text-white" @click="next">Next</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps<{ images: Array<{ src: string; alt: string }>; index: number }>();
const emit = defineEmits<{ (e: "close"): void; (e: "update:index", value: number): void }>();

function close() {
  emit("close");
}

function next() {
  emit("update:index", (props.index + 1) % props.images.length);
}

function prev() {
  emit("update:index", (props.index - 1 + props.images.length) % props.images.length);
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") close();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
}

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>