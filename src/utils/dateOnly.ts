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
  // Local midnight.
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

