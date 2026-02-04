import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "src", "tenants", "tenants.manifest.json");
const dataDir = path.join(root, "src", "tenants", "data");
const outPath = path.join(root, "public", "forms.html");

const slugs = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

const forms = slugs
  .map((slug) => {
    const filePath = path.join(dataDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!data?.rsvp?.enabled || data?.rsvp?.mode !== "netlify") return null;
    const formName = data?.rsvp?.netlifyFormNameOptional || `rsvp-${slug}`;
    return `
<form name="${formName}" data-netlify="true" netlify-honeypot="bot-field" method="POST">
  <input type="hidden" name="form-name" value="${formName}" />
  <input type="hidden" name="bot-field" />
  <p><label>Nombre <input name="name" /></label></p>
  <p><label>Telefono <input name="phone" /></label></p>
  <p><label>Email <input name="email" /></label></p>
  <p><label>Asistentes <input name="attendeesCount" type="number" /></label></p>
  <p>
    <label>Asistencia
      <select name="attendance">
        <option value="si">Si</option>
        <option value="no">No</option>
      </select>
    </label>
  </p>
  <p><label>Mensaje <textarea name="message"></textarea></label></p>
  <p><button type="submit">Enviar</button></p>
</form>`;
  })
  .filter(Boolean)
  .join("\n");

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forms</title>
  </head>
  <body>
    ${forms || "<!-- no netlify forms -->"}
  </body>
</html>`;

fs.writeFileSync(outPath, html, "utf-8");
console.log(`Generated ${outPath}`);