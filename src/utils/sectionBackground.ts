import type { SectionBackgroundConfig } from "../types/tenant";

export function sectionBackground(bg?: SectionBackgroundConfig) {
  const mode = bg?.mode ?? "default";
  const style: Record<string, string> = {};

  // Default: keep component's existing background classes.
  if (mode === "default") return { className: "", style };

  if (mode === "preset") {
    const preset = bg?.preset ?? "surface";
    if (preset === "surface") return { className: "bg-white/60", style };
    if (preset === "texture") return { className: "page-texture", style };
    // "ink" is intentionally just a background. Components may need extra styling for contrast.
    if (preset === "ink") return { className: "hero-surface", style };
  }

  if (mode === "color") {
    style.backgroundColor = bg?.color || "var(--color-surface)";
    return { className: "", style };
  }

  if (mode === "image") {
    const url = bg?.imageUrl?.trim();
    if (url) {
      style.backgroundImage = `linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.55)), url("${url}")`;
      style.backgroundSize = "cover";
      style.backgroundPosition = "center";
      style.backgroundRepeat = "no-repeat";
      if (bg?.parallax) style.backgroundAttachment = "fixed";
    }
    return { className: "", style };
  }

  return { className: "", style };
}

