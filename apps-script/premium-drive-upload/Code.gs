/* Provenza - Premium Drive Upload (Apps Script)
 *
 * Script properties:
 * - FOLDER_ID: Google Drive folder id where photos will be stored
 * - TOKEN: (optional) shared token required to upload
 */

function doGet(e) {
  var slug = (e && e.parameter && e.parameter.slug) ? String(e.parameter.slug) : "boda";
  var token = (e && e.parameter && e.parameter.token) ? String(e.parameter.token) : "";

  var template = HtmlService.createTemplateFromFile("Index");
  template.slug = slug;
  template.token = token;
  return template
    .evaluate()
    .setTitle("Sube tu foto")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function uploadJpegDataUrl_(slug, dataUrl, token) {
  if (!slug) throw new Error("slug requerido");
  if (!dataUrl || String(dataUrl).indexOf("data:image/") !== 0) throw new Error("dataUrl invalido");

  var props = PropertiesService.getScriptProperties();
  var folderId = props.getProperty("FOLDER_ID");
  if (!folderId) throw new Error("FOLDER_ID no configurado en Script Properties");

  var expectedToken = props.getProperty("TOKEN");
  if (expectedToken && String(expectedToken) !== String(token || "")) {
    throw new Error("Token invalido");
  }

  var folder = DriveApp.getFolderById(folderId);
  var base64 = String(dataUrl).split(",")[1] || "";
  var bytes = Utilities.base64Decode(base64);

  var ts = new Date().toISOString().replace(/[:.]/g, "-");
  var name = slug + "__" + ts + "__" + Math.floor(Math.random() * 1e9) + ".jpg";
  var blob = Utilities.newBlob(bytes, "image/jpeg", name);

  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    id: file.getId(),
    name: file.getName(),
    createdAt: file.getDateCreated().toISOString(),
    viewUrl: "https://drive.google.com/file/d/" + file.getId() + "/view"
  };
}

function uploadJpegDataUrl(slug, dataUrl, token) {
  return uploadJpegDataUrl_(String(slug || ""), String(dataUrl || ""), String(token || ""));
}

