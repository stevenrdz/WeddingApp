# AGENTS.md

## Purpose
Provenza is a multi-tenant wedding site template built with Vue 3 + Vite + Tailwind. Each wedding is served by slug and loaded from JSON.

## Quickstart
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Tests: `npm run typecheck`, `npm run smoke`, `npm test`, `npm run test:e2e`

## Routing and flow
- Entry: `src/main.ts` mounts `src/App.vue` and router.
- Routes: `/` (marketing home), `/w/:slug` (wedding), `/w` redirects to `/w/demo`.
- Premium (MVP demo): `/p/:slug/qr`, `/p/:slug/galeria`, `/p/:slug/upload`.
- Legal: `/terminos` and `/privacidad`.
- Admin: `/admin/login` (demo login), `/admin/dashboard`, `/admin/generate` (builder).
- Admin: `/admin/sites` (sitios) and `/admin/drafts` (borradores).
- Admin (clientes): `/admin/clientes` (listar) y `/admin/clientes/nuevo` (agregar).
- Admin: `/admin/settings` (ajustes globales del admin).
- Preview: `/preview/:draftId` (requires `VITE_ADMIN_PREVIEW_KEY` or admin session).
- `src/pages/Wedding.vue` loads tenant data by slug, applies theme and SEO, and renders sections.
- Sections are driven by `tenant.page.sections` (if present); otherwise defaults are used.

## Tenant data
- Files: `src/tenants/data/*.json`
- Manifest: `src/tenants/tenants.manifest.json` must include the slug.
- Adapter: `src/tenants/LocalJsonAdapter.ts` validates data and loads JSON via `import.meta.glob`.
- Schema: `src/types/tenant.ts` (keep required fields present).

## Local Dev Writer (No Backend)
- Only in local dev (`npm run dev`), Vite exposes:
- `GET /__admin/tenants/ping`
- `POST /__admin/tenants/save` (writes `src/tenants/data/<slug>.json` + updates manifest)
- `POST /__admin/tenants/delete` (deletes tenant JSON + updates manifest; demo is protected)
- Customers (local file `src/admin/customers.json`):
  - `GET /__admin/customers/ping`
  - `GET /__admin/customers/list`
  - `POST /__admin/customers/save`
  - `POST /__admin/customers/delete`

## RSVP modes
- WhatsApp: `rsvp.enabled = true`, `rsvp.mode = "whatsapp"`, `rsvp.whatsappNumber = "521..."`.
- Netlify Forms: `rsvp.enabled = true`, `rsvp.mode = "netlify"`, optional `rsvp.netlifyFormNameOptional`.
- Build-time forms: `scripts/generate-forms.mjs` generates `public/forms.html` (run via `prebuild`).

## Assets
- Default approach: place assets in `public/` and reference them as `/asset.ext`.
- Optional: `public/tenants/<slug>/...` can be used, but is ignored by git in this repo.

## Admin builder
- Views: `src/pages/admin/AdminLayout.vue`, `src/pages/admin/Generate.vue`, `src/pages/admin/Login.vue`.
- Customers: `src/pages/admin/Customers.vue` (CRUD local en dev via endpoints `__admin/customers/*`).
- Preview: `src/pages/admin/DraftPreview.vue` renders a shared draft from query data.
- Draft links embed data in the URL for cross-device sharing.
- Env: add `.env` with `VITE_ADMIN_PREVIEW_KEY` to enable preview links.
- Limitation: very large drafts can create long URLs; consider backend persistence later.
- Hero controls:
  - Optional details panel (`showPanelGlass`).
  - Text alignment control (`left/center/right`) with segmented UI.
  - Background is image-only in builder: URL, upload, or Unsplash library picker.
  - Hero buttons are manual (not auto-created) and edited in accordion cards.
- Navbar/Footer controls:
  - Background color is configurable in builder (`page.navbar.backgroundColor`, `page.footer.backgroundColor`).
  - Live preview cards are included for navbar/footer in the structure tab.
  - Reorder/delete actions in lists use icon-only controls with `aria-label`.
- Customers flow:
  - From `/admin/clientes` (list), `Editar` opens `/admin/clientes/nuevo?edit=<slug>`.
  - New view auto-hydrates form from query `edit`.
  - Added “Volver a lista” while editing.
- Sections controls:
  - Section cards in builder use accordion UI (same pattern as hero buttons).
  - Section background mode has no `default`; supports `preset`, `color`, `image`.
  - Image mode supports URL, upload, and Unsplash library selection.
  - Each section has display size control: `compact`, `normal`, `large`.

## Premium (Drive + Apps Script)
- Prototype flow:
  - QR: `/p/:slug/qr` points guests to the upload page.
  - Upload: `/p/:slug/upload` (fallback demo) or Apps Script upload page.
  - Gallery: `/p/:slug/galeria` can show an embedded public Drive folder.
- Docs: `docs/premium-drive-apps-script.md`
- Apps Script: `apps-script/premium-drive-upload/`

## Home hero (Unsplash, opcional)
- Env: `VITE_UNSPLASH_ACCESS_KEY` (solo acceso publico).
- Si no se configura, usa imagen fallback local.

## Roadmap
- Persist draft data in a backend to avoid long URLs.
- Add free-stock image picker inside the builder.
- Move plan/section gating controls into the dashboard.
- (Optional) Add a small library of baroque ornament dividers (SVG/PNG) for section titles.
- (Optional / Premium) QR + guest uploads + live gallery with storage owned by the client (e.g., Google Drive via Apps Script) and realtime/polling updates.

## Common changes
- Add a wedding: create JSON, add slug to manifest, add images.
- Update theme: edit `theme` in the tenant JSON (applied by `src/utils/applyTheme.ts`).
- Update SEO: edit `seo` in tenant JSON (applied by `src/utils/seo.ts`).
