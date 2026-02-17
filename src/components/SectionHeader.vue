<template>
  <div :class="containerClass">
    <p :class="titleClass">{{ title }}</p>
    <div v-if="ornamentVariant !== 'none'" :class="[ornamentCls, ornamentAlignClass]" aria-hidden="true"></div>
    <h2 v-if="heading" :class="headingClass">{{ heading }}</h2>
    <p v-if="tagline" :class="taglineClass">{{ tagline }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OrnamentVariant, TextAlign, TextStyleConfig } from "../types/tenant";
import { ornamentClass, textStyleClasses } from "../utils/textStyle";

const props = defineProps<{
  title: string;
  heading?: string;
  tagline?: string;
  align?: TextAlign;
  ornament?: OrnamentVariant;
  titleStyle?: TextStyleConfig;
  headingStyle?: TextStyleConfig;
  taglineStyle?: TextStyleConfig;
}>();

const align = computed<TextAlign>(() => props.align || "left");
const ornamentVariant = computed<OrnamentVariant>(() => props.ornament || "line");
const ornamentCls = computed(() => ornamentClass(ornamentVariant.value));

const containerClass = computed(() => {
  const a = align.value;
  if (a === "center") return "text-center";
  if (a === "right") return "text-right";
  return "text-left";
});

const ornamentAlignClass = computed(() => (align.value === "center" ? "mx-auto mt-2" : "mt-2"));

const titleClass = computed(() => {
  if (props.titleStyle) {
    return ["uppercase text-black/70", ...textStyleClasses(props.titleStyle)].join(" ");
  }
  // Match existing .section-title default
  return "section-title";
});

const headingClass = computed(() => {
  const base = ["mt-4", "font-heading", "text-3xl"];
  if (props.headingStyle) return [...base, ...textStyleClasses(props.headingStyle)].join(" ");
  return base.join(" ");
});

const taglineClass = computed(() => {
  const base = ["mt-4", "text-black/70"];
  if (props.taglineStyle) return [...base, ...textStyleClasses(props.taglineStyle)].join(" ");
  return base.join(" ");
});
</script>

