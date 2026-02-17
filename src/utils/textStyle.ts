import type { OrnamentVariant, TextStyleConfig } from "../types/tenant";

export function ornamentClass(variant?: OrnamentVariant) {
  const v = variant || "line";
  if (v === "none") return "";
  if (v === "line") return "ornament";
  return `ornament ornament--${v}`;
}

export function textStyleClasses(style?: TextStyleConfig) {
  if (!style) return [] as string[];
  const classes: string[] = [];

  if (style.font) classes.push(`font-${style.font}`);
  if (style.size) classes.push(`text-${style.size}`);
  if (style.align) classes.push(`text-${style.align}`);
  if (style.weight) classes.push(`font-${style.weight}`);
  if (style.tracking === "wide") classes.push("tracking-widest");
  if (style.tracking === "widest") classes.push("tracking-[0.35em]");
  if (style.tracking === "normal") classes.push("tracking-normal");

  return classes;
}

