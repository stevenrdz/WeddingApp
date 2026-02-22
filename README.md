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

## Tests
```bash
npm run typecheck
npm run smoke
npm test
npm run test:e2e
```

## Roadmap
- Persistencia real de borradores en backend (para evitar URLs largas).
- Bibliotecas de imagenes libres dentro del builder.
- Control de secciones por plan (basic/standard/premium) desde el dashboard.
- (Opcional) Crear una libreria de ornamentos barrocos (SVG/PNG) para titulos y secciones.
- (Opcional / Premium) Galería en vivo por QR (invitados suben fotos) con almacenamiento en Google Drive del cliente (Apps Script) y actualizacion por polling/tiempo real.

## Crear un nuevo tenant
1) Agrega un nuevo archivo JSON en `src/tenants/data/tu-slug.json` siguiendo `TenantConfig`.
2) Agrega el slug en `src/tenants/tenants.manifest.json`.
3) (Opcional) Ajusta `rsvp.mode` a `netlify` y `rsvp.enabled` a `true`.

## Admin builder (MVP)
- Login: `/admin/login` (modo demo, cualquier clave).
- Dashboard: `/admin/dashboard` (estadísticas y próximos eventos).
- Builder: `/admin/generate` (formulario + preview en vivo).
- Borradores: `/admin/drafts` (crear/duplicar/eliminar).
- Sitios: `/admin/sites` (ver/editar/eliminar).
- Clientes: `/admin/clientes` (registro de clientes para autogenerar slug y prellenar datos base).
- Configuración: `/admin/settings` (ajustes globales en el admin).
- Guardar borrador: genera un link compartible a `/preview/:draftId`.

### Mejoras recientes en builder
- Hero:
  - Panel de detalles opcional.
  - Alineacion de contenido (izquierda, centro, derecha) con UI segmentada.
  - Fondo solo por imagen (URL, upload o libreria Unsplash).
  - Botones del hero se crean manualmente (no auto-generados).
  - Editor de botones con acordeon, preview en vivo, paletas y orden.
- Navbar y Footer:
  - Selector de color de fondo en builder.
  - Preview visual en vivo dentro del panel de estructura.
  - Acciones de ordenar/eliminar con iconos (con `aria-label`).
- Clientes:
  - Desde listado, `Editar` abre formulario en `/admin/clientes/nuevo?edit=<slug>`.
  - Precarga automatica del cliente en formulario de edicion.
## Premium (MVP - demo)
Este flujo es un prototipo para el paquete Premium:
- QR: `/p/:slug/qr` (genera un QR hacia la pagina de carga).
- Galería: `/p/:slug/galeria` (muestra fotos subidas).
- Upload (invitados): `/p/:slug/upload` (abre camara/galeria y sube una foto).

Por defecto las fotos se guardan en `localStorage` (demo). Si configuras Google Drive + Apps Script, el QR abre una pagina de subida (Apps Script) y la galeria se muestra embebiendo una carpeta publica de Drive.

Config: `docs/premium-drive-apps-script.md`

### Guardar/eliminar "en proyecto" (solo local)
En modo local (`npm run dev`), el admin puede:
- Guardar un sitio en `src/tenants/data/<slug>.json` y actualizar `src/tenants/tenants.manifest.json`.
- Eliminar un sitio (borra el JSON y lo saca del manifest).
- Guardar/listar/eliminar clientes en `src/admin/customers.json` (para prellenar el builder).

Esto funciona con un middleware de Vite (solo `dev server`). En deploy no aplica porque no hay backend.

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

## Assets
- Coloca imagenes en `public/` y referencialas como `/mi-imagen.jpg`.
- Si quieres separar por tenant, puedes usar `public/tenants/<slug>/...` (pero esa carpeta esta ignorada por git en este repo).

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
- Políticas de privacidad: `/privacidad`
