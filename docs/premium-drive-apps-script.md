# Premium: GalerÃ­a por QR con Google Drive + Apps Script (sin costo)

Objetivo: que el cliente sea dueÃ±o del almacenamiento y no pagar servicios externos.

Este repo soporta 2 modos:
- **Demo (default):** `localStorage` (no es compartido entre invitados).
- **Drive real (recomendado):** el QR abre un Web App de Apps Script que sube la foto a una carpeta de Google Drive, y la galerÃ­a se ve embebiendo esa carpeta.

## 1) Crea una carpeta en Drive
1) En Google Drive crea una carpeta, por ejemplo `Provenza - Galeria - mi-boda`.
2) Comparte la carpeta como **"Cualquier persona con el enlace"** (lector).
3) Copia el **Folder ID** (de la URL).

## 2) Crea el Apps Script (Web App)
1) Ve a `script.google.com` y crea un proyecto.
2) Copia/pega el cÃ³digo de `apps-script/premium-drive-upload/Code.gs` y `apps-script/premium-drive-upload/Index.html`.
3) En **Project Settings** habilita V8 (default).
4) En **Deploy > New deployment > Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5) Copia la URL de `.../exec` (esa es tu `VITE_PREMIUM_UPLOAD_WEBAPP_URL`).

## 3) Configura Script Properties (seguridad bÃ¡sica)
En Apps Script: **Project Settings > Script properties**
- `FOLDER_ID` = tu folder id
- `TOKEN` = una cadena aleatoria (ej. `pvnz_...`)

Si no configuras `TOKEN`, cualquiera con el link podrÃ¡ subir.

## 4) Configura tu `.env` (Vite)
En la raÃ­z del proyecto:
```
VITE_PREMIUM_UPLOAD_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
VITE_PREMIUM_DRIVE_FOLDER_ID=xxxxxxxxxxxxxxxxxxxx
VITE_PREMIUM_UPLOAD_TOKEN=tu_token
```

Reinicia `npm run dev`.

## 5) Flujo
- Admin: abre `/p/<slug>/qr` y descarga el QR.
- Invitado: escanea el QR y abre la pÃ¡gina de Apps Script para subir.
- Admin: abre `/p/<slug>/galeria` y verÃ¡ la carpeta embebida (grid).

## Notas
- Apps Script/Drive tiene cuotas (normalmente suficiente para eventos pequeÃ±os/medianos).
- Para evitar archivos enormes, la pÃ¡gina de subida convierte la imagen a JPEG con resize antes de subir.

