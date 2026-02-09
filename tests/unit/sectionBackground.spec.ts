import { describe, expect, it } from "vitest";
import { sectionBackground } from "../../src/utils/sectionBackground";

describe("sectionBackground", () => {
  it("default returns no class and empty style", () => {
    const res = sectionBackground();
    expect(res.className).toBe("");
    expect(res.style).toEqual({});
  });

  it("preset surface returns bg class", () => {
    const res = sectionBackground({ mode: "preset", preset: "surface" });
    expect(res.className).toBe("bg-white/60");
  });

  it("preset texture returns texture class", () => {
    const res = sectionBackground({ mode: "preset", preset: "texture" });
    expect(res.className).toBe("page-texture");
  });

  it("color returns inline style backgroundColor", () => {
    const res = sectionBackground({ mode: "color", color: "#112233" });
    expect(res.style.backgroundColor).toBe("#112233");
  });

  it("image returns backgroundImage and parallax attachment", () => {
    const res = sectionBackground({ mode: "image", imageUrl: "https://example.com/a.jpg", parallax: true });
    expect(res.style.backgroundImage).toContain("url(\"https://example.com/a.jpg\")");
    expect(res.style.backgroundAttachment).toBe("fixed");
  });
});

