import fs from "node:fs";
import path from "node:path";

/**
 * Downloads selected Google Fonts as local .woff2 and generates local @font-face CSS.
 *
 * Usage:
 *   node scripts/download-google-fonts.mjs
 *
 * Output:
 * - public/fonts/*.woff2
 * - src/styles/fonts.local.css
 */

const ROOT = path.resolve(process.cwd());
const OUT_FONTS_DIR = path.join(ROOT, "public", "fonts");
const OUT_CSS_FILE = path.join(ROOT, "src", "styles", "fonts.local.css");

/** Keep it small: weights used by this project (headings/buttons). */
const FONTS = [
  { family: "Cormorant Garamond", weights: [400, 600] },
  { family: "Playfair Display", weights: [400, 600] },
  { family: "EB Garamond", weights: [400, 600] },
  { family: "Cinzel", weights: [400, 600] },
  { family: "Prata", weights: [400] },
  { family: "Great Vibes", weights: [400] },
  { family: "Source Sans 3", weights: [400, 600] }
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function fileSafeFamily(family) {
  return family
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .trim();
}

function buildCss2Url(family, weights) {
  const fam = family.trim().replace(/\s+/g, "+");
  const w = weights.join(";");
  // wght axis only (enough for this project)
  return `https://fonts.googleapis.com/css2?family=${fam}:wght@${w}&display=swap`;
}

function pickLatinFaceBlocks(cssText) {
  // Keep only latin blocks to reduce size. If no unicode-range is present, keep it.
  const blocks = cssText.match(/@font-face\s*{[^}]+}/g) ?? [];
  const kept = [];
  for (const b of blocks) {
    const hasUnicode = /unicode-range:/i.test(b);
    if (!hasUnicode) {
      kept.push(b);
      continue;
    }
    const isLatin = /unicode-range:\s*U\+0000-00FF/i.test(b);
    if (isLatin) kept.push(b);
  }
  return kept;
}

function parseFaceBlock(block) {
  const family = (block.match(/font-family:\s*['"]([^'"]+)['"]/i) ?? [])[1];
  const weightStr = (block.match(/font-weight:\s*([0-9]+)/i) ?? [])[1];
  const style = (block.match(/font-style:\s*([^;]+);/i) ?? [])[1]?.trim() ?? "normal";
  const url = (block.match(/src:\s*url\((https:[^)]+)\)\s*format\(['"]woff2['"]\)/i) ?? [])[1];
  const weight = weightStr ? Number(weightStr) : 400;
  if (!family || !url) return null;
  return { family, weight, style, url };
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function downloadFile(url, outPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

async function main() {
  ensureDir(OUT_FONTS_DIR);

  const cssOut = [];
  cssOut.push("/* Auto-generated. Do not edit by hand. */");

  for (const font of FONTS) {
    const cssUrl = buildCss2Url(font.family, font.weights);
    const cssText = await fetchText(cssUrl);
    const blocks = pickLatinFaceBlocks(cssText);
    if (!blocks.length) continue;

    for (const b of blocks) {
      const face = parseFaceBlock(b);
      if (!face) continue;

      const safeFamily = fileSafeFamily(face.family);
      const fileName = `${safeFamily}-${face.weight}-${face.style}.woff2`;
      const outFile = path.join(OUT_FONTS_DIR, fileName);

      if (!fs.existsSync(outFile)) {
        await downloadFile(face.url, outFile);
      }

      cssOut.push(
        [
          "@font-face {",
          `  font-family: "${face.family}";`,
          `  font-style: ${face.style};`,
          `  font-weight: ${face.weight};`,
          "  font-display: swap;",
          `  src: url("/fonts/${fileName}") format("woff2");`,
          "}"
        ].join("\n")
      );
    }
  }

  cssOut.push("");
  fs.writeFileSync(OUT_CSS_FILE, cssOut.join("\n\n"), "utf8");
  console.log(`Wrote ${OUT_CSS_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

