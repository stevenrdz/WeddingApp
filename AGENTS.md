# AGENTS.md

## Purpose
WeddingApp is a multi-tenant wedding site template built with Vue 3 + Vite + Tailwind. Each wedding is served by slug and loaded from JSON.

## Quickstart
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Routing and flow
- Entry: `src/main.ts` mounts `src/App.vue` and router.
- Routes: `/` (marketing home), `/w/:slug` (wedding), `/w` redirects to `/w/demo`.
- Admin: `/admin/login` (demo login) and `/admin/generate` (builder).
- Preview: `/preview/:draftId` (requires `VITE_ADMIN_PREVIEW_KEY` or admin session).
- `src/pages/Wedding.vue` loads tenant data by slug, applies theme and SEO, and renders sections.
- Plan gating: `planBySlug` in `Wedding.vue` controls which sections render for basic/standard/premium.

## Tenant data
- Files: `src/tenants/data/*.json`
- Manifest: `src/tenants/tenants.manifest.json` must include the slug.
- Adapter: `src/tenants/LocalJsonAdapter.ts` validates data and loads JSON via `import.meta.glob`.
- Schema: `src/types/tenant.ts` (keep required fields present).

## RSVP modes
- WhatsApp: `rsvp.enabled = true`, `rsvp.mode = "whatsapp"`, `rsvp.whatsappNumber = "521..."`.
- Netlify Forms: `rsvp.enabled = true`, `rsvp.mode = "netlify"`, optional `rsvp.netlifyFormNameOptional`.
- Build-time forms: `scripts/generate-forms.mjs` generates `public/forms.html` (run via `prebuild`).

## Assets
- Public assets: `public/tenants/<slug>/...`
- Sample images: `src/tenants/data/<slug>.json` gallery uses `/tenants/<slug>/...` paths.

## Admin builder
- Views: `src/pages/admin/AdminLayout.vue`, `src/pages/admin/Generate.vue`, `src/pages/admin/Login.vue`.
- Preview: `src/pages/admin/DraftPreview.vue` renders a shared draft from query data.
- Draft links embed data in the URL for cross-device sharing.
- Env: add `.env` with `VITE_ADMIN_PREVIEW_KEY` to enable preview links.
- Limitation: very large drafts can create long URLs; consider backend persistence later.

## Roadmap
- Persist draft data in a backend to avoid long URLs.
- Add free-stock image picker inside the builder.
- Move plan/section gating controls into the dashboard.

## Common changes
- Add a wedding: create JSON, add slug to manifest, add images.
- Update theme: edit `theme` in the tenant JSON (applied by `src/utils/applyTheme.ts`).
- Update SEO: edit `seo` in tenant JSON (applied by `src/utils/seo.ts`).
