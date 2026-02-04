function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function applySeo(seo: { title: string; description: string; url: string; ogImage: string }) {
  document.title = seo.title;
  upsertMeta("description", seo.description);
  upsertMeta("og:title", seo.title, "property");
  upsertMeta("og:description", seo.description, "property");
  upsertMeta("og:url", seo.url, "property");
  upsertMeta("og:image", seo.ogImage, "property");
}