export function applyTheme(theme: {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  fontHeading: string;
  fontSubheading?: string;
  fontBody: string;
}) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-accent", theme.primary);
  root.style.setProperty("--color-surface", theme.background);
  root.style.setProperty("--color-text", theme.text);
  root.style.setProperty("--font-heading", theme.fontHeading);
  if (theme.fontSubheading) {
    root.style.setProperty("--font-subheading", theme.fontSubheading);
  }
  root.style.setProperty("--font-body", theme.fontBody);
}
