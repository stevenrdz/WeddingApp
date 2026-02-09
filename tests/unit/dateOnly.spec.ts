import { describe, expect, it } from "vitest";
import { parseDateOnlyLocal } from "../../src/utils/dateOnly";

describe("parseDateOnlyLocal", () => {
  it("parses YYYY-MM-DD as local date without shifting day", () => {
    const d = parseDateOnlyLocal("2026-08-01");
    expect(d).toBeInstanceOf(Date);
    expect(d?.getFullYear()).toBe(2026);
    expect((d?.getMonth() ?? -1) + 1).toBe(8);
    expect(d?.getDate()).toBe(1);
  });

  it("returns null for invalid input", () => {
    expect(parseDateOnlyLocal("")).toBe(null);
    expect(parseDateOnlyLocal("2026-13-99")).toBe(null);
    expect(parseDateOnlyLocal("2026/08/01")).toBe(null);
  });
});

