# Provenza (Vue 3 + Vite)

Template multi-tenant para sitios de boda con rutas por slug, RSVP opcional y deploy en Netlify.
Incluye landing comercial, demo y paginas legales basicas.

## Quickstart
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
```

## Roadmap
- Persistencia real de borradores en backend (para evitar URLs largas).
- Bibliotecas de imagenes libres dentro del builder.
- Control de secciones por plan (basic/standard/premium) desde el dashboard.
- (Opcional) Crear una libreria de ornamentos barrocos (SVG/PNG) para titulos y secciones.

## Crear un nuevo tenant
1) Agrega un nuevo archivo JSON en `src/tenants/data/tu-slug.json` siguiendo `TenantConfig`.
2) Agrega el slug en `src/tenants/tenants.manifest.json`.
3) (Opcional) Ajusta `rsvp.mode` a `netlify` y `rsvp.enabled` a `true`.

## Admin builder (MVP)
- Login: `/admin/login` (modo demo, cualquier clave).
- Builder: `/admin/generate` (formulario + preview en vivo).
- Guardar borrador: genera un link compartible a `/preview/:draftId`.

### Clave para previews compartibles
Crea un `.env` en la raiz con:
```
VITE_ADMIN_PREVIEW_KEY=tu-clave-unica
```
Reinicia el dev server para que Vite lea la variable.

### Imagen hero (Unsplash, opcional)
Si usas el hero con Unsplash en `Home.vue`, agrega en `.env`:
```
VITE_UNSPLASH_ACCESS_KEY=tu_access_key
```
Si no quieres consumir la API, deja el fallback local.

### Nota sobre links de borrador
El link de preview incluye el JSON embebido en la URL. Esto permite compartir sin backend,
pero puede generar URLs largas. Para un flujo mas robusto, se recomienda persistir
los borradores en un backend o almacenamiento externo.

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

## Paginas legales
- Terminos y condiciones: `/terminos`
- Politicas de privacidad: `/privacidad`
