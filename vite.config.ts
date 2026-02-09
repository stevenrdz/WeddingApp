import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "node:fs/promises";
import path from "node:path";

function isValidSlug(slug: string) {
  // Keep it strict to avoid path traversal and weird filenames.
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writePrettyJsonFile(filePath: string, value: unknown) {
  const json = `${JSON.stringify(value, null, 2)}\n`;
  await fs.writeFile(filePath, json, "utf8");
}

async function readRequestBody(req: { on: (event: string, cb: (arg: unknown) => void) => void }) {
  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk as ArrayBuffer)));
    req.on("end", () => resolve());
    req.on("error", reject);
  });
  return Buffer.concat(chunks).toString("utf8");
}

function adminTenantWriter(): Plugin {
  const root = process.cwd();
  const dataDir = path.join(root, "src", "tenants", "data");
  const manifestPath = path.join(root, "src", "tenants", "tenants.manifest.json");

  return {
    name: "provenza-admin-tenant-writer",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/__admin/tenants/")) return next();

        try {
          if (req.method === "GET" && req.url === "/__admin/tenants/ping") {
            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (req.method === "POST" && req.url === "/__admin/tenants/save") {
            const raw = await readRequestBody(req);
            const body = JSON.parse(raw || "{}") as {
              slug?: string;
              prevSlug?: string;
              deletePrev?: boolean;
              tenant?: unknown;
            };

            const slug = String(body.slug || "").trim();
            const prevSlug = String(body.prevSlug || "").trim();
            const deletePrev = Boolean(body.deletePrev);
            const tenant = body.tenant;

            if (!slug || !isValidSlug(slug)) {
              res.statusCode = 400;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "Slug inválido. Usa solo minúsculas, números y guiones." }));
              return;
            }

            const outPath = path.join(dataDir, `${slug}.json`);
            await writePrettyJsonFile(outPath, tenant);

            const manifest = await readJsonFile<string[]>(manifestPath).catch(() => [] as string[]);
            const set = new Set<string>(Array.isArray(manifest) ? manifest : []);

            if (prevSlug && prevSlug !== slug) {
              set.delete(prevSlug);
              if (deletePrev) {
                const prevPath = path.join(dataDir, `${prevSlug}.json`);
                await fs.rm(prevPath, { force: true });
              }
            }

            set.add(slug);
            const nextManifest = Array.from(set).sort();
            await writePrettyJsonFile(manifestPath, nextManifest);

            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify({ ok: true, slug, prevSlug: prevSlug || null }));
            return;
          }

          if (req.method === "POST" && req.url === "/__admin/tenants/delete") {
            const raw = await readRequestBody(req);
            const body = JSON.parse(raw || "{}") as { slug?: string };
            const slug = String(body.slug || "").trim();

            if (!slug || !isValidSlug(slug)) {
              res.statusCode = 400;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "Slug inválido. Usa solo minúsculas, números y guiones." }));
              return;
            }

            if (slug === "demo") {
              res.statusCode = 400;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "No se puede eliminar el tenant demo." }));
              return;
            }

            const manifest = await readJsonFile<string[]>(manifestPath).catch(() => [] as string[]);
            const set = new Set<string>(Array.isArray(manifest) ? manifest : []);
            if (!set.has(slug)) {
              res.statusCode = 404;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "El sitio no existe en el manifest." }));
              return;
            }

            set.delete(slug);
            const tenantPath = path.join(dataDir, `${slug}.json`);
            await fs.rm(tenantPath, { force: true });
            const nextManifest = Array.from(set).sort();
            await writePrettyJsonFile(manifestPath, nextManifest);

            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify({ ok: true, slug }));
            return;
          }

          res.statusCode = 404;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "Not found" }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "Error" }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [vue(), adminTenantWriter()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    include: ["tests/unit/**/*.spec.ts"]
  }
});
