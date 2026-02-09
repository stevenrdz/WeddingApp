import fs from "node:fs";
import path from "node:path";

function fail(message) {
  console.error(`SMOKE FAIL: ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`SMOKE OK: ${message}`);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

const root = process.cwd();
const manifestPath = path.join(root, "src", "tenants", "tenants.manifest.json");
const dataDir = path.join(root, "src", "tenants", "data");

if (!fs.existsSync(manifestPath)) {
  fail(`No existe ${manifestPath}`);
  process.exit(1);
}

const manifest = readJson(manifestPath);
if (!Array.isArray(manifest) || !manifest.every((s) => typeof s === "string" && s.trim())) {
  fail("tenants.manifest.json debe ser un array de strings.");
} else {
  ok(`Manifest cargado (${manifest.length} slugs).`);
}

for (const slug of manifest) {
  const filePath = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    fail(`Falta el tenant JSON para slug "${slug}": ${filePath}`);
    continue;
  }

  let data;
  try {
    data = readJson(filePath);
  } catch (e) {
    fail(`JSON invalido en ${filePath}: ${e?.message || String(e)}`);
    continue;
  }

  if (!isObject(data)) {
    fail(`Tenant invalido (no es objeto) en ${filePath}`);
    continue;
  }

  if (typeof data.coupleNames !== "string" || !data.coupleNames.trim()) {
    fail(`"${slug}": coupleNames es obligatorio.`);
  }
  if (typeof data.dateISO !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.dateISO)) {
    fail(`"${slug}": dateISO debe ser YYYY-MM-DD.`);
  }
  if (!isObject(data.hero) || typeof data.hero.tagline !== "string") {
    fail(`"${slug}": hero.tagline es obligatorio.`);
  }
  if (!isObject(data.ceremony) || typeof data.ceremony.name !== "string") {
    fail(`"${slug}": ceremony.name es obligatorio.`);
  }
  if (!isObject(data.reception) || typeof data.reception.name !== "string") {
    fail(`"${slug}": reception.name es obligatorio.`);
  }
  if (!isObject(data.theme) || typeof data.theme.primary !== "string" || typeof data.theme.fontHeading !== "string") {
    fail(`"${slug}": theme (primary, fontHeading, etc.) es obligatorio.`);
  }
  if (!isObject(data.seo) || typeof data.seo.title !== "string" || typeof data.seo.description !== "string") {
    fail(`"${slug}": seo (title, description, etc.) es obligatorio.`);
  }

  // Optional page config sanity checks
  if (data.page !== undefined) {
    if (!isObject(data.page)) {
      fail(`"${slug}": page debe ser objeto si existe.`);
    } else if (Array.isArray(data.page.sections)) {
      const anchors = new Set();
      for (const section of data.page.sections) {
        if (!isObject(section)) continue;
        if (typeof section.anchorId === "string") {
          const key = section.anchorId.trim();
          if (key) {
            if (anchors.has(key)) fail(`"${slug}": ancla duplicada en page.sections: "${key}".`);
            anchors.add(key);
          }
        }
      }
    }
  }
}

if (process.exitCode) {
  console.error("Smoke tests: con errores.");
  process.exit(process.exitCode);
} else {
  ok("Smoke tests: sin errores.");
}

