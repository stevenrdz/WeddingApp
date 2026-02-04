# WeddingApp SaaS-ready (Vue 3 + Vite)

Template multi-tenant para sitios de boda con rutas por slug, RSVP opcional y deploy en Netlify.

## Quickstart
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
```

## Crear un nuevo tenant
1) Agrega un nuevo archivo JSON en `src/tenants/data/tu-slug.json` siguiendo `TenantConfig`.
2) Agrega el slug en `src/tenants/tenants.manifest.json`.
3) (Opcional) Ajusta `rsvp.mode` a `netlify` y `rsvp.enabled` a `true`.

## RSVP por WhatsApp
- `rsvp.enabled = true`
- `rsvp.mode = "whatsapp"`
- `rsvp.whatsappNumber = "521..."`

## RSVP por Netlify Forms
- `rsvp.enabled = true`
- `rsvp.mode = "netlify"`
- `rsvp.netlifyFormNameOptional` (opcional)

### Como funciona generate-forms
Netlify Forms requiere que los formularios existan en build-time. El script `scripts/generate-forms.mjs`:
- Lee `tenants.manifest.json`
- Carga los JSON activos
- Genera `public/forms.html` con los `<form>` necesarios

## Deploy en Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- El prebuild genera `public/forms.html`

## Ver submissions en Netlify Forms
- En el dashboard: Site settings -> Forms

## Ejecutar con Docker (local)
```bash
docker compose up --build
```