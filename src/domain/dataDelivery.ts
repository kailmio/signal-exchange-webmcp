import type { CommandResult, DataOffer, Origin, PublishOfferInput, SampleRow } from "./types";

export function parseSampleRows(json: string): SampleRow[] | null {
  if (typeof json !== "string" || json.length > 20_000) return null;
  try {
    const rows: unknown = JSON.parse(json);
    if (!Array.isArray(rows) || rows.length < 2 || rows.length > 50) return null;
    const first = rows[0];
    if (!first || typeof first !== "object" || Array.isArray(first)) return null;
    const fields = Object.keys(first);
    if (!fields.length || fields.length > 12 || fields.some((key) => !/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(key) || ["__proto__", "constructor", "prototype"].includes(key))) return null;
    if (!rows.every((row) => row && typeof row === "object" && !Array.isArray(row)
      && Object.keys(row).length === fields.length && fields.every((key) => Object.hasOwn(row, key))
      && Object.values(row).every((value) => value === null || typeof value === "boolean"
        || (typeof value === "string" && value.length <= 300) || (typeof value === "number" && Number.isFinite(value))))) return null;
    return rows as SampleRow[];
  } catch { return null; }
}

export function makePublishedOffer(input: PublishOfferInput, id: string, origin: Origin): CommandResult<DataOffer> {
  const invalid = (message: string): CommandResult<DataOffer> => ({ ok: false, error: { code: "INVALID_INPUT", message, nextAction: "Correct the listing and publish again. No offer was added." } });
  if (input.confirmPublish !== true) return { ok: false, error: { code: "CONFIRMATION_REQUIRED", message: "Publishing needs explicit permission to share this demo sample.", nextAction: "Confirm you have permission and that the sample contains no private data." } };
  const bounds = { title: 80, seller: 60, description: 400, coverage: 120, source: 300, license: 240 } as const;
  for (const [key, maximum] of Object.entries(bounds)) {
    const value = input[key as keyof typeof bounds];
    if (typeof value !== "string" || value.trim().length < 3 || value.length > maximum) return invalid(`${key} must contain 3–${maximum} characters.`);
  }
  if (![input.rentalCredits, input.minimumCredits].every((price) => Number.isInteger(price) && price >= 1 && price <= 100) || input.minimumCredits > input.rentalCredits) return invalid("Prices must be whole credits from 1 to 100; the minimum cannot exceed the list price.");
  const rows = parseSampleRows(input.sampleRowsJson);
  if (!rows) return invalid("Provide 2–50 JSON rows with matching fields and simple values (maximum 20,000 characters).");
  return { ok: true, data: { id, title: input.title.trim(), seller: input.seller.trim(), description: input.description.trim(), coverage: input.coverage.trim(), source: input.source.trim(), license: input.license.trim(), rentalCredits: input.rentalCredits, minimumCredits: input.minimumCredits, formats: ["JSON", "CSV"], freshnessHours: 0, trustScore: 0, sampleFields: Object.keys(rows[0]), sampleRows: rows, rowCount: rows.length, publishedBy: origin, sellerEarnings: 0 } };
}

// Quoting alone does not prevent spreadsheet formula execution.
function csvCell(value: SampleRow[string]): string {
  let text = value === null ? "" : String(value);
  if (typeof value === "string" && /^[\s]*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function serializeRows(fields: string[], rows: SampleRow[], format: "JSON" | "CSV"): string {
  return format === "JSON" ? JSON.stringify(rows, null, 2) : [fields.map(csvCell).join(","), ...rows.map((row) => fields.map((key) => csvCell(row[key])).join(","))].join("\r\n");
}
