export const EMPTY_SCHEMA = { type: "object", properties: {}, additionalProperties: false } as const;
export const SEARCH_SCHEMA = { type: "object", properties: { query: { type: "string", minLength: 2, maxLength: 160, description: "What data the person needs." }, maxCredits: { type: "number", minimum: 1, maximum: 100, description: "Optional maximum seven-day rental price." } }, required: ["query"], additionalProperties: false } as const;
export const COMPARE_SCHEMA = { type: "object", properties: { offerIds: { type: "array", items: { type: "string", maxLength: 100 }, maxItems: 10, description: "Offer IDs to compare. Omit to compare every visible offer." } }, additionalProperties: false } as const;
export const PREVIEW_SCHEMA = { type: "object", properties: { offerId: { type: "string", maxLength: 100, description: "Offer ID returned by inspect_exchange or search_data_offers." }, bidCredits: { type: "integer", minimum: 1, maximum: 100, description: "The proposed seven-day rental price, within the person's budget." }, durationDays: { type: "integer", const: 7, description: "Fixed seven-day demo rental." } }, required: ["offerId", "bidCredits", "durationDays"], additionalProperties: false } as const;
export const COMMIT_SCHEMA = { type: "object", properties: { previewToken: { type: "string", maxLength: 100, description: "One-time token from preview_data_deal for the exact visible agreement." } }, required: ["previewToken"], additionalProperties: false } as const;
export const RESET_SCHEMA = { type: "object", properties: { confirmReplace: { type: "boolean", description: "True only after the person agrees to replace the current simulated deal." } }, required: ["confirmReplace"], additionalProperties: false } as const;
export const OFFER_SCHEMA = { type: "object", properties: { offerId: { type: "string", minLength: 1, maxLength: 100 } }, required: ["offerId"], additionalProperties: false } as const;
export const DELIVERY_SCHEMA = { type: "object", properties: { offerId: { type: "string", minLength: 1, maxLength: 100 }, format: { type: "string", enum: ["JSON", "CSV"], description: "Full sample serialization, available only during an active approved rental." } }, required: ["offerId", "format"], additionalProperties: false } as const;
export const PUBLISH_SCHEMA = {
  type: "object", properties: {
    title: { type: "string", minLength: 3, maxLength: 80 }, seller: { type: "string", minLength: 3, maxLength: 60 },
    description: { type: "string", minLength: 3, maxLength: 400 }, coverage: { type: "string", minLength: 3, maxLength: 120 },
    source: { type: "string", minLength: 3, maxLength: 300, description: "Provenance statement; use synthetic non-private data for this demo." },
    license: { type: "string", minLength: 3, maxLength: 240, description: "Explicit permitted use and redistribution terms." },
    rentalCredits: { type: "integer", minimum: 1, maximum: 100 }, minimumCredits: { type: "integer", minimum: 1, maximum: 100, description: "Seller-authorized floor for deterministic counteroffers, no higher than list price." },
    sampleRowsJson: { type: "string", minLength: 2, maxLength: 20000, description: "JSON array of 2–50 rows with identical fields (max 12). Scalar values only. No private data." },
    confirmPublish: { type: "boolean", const: true, description: "True only with the owner's permission to publish this non-private demo sample in the local exchange." },
  }, required: ["title", "seller", "description", "coverage", "source", "license", "rentalCredits", "minimumCredits", "sampleRowsJson", "confirmPublish"], additionalProperties: false,
} as const;
