import type { DataOffer, ExchangeContent } from "./types";

const seedOffers: Omit<DataOffer, "source" | "sampleRows" | "publishedBy" | "sellerEarnings">[] = [
  { id: "offer-metropulse", title: "MetroPulse Foot Traffic", seller: "CitySignal", description: "Hourly pedestrian counts near Sydney retail, transit, and public spaces.", trustScore: 98, freshnessHours: 2, formats: ["JSON", "CSV", "Parquet"], license: "Commercial · derived insights allowed", coverage: "Greater Sydney · 184 zones", rowCount: 12480, rentalCredits: 24, minimumCredits: 22, sampleFields: ["zone_id", "observed_at", "footfall", "confidence"] },
  { id: "offer-venuelens", title: "VenueLens Weekend Demand", seller: "VenueLens", description: "Weekend foot traffic and dwell-time signals around venues and entertainment precincts.", trustScore: 93, freshnessHours: 18, formats: ["JSON", "CSV"], license: "Commercial · no redistribution", coverage: "Sydney CBD · 76 venues", rowCount: 8420, rentalCredits: 32, minimumCredits: 29, sampleFields: ["venue_id", "time_window", "visits", "dwell_minutes"] },
  { id: "offer-retailflow", title: "RetailFlow Monthly Archive", seller: "RetailFlow", description: "Monthly retail-category footfall for historical trend and location comparisons.", trustScore: 90, freshnessHours: 144, formats: ["CSV", "Parquet"], license: "Commercial · attribution required", coverage: "NSW metro · 320 zones", rowCount: 48600, rentalCredits: 18, minimumCredits: 17, sampleFields: ["month", "postcode", "category", "visit_index"] },
];

export const SAMPLE_OFFERS: DataOffer[] = seedOffers.map((offer, index) => ({
  ...offer,
  source: "Synthetic Signal Exchange fixture. Not measured real-world observations.",
  publishedBy: "system",
  sellerEarnings: 0,
  sampleRows: index === 0 ? [
    { zone_id: "NEWTOWN", observed_at: "2026-09-04T10:00:00+10:00", footfall: 340, confidence: 0.94 },
    { zone_id: "SURRY_HILLS", observed_at: "2026-09-04T10:00:00+10:00", footfall: 280, confidence: 0.91 },
    { zone_id: "PARRAMATTA", observed_at: "2026-09-04T10:00:00+10:00", footfall: 410, confidence: 0.92 },
  ] : index === 1 ? [
    { venue_id: "CBD-01", time_window: "Saturday morning", visits: 120, dwell_minutes: 35 },
    { venue_id: "CBD-02", time_window: "Saturday morning", visits: 95, dwell_minutes: 42 },
    { venue_id: "CBD-03", time_window: "Saturday afternoon", visits: 190, dwell_minutes: 27 },
  ] : [
    { month: "2026-08", postcode: "2000", category: "Retail", visit_index: 112 },
    { month: "2026-08", postcode: "2042", category: "Retail", visit_index: 105 },
    { month: "2026-08", postcode: "2150", category: "Retail", visit_index: 119 },
  ],
}));

export function cloneExchangeContent(content: ExchangeContent): ExchangeContent {
  return structuredClone(content);
}

export function createSampleExchange(): ExchangeContent {
  return cloneExchangeContent({ exchangeId: "signal-exchange-demo", walletCredits: 100, brief: { goal: "Choose a Sydney location for a weekend pop-up", query: "fresh Sydney retail foot traffic", budgetCredits: 40, durationDays: 7 }, offers: SAMPLE_OFFERS, access: [] });
}
