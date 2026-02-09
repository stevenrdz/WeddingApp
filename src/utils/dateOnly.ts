export function parseDateOnlyLocal(isoDate: string) {
  // `YYYY-MM-DD` should be interpreted as a date in the user's locale.
  // `new Date("YYYY-MM-DD")` is treated as UTC by JS and can show "previous day" in UTC- offsets.
  const value = String(isoDate || "").trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  // Local midnight.
  const d = new Date(year, month - 1, day, 0, 0, 0, 0);
  // Guard against overflow (e.g. 2026-13-99) which JS normalizes to a "valid" date.
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return d;
}
